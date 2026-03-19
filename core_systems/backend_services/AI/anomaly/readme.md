# 🎥 Real-Time CCTV Anomaly Detection System

A FastAPI-based real-time CCTV monitoring system that:

- Connects to a LAN WiFi camera (HTTP stream)
- Continuously buffers the last 60 seconds of video
- Automatically runs anomaly detection every 60 seconds
- Returns structured JSON results
- Uses AnomalyCLIP for inference

---

## 🚀 Features

- Continuous RTSP camera ingestion
- Circular frame buffer (last 60 seconds)
- Automatic periodic anomaly analysis
- JSON prediction output
- Thread-safe background workers
- Modern FastAPI lifespan architecture

---

## 📦 Requirements

### 🔹 System Requirements

- Python 3.8
- WiFi IP camera with HTTP enabled
- 8GB+ RAM recommended
- NVIDIA GPU (optional, for faster inference)

---

## 📚 Installation

### 1️⃣ Clone Repository

```bash
git https://github.com/Devakrishna07/Smart-City-using-IOT.git
cd core_systems/backend_services/AI/anomaly
```

### 2️⃣ Create Virtual Environment

```bash
conda create -n anomaly python=3.8 -y
```

Activate it:

**Windows**
```bash
conda activate project_env
```

### 3️⃣ Install Dependencies

```bash
pip install requirements.txt
```

Use the [**pretrained checkpoints**](https://drive.google.com/file/d/1kgifxpoVn6EwZUIbZ0DbA8zI88aaVPV3/view?usp=drive_link) for inference: download and extract the zip, then place the `last.ckpt` file from the **ucfcrime** folder into the checkpoints folder.

---

## 📁 Project Structure

```
project/
│
├── main.py                 # FastAPI server
├── inference.py            # run_inference() module
├── checkpoints/
│   └── last.ckpt
├── data/
│   └── ucf_labels.csv
├── videos/                 # Saved clips
└── README.md
```

---

## 🎥 Camera Setup

Make sure your camera supports RTSP.

Typical format:

```
rtsp://username:password@192.168.1.100:554/stream1
```

Set this inside `main.py`:

```python
RTSP_URL = "http://192.168.1.100:554/video"
```

---

## ▶️ Running the Server

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

When the server starts:

- It connects to the camera automatically
- Begins buffering frames
- Runs anomaly analysis every 60 seconds

---

## 🔄 How It Works

1. Server starts
2. Background thread connects to RTSP stream
3. Frames stored in circular buffer
4. Every 60 seconds:
   - Buffer saved as video clip
   - Anomaly model runs
   - JSON result generated

---

## 📤 Example Output

```json
{
  'prediction': 'Normal',
  'class_id': 7, 
  'confidence': 0.9847571346908808
}
```

---

## 🧠 Inference Example

```python
result = run_inference(
    video_path="videos/clip_20260301_192530.mp4",
    ckpt_path="checkpoints/last.ckpt",
    labels_file="data/ucf_labels.csv",
    fps=4,
)
```

Make sure:

- `last.ckpt` exists in `checkpoints/`
- `ucf_labels.csv` exists in `data/`

---

## ⚙️ Configuration

Inside `main.py`:

```python
FPS = 20
BUFFER_SECONDS = 60
ANALYSIS_INTERVAL = 60
```

You can adjust:

- Buffer duration
- Analysis frequency
- Frame sampling rate

---

## 🛠 Production Recommendations

- Use RTSP (H264) instead of MJPEG
- Load model once at startup
- Use timestamped filenames
- Add logging system
- Implement auto-reconnection logic
- Use FFmpeg backend for maximum stability

---

## 🧪 Testing Without Camera

You can replace RTSP with a local video:

```python
RTSP_URL = "test_video.mp4"
```

---

## 📈 Future Improvements

- Multi-camera support
- Web dashboard
- Database logging
- Sliding window analysis
- Docker containerization
- Real-time alert system (Email / SMS)

---
