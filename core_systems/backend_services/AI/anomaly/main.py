from fastapi import FastAPI
from contextlib import asynccontextmanager
import threading
import cv2
from collections import deque
import time
from inference import run_inference
RTSP_URL = "http://192.168.1.2:8080/video"

FPS = 20
BUFFER_SECONDS = 60
MAX_FRAMES = FPS * BUFFER_SECONDS

frame_buffer = deque(maxlen=MAX_FRAMES)
buffer_lock = threading.Lock()
stop_event = threading.Event()

# ----------------------------------
# Camera Listener (always running)
# ----------------------------------
def camera_listener():
    while not stop_event.is_set():
        cap = cv2.VideoCapture(RTSP_URL)

        if not cap.isOpened():
            time.sleep(5)
            continue

        while not stop_event.is_set():
            ret, frame = cap.read()
            if not ret:
                break

            with buffer_lock:
                frame_buffer.append(frame)

        cap.release()

# ----------------------------------
# Periodic Analyzer (every 60 sec)
# ----------------------------------
def analyzer_loop():
    while not stop_event.is_set():
        time.sleep(60)  # Wait 60 seconds

        with buffer_lock:
            frames = list(frame_buffer)

        if not frames:
            continue

        print("Running analysis...")

        # Save video
        height, width, _ = frames[0].shape
        out = cv2.VideoWriter(
            "snapshot.mp4",
            cv2.VideoWriter_fourcc(*"mp4v"),
            FPS,
            (width, height)
        )

        for frame in frames:
            out.write(frame)

        out.release()

        # Run anomaly model here
        result = run_inference(
            video_path="snapshot.mp4",
            ckpt_path="checkpoints/last.ckpt",
            labels_file="ucf_labels.csv",
            fps=4,
        )

        print("Analysis result:", result)

# ----------------------------------
# Lifespan (Modern FastAPI)
# ----------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    cam_thread = threading.Thread(target=camera_listener, daemon=True)
    analyze_thread = threading.Thread(target=analyzer_loop, daemon=True)

    cam_thread.start()
    analyze_thread.start()

    yield

    stop_event.set()


app = FastAPI(lifespan=lifespan)