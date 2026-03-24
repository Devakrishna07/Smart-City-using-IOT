from cProfile import label
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse, HTMLResponse
from pydantic import BaseModel, field_validator
import tensorflow as tf
import base64
import cv2
from collections import deque
import numpy as np
from sympy.stats.rv import probability
import requests
import datetime
import asyncio
import threading
import queue
import io
from fastapi.middleware.cors import CORSMiddleware

IMG_SIZE     = 128
FRAME_COUNT  = 16
CONFIRM_FRAMES  = 1
CONFIDENCE_GATE = 0.90   # show accident only above this
frame_buffer = deque(maxlen=FRAME_COUNT)
confidence_history = deque(maxlen=CONFIRM_FRAMES)

model = tf.keras.models.load_model('./accident_epoch_002.keras')

# 🔐 Device Credentials (VERY IMPORTANT)
DJANGO_API_URL = "http://127.0.0.1:8001/alert/alerts/"   # change this
API_KEY = "api_001"  # change this
CAMERA_ID = "CAM_001"

# Global queue for streaming frames
stream_queue = queue.Queue(maxsize=100)
active_connections = []

def preprocess_frame(frame):
    frame = cv2.resize(frame, (IMG_SIZE, IMG_SIZE))
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = frame.astype(np.float32) / 255.0
    return frame

def input_fn(payload):
    frame_buffer.append(preprocess_frame(payload))
    label = 'warming up'
    probability = 0
    if len(frame_buffer) == FRAME_COUNT:
        input_tensor = np.expand_dims(np.array(frame_buffer), axis=0)
        prob = float(model.predict(input_tensor, verbose=0)[0][0])
        confidence_history.append(prob)
        if (len(confidence_history) == CONFIRM_FRAMES and all(p >= CONFIDENCE_GATE for p in confidence_history)):
            label = "ACCIDENT"
            color = (0, 0, 255)  # red
        else:
            label = "NORMAL"
            color = (0, 255, 0)
        probability = round(prob, 2)
    result = {"label": label, "probability": probability}

    if label == "ACCIDENT":
        send_alert_to_django(payload, probability)

    return result

def send_alert_to_django(frame, probability):
    try:
        # Convert frame to video/image file (temporary)
        _, buffer = cv2.imencode('.jpg', frame)

        files = {
            "video": ("frame.jpg", buffer.tobytes(), "image/jpeg")
        }

        data = {
            "camera_id": CAMERA_ID,
            "location": "Kochi Junction",  # you can make dynamic later
            "date": str(datetime.date.today()),
            "time": str(datetime.datetime.now().time())
        }

        headers = {
            "X-API-KEY": API_KEY
        }

        response = requests.post(
            DJANGO_API_URL,
            data=data,
            files=files,
            headers=headers
        )

        print("Django Response:", response.status_code, response.text)

    except Exception as e:
        print("Failed to send alert:", e)

def draw_detection(frame, result):
    """Draw detection results on frame"""
    if result["label"] == "ACCIDENT":
        color = (0, 0, 255)  # Red
        text_color = (255, 255, 255)
    else:
        color = (0, 255, 0)  # Green
        text_color = (255, 255, 255)
    
    # Draw border around frame
    border_thickness = 5
    cv2.rectangle(frame, (0, 0), (frame.shape[1], frame.shape[0]), color, border_thickness)
    
    # Add text overlay
    label_text = f"{result['label']} ({result['probability']:.2f})"
    font = cv2.FONT_HERSHEY_SIMPLEX
    text_size = cv2.getTextSize(label_text, font, 0.7, 2)[0]
    cv2.rectangle(frame, (10, 10), (10 + text_size[0] + 10, 10 + text_size[1] + 10), color, -1)
    cv2.putText(frame, label_text, (15, 30), font, 0.7, text_color, 2)
    
    return frame

app = FastAPI()

# Add CORS middleware to allow connections from anywhere
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    body: str

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: bytes):
        for connection in self.active_connections:
            try:
                await connection.send_bytes(message)
            except:
                pass

manager = ConnectionManager()

