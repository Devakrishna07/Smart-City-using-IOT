import argparse
import csv
import math
from pathlib import Path
import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms
import pandas as pd
from src.models.components.anomaly_clip import AnomalyCLIP

def build_clip_preprocess():
    clip_mean = (0.48145466, 0.4578275, 0.40821073)
    clip_std = (0.26862954, 0.26130258, 0.27577711)
    return transforms.Compose([
        transforms.Resize(224, interpolation=transforms.InterpolationMode.BICUBIC),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(clip_mean, clip_std),
    ])

def sample_video_frames(video_path, fps_target=4.0, max_frames=None, save_dir=None, video_name="video"):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise FileNotFoundError(f"Cannot open video: {video_path}")

    src_fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    step = max(1, int(round(src_fps / fps_target)))
    frames = []
    idx, saved_idx = 0, 0

    while True:
        ok, frame_bgr = cap.read()
        if not ok:
            break
        if idx % step == 0:
            frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(frame_rgb)
            frames.append(pil_img)

            # 🚩 Save frame to disk
            if save_dir is not None:
                save_dir.mkdir(parents=True, exist_ok=True)
                frame_filename = f"{video_name}_frame{saved_idx:05d}.jpg"
                pil_img.save(save_dir / frame_filename)
            saved_idx += 1

            if max_frames is not None and saved_idx >= max_frames:
                break
        idx += 1
    cap.release()
    if len(frames) == 0:
        raise RuntimeError("No frames were sampled.")
    return frames

def build_net_args(labels_file, arch="ViT-B/16", normal_id=0):
    return dict(
        arch=arch,
        shared_context=False,
        ctx_init="",
        n_ctx=8,
        seg_length=16,
        num_segments=32,
        select_idx_dropout_topk=0.7,
        select_idx_dropout_bottomk=0.7,
        heads=8,
        dim_heads=None,
        concat_features=False,
        emb_size=256,
        depth=1,
        num_topk=3,
        num_bottomk=3,
        labels_file=labels_file,
        normal_id=normal_id,
        dropout_prob=0.0,
        temporal_module="axial",
        direction_module="learned_encoder_finetune",
        selector_module="directions",
        batch_norm=True,
        feature_size=512,
        use_similarity_as_features=False,
        ctx_dim=512,
        load_from_features=False,
        stride=1,
        ncrops=1,
    )

def load_net_weights_from_ckpt(net, ckpt_path, device="cuda", strict=False):
    ckpt = torch.load(ckpt_path, map_location=device)
    state = ckpt.get("state_dict", ckpt)
    net_state = {k.replace("net.", "", 1): v for k, v in state.items() if k.startswith("net.")}
    missing, unexpected = net.load_state_dict(net_state, strict=strict)
    if missing:
        print(f"[warn] Missing keys: {missing[:5]}...")
    if unexpected:
        print(f"[warn] Unexpected keys: {unexpected[:5]}...")


def compute_ncentroid_from_frames(tensor_frames, net, device, batch=64):
    feats = []
    with torch.no_grad():
        for i in range(0, tensor_frames.shape[0], batch):
            x = tensor_frames[i:i + batch].to(device)
            f = net.image_encoder(x.float())  # [B,512]
            f = F.normalize(f, dim=-1)
            feats.append(f)
    return torch.cat(feats, dim=0).mean(dim=0)

def run_inference(
    video_path,
    ckpt_path,
    labels_file,
    fps=4,
    normal_id=7,
    device=None,
    threshold=0.16,
):
    device = device or ("cuda" if torch.cuda.is_available() else "cpu")

    preprocess = build_clip_preprocess()
    frames_pil = sample_video_frames(video_path, fps_target=fps)
    frames_tensor = torch.stack([preprocess(img) for img in frames_pil])

    net_kwargs = build_net_args(labels_file, normal_id=normal_id)
    net = AnomalyCLIP(**net_kwargs).to(device).eval()
    load_net_weights_from_ckpt(net, ckpt_path, device=device, strict=False)

    ncentroid = compute_ncentroid_from_frames(frames_tensor, net, device)

    T = frames_tensor.shape[0]
    N, L = net.num_segments, net.seg_length
    BASE = N * L
    s = math.ceil(T / BASE)
    target_len = BASE * s

    if T < target_len:
        pad = frames_tensor[-1:].repeat(target_len - T, 1, 1, 1)
        frames_padded = torch.cat([frames_tensor, pad], dim=0)
    else:
        frames_padded = frames_tensor

    frames_padded = frames_padded.unsqueeze(0)
    labels = torch.zeros(target_len, dtype=torch.long, device=device)

    with torch.no_grad():
        similarity, scores = net(
            image_features=frames_padded.to(device),
            labels=labels,
            ncentroid=ncentroid,
            segment_size=s,
            test_mode=True,
        )

    similarity = similarity[:T]
    scores = scores[:T]

    softmax_sim = torch.softmax(similarity, dim=1)
    class_probs_abn = softmax_sim * scores.unsqueeze(1)
    normal_probs = (1.0 - scores).unsqueeze(1)

    left = class_probs_abn[:, :normal_id]
    right = class_probs_abn[:, normal_id:]
    class_probs_full = torch.cat([left, normal_probs, right], dim=1)

    sc_np = scores.detach().cpu().numpy()
    probs_np = class_probs_full.detach().cpu().numpy()

    abnormal_idx = np.where(sc_np > threshold)[0]

    labels_df = pd.read_csv(labels_file)
    class_names = labels_df["name"].tolist()

    if len(abnormal_idx) == 0:
        return {
            "prediction": "Normal",
            "class_id": normal_id,
            "confidence": float(1 - sc_np.mean()),
        }

    votes = []
    for i in abnormal_idx:
        frame_probs = probs_np[i].copy()
        frame_probs[normal_id] = -1
        votes.append(int(frame_probs.argmax()))

    values, counts = np.unique(votes, return_counts=True)
    majority_cls = values[counts.argmax()]

    return {
        "prediction": class_names[majority_cls],
        "class_id": int(majority_cls),
        "confidence": float(sc_np[abnormal_idx].mean()),
    }