def process_frame_worker():
    """Background worker to process frames and broadcast results"""
    while True:
        try:
            frame = stream_queue.get(timeout=1)
            if frame is None:
                break
            
            # Process frame with accident detection
            result = input_fn(frame)
            
            # Draw detection on frame
            annotated_frame = draw_detection(frame.copy(), result)
            
            # Encode frame to JPEG
            _, buffer = cv2.imencode('.jpg', annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
            jpeg_bytes = buffer.tobytes()
            
            # Broadcast to all connected clients
            asyncio.run(manager.broadcast(jpeg_bytes))
            
        except queue.Empty:
            continue
        except Exception as e:
            print(f"Error in processing worker: {e}")

# Start background processing thread
processing_thread = threading.Thread(target=process_frame_worker, daemon=True)
processing_thread.start()

@app.post("/predict")
async def validate_body(request: RequestModel):
    payload = request.body
    decoded_bytes = base64.b64decode(payload)
    nparray = np.frombuffer(decoded_bytes, np.uint8)
    raw_frame = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    
    # Add frame to processing queue for streaming
    if not stream_queue.full():
        stream_queue.put(raw_frame)
    
    result = input_fn(raw_frame)
    return result

@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/video_feed")
async def video_feed():
    """MJPEG streaming endpoint"""
    async def generate():
        while True:
            try:
                frame = stream_queue.get(timeout=0.1)
                if frame is not None:
                    result = input_fn(frame)
                    annotated_frame = draw_detection(frame.copy(), result)
                    _, buffer = cv2.imencode('.jpg', annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
            except queue.Empty:
                await asyncio.sleep(0.05)
            except Exception as e:
                print(f"Stream error: {e}")
                await asyncio.sleep(0.05)
    
    return StreamingResponse(generate(), 
                           media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/")
def read_root():
    return {"message": "Accident Detection Streaming Server", 
            "status": "running",
            "endpoints": {
                "/predict": "POST - Send base64 encoded frame for prediction",
                "/video_feed": "GET - MJPEG video stream",
                "/ws/stream": "WebSocket - Real-time video stream",
                "/view": "GET - HTML viewer page"
            }}

@app.get("/view")
async def view_page():
    """HTML page with video player"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Accident Detection Live Stream</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: #1a1a1a;
                color: #fff;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                text-align: center;
            }
            h1 {
                color: #ff4444;
            }
            .status {
                margin: 20px;
                padding: 10px;
                background: #333;
                border-radius: 5px;
            }
            .video-container {
                background: #000;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.5);
            }
            img {
                width: 100%;
                height: auto;
            }
            .info {
                margin-top: 20px;
                padding: 15px;
                background: #333;
                border-radius: 5px;
            }
            .alert {
                color: #ff4444;
                font-weight: bold;
            }
            button {
                background: #ff4444;
                color: white;
                border: none;
                padding: 10px 20px;
                margin: 10px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover {
                background: #cc0000;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚨 Accident Detection System 🚨</h1>
            <div class="status" id="status">
                Status: <span id="detection_status">Monitoring...</span>
            </div>
            <div class="video-container">
                <img id="video_feed" src="/video_feed" alt="Video Stream">
            </div>
            <div class="info">
                <h3>System Information</h3>
                <p>Camera ID: """ + CAMERA_ID + """</p>
                <p>Location: Kochi Junction</p>
                <p>Detection Confidence Threshold: """ + str(CONFIDENCE_GATE) + """</p>
                <p>Analysis Frames: """ + str(FRAME_COUNT) + """</p>
                <button onclick="location.reload()">Refresh Stream</button>
                <button onclick="checkStatus()">Check Status</button>
            </div>
        </div>
        
        <script>
            const videoFeed = document.getElementById('video_feed');
            const statusSpan = document.getElementById('detection_status');
            
            // Monitor stream connection
            videoFeed.onerror = function() {
                statusSpan.innerHTML = '❌ Stream disconnected - Attempting to reconnect...';
                statusSpan.style.color = '#ff4444';
                setTimeout(() => {
                    videoFeed.src = '/video_feed?' + new Date().getTime();
                }, 3000);
            };
            
            videoFeed.onload = function() {
                statusSpan.innerHTML = '✅ Active - Monitoring for accidents';
                statusSpan.style.color = '#44ff44';
            };
            
            function checkStatus() {
                fetch('/')
                    .then(response => response.json())
                    .then(data => {
                        console.log('Server status:', data);
                        alert('Server is running\\nStatus: ' + data.status);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Cannot connect to server');
                    });
            }
            
            // Auto-reconnect if connection drops
            setInterval(() => {
                if (videoFeed.complete && videoFeed.naturalHeight === 0) {
                    videoFeed.src = '/video_feed?' + new Date().getTime();
                }
            }, 5000);
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)