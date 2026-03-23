from cProfile import label
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks
from fastapi.responses import StreamingResponse
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
import io
import logging
import time
from typing import Set, Dict

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
IMG_SIZE = 128
FRAME_COUNT = 16
CONFIRM_FRAMES = 1
CONFIDENCE_GATE = 0.90
STREAM_FPS = 10  # Frames per second for streaming
STREAM_QUALITY = 70  # JPEG quality for streaming (1-100)
ALERT_COOLDOWN_SECONDS = 30  # Don't send same alert more than once every 30 seconds

# Global buffers and state
frame_buffer = deque(maxlen=FRAME_COUNT)
confidence_history = deque(maxlen=CONFIRM_FRAMES)
latest_frame = None  # Store the latest frame for streaming
alert_last_sent_time = {}  # Track last alert time per camera
frame_lock = asyncio.Lock()  # Lock for thread-safe frame access

# Load TFLite model
try:
    interpreter = tf.lite.Interpreter(model_path="model.tflite")
    interpreter.allocate_tensors()
    
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    logger.info("TFLite model loaded successfully")
    logger.info(f"Input details: {input_details}")
    logger.info(f"Output details: {output_details}")
    
    model = interpreter  # Rename for compatibility with existing code
    
except Exception as e:
    logger.error(f"Failed to load TFLite model: {e}")
    interpreter = None
    model = None

# Django Server Configuration
DJANGO_API_URL = "http://127.0.0.1:8000/api/alerts/"
API_KEY = "api_001"
CAMERA_ID = "CAM_001"
CAMERA_LOCATION = "Kochi Junction"

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.alert_connections: Set[WebSocket] = set()
    
    async def connect(self, websocket: WebSocket, connection_type: str = "video"):
        await websocket.accept()
        if connection_type == "video":
            self.active_connections.add(websocket)
        elif connection_type == "alert":
            self.alert_connections.add(websocket)
        logger.info(f"New {connection_type} connection. Total video: {len(self.active_connections)}, alerts: {len(self.alert_connections)}")
    
    def disconnect(self, websocket: WebSocket, connection_type: str = "video"):
        if connection_type == "video":
            self.active_connections.discard(websocket)
        elif connection_type == "alert":
            self.alert_connections.discard(websocket)
        logger.info(f"{connection_type} connection closed. Total video: {len(self.active_connections)}, alerts: {len(self.alert_connections)}")
    
    async def broadcast_frame(self, frame_bytes: bytes):
        """Broadcast frame to all connected video clients"""
        if not self.active_connections:
            return
        
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_bytes(frame_bytes)
            except WebSocketDisconnect:
                disconnected.append(connection)
            except Exception as e:
                logger.error(f"Error broadcasting frame: {e}")
                disconnected.append(connection)
        
        # Clean up disconnected clients
        for conn in disconnected:
            self.active_connections.discard(conn)
    
    async def broadcast_alert(self, alert_data: dict):
        """Broadcast alert to all connected alert clients"""
        if not self.alert_connections:
            return
        
        disconnected = []
        for connection in self.alert_connections:
            try:
                await connection.send_json(alert_data)
            except WebSocketDisconnect:
                disconnected.append(connection)
            except Exception as e:
                logger.error(f"Error broadcasting alert: {e}")
                disconnected.append(connection)
        
        # Clean up disconnected clients
        for conn in disconnected:
            self.alert_connections.discard(conn)

manager = ConnectionManager()

def preprocess_frame(frame):
    """Preprocess frame for model prediction"""
    frame = cv2.resize(frame, (IMG_SIZE, IMG_SIZE))
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = frame.astype(np.float32) / 255.0
    return frame

def predict_tflite(sequence):
    """Make prediction using TFLite model"""
    if model is None:
        return 0.0
    
    try:
        # Ensure input has correct shape (batch_size, time_steps, height, width, channels)
        input_tensor = np.expand_dims(sequence, axis=0).astype(np.float32)
        
        # Set input tensor
        interpreter.set_tensor(input_details[0]['index'], input_tensor)
        
        # Run inference
        interpreter.invoke()
        
        # Get output
        output_data = interpreter.get_tensor(output_details[0]['index'])
        prob = float(output_data[0][0])
        
        return prob
    
    except Exception as e:
        logger.error(f"TFLite prediction error: {e}")
        return 0.0

def encode_frame_for_stream(frame):
    """Encode frame for streaming"""
    # Resize frame for streaming to reduce bandwidth
    height, width = frame.shape[:2]
    stream_width = min(width, 640)  # Limit width to 640px
    stream_height = int(height * (stream_width / width))
    
    if stream_width < width:
        frame = cv2.resize(frame, (stream_width, stream_height))
    
    _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, STREAM_QUALITY])
    return buffer.tobytes()

def generate_frames():
    """Generator for MJPEG streaming"""
    global latest_frame
    
    while True:
        if latest_frame is not None:
            frame_bytes = encode_frame_for_stream(latest_frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        else:
            # Send a blank frame if no video available
            blank = np.zeros((480, 640, 3), dtype=np.uint8)
            _, buffer = cv2.imencode('.jpg', blank)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        
        time.sleep(1.0 / STREAM_FPS)

async def frame_processor(frame):
    """Process frame for accident detection"""
    global latest_frame
    
    # Store latest frame for streaming
    async with frame_lock:
        latest_frame = frame.copy()
    
    frame_buffer.append(preprocess_frame(frame))
    label = 'warming up'
    probability = 0
    
    if len(frame_buffer) == FRAME_COUNT:
        # Convert deque to numpy array for prediction
        sequence = np.array(frame_buffer)
        prob = predict_tflite(sequence)
        confidence_history.append(prob)
        
        if (len(confidence_history) == CONFIRM_FRAMES and 
            all(p >= CONFIDENCE_GATE for p in confidence_history)):
            label = "ACCIDENT"
            color = (0, 0, 255)
            
            # Check if we should send alert (cooldown period)
            current_time = datetime.datetime.now()
            last_alert = alert_last_sent_time.get(CAMERA_ID)
            
            if (last_alert is None or 
                (current_time - last_alert).total_seconds() >= ALERT_COOLDOWN_SECONDS):
                # Send alert to Django
                await send_alert_to_django(frame, prob)
                alert_last_sent_time[CAMERA_ID] = current_time
                
                # Also broadcast alert via WebSocket
                alert_data = {
                    "type": "accident_detected",
                    "camera_id": CAMERA_ID,
                    "location": CAMERA_LOCATION,
                    "timestamp": current_time.isoformat(),
                    "confidence": prob
                }
                await manager.broadcast_alert(alert_data)
        else:
            label = "NORMAL"
            color = (0, 255, 0)
        
        probability = round(prob, 2)
    
    result = {"label": label, "probability": probability}
    return result

async def send_alert_to_django(frame, probability):
    """Send alert to Django server"""
    try:
        # Convert frame to JPEG
        _, buffer = cv2.imencode('.jpg', frame)
        
        files = {
            "video": ("frame.jpg", buffer.tobytes(), "image/jpeg")
        }
        
        current_time = datetime.datetime.now()
        data = {
            "camera_id": CAMERA_ID,
            "location": CAMERA_LOCATION,
            "date": str(current_time.date()),
            "time": str(current_time.time()),
            "confidence": probability
        }
        
        headers = {
            "X-API-KEY": API_KEY
        }
        
        # Send to Django with timeout
        response = await asyncio.to_thread(
            requests.post,
            DJANGO_API_URL,
            data=data,
            files=files,
            headers=headers,
            timeout=5.0
        )
        
        logger.info(f"Django Response: {response.status_code} - {response.text}")
        
    except Exception as e:
        logger.error(f"Failed to send alert to Django: {e}")

app = FastAPI(title="Accident Detection API", version="1.0")

class RequestModel(BaseModel):
    body: str
    
    @field_validator('body')
    def validate_body(cls, v):
        if not v:
            raise ValueError('Body cannot be empty')
        return v

@app.post("/predict")
async def validate_body(request: RequestModel):
    """Main prediction endpoint - receives frame, processes, returns result"""
    payload = request.body
    decoded_bytes = base64.b64decode(payload)
    nparray = np.frombuffer(decoded_bytes, np.uint8)
    raw_frame = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    
    if raw_frame is None:
        return {"error": "Invalid image data"}
    
    result = await frame_processor(raw_frame)
    return result

@app.get("/video_feed")
async def video_feed():
    """MJPEG streaming endpoint for browser viewing"""
    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        }
    )

@app.websocket("/ws/video")
async def websocket_video_endpoint(websocket: WebSocket):
    """WebSocket endpoint for live video streaming"""
    await manager.connect(websocket, "video")
    try:
        # Keep connection alive
        while True:
            # Wait for any message (keep-alive or control)
            data = await websocket.receive_text()
            # Echo back if needed
            await websocket.send_text("ok")
    except WebSocketDisconnect:
        manager.disconnect(websocket, "video")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket, "video")

@app.websocket("/ws/alerts")
async def websocket_alerts_endpoint(websocket: WebSocket):
    """WebSocket endpoint for receiving accident alerts"""
    await manager.connect(websocket, "alert")
    try:
        # Send initial connection confirmation
        await websocket.send_json({"type": "connected", "message": "Alert monitoring active"})
        
        # Keep connection alive and listen for any messages
        while True:
            data = await websocket.receive_text()
            # Process any client messages if needed
            await websocket.send_json({"type": "pong", "timestamp": datetime.datetime.now().isoformat()})
    except WebSocketDisconnect:
        manager.disconnect(websocket, "alert")
    except Exception as e:
        logger.error(f"Alert WebSocket error: {e}")
        manager.disconnect(websocket, "alert")

@app.get("/camera/info")
async def camera_info():
    """Get camera information"""
    return {
        "camera_id": CAMERA_ID,
        "location": CAMERA_LOCATION,
        "status": "active",
        "model_loaded": model is not None,
        "model_type": "TFLite" if model is not None else "None",
        "stream_fps": STREAM_FPS,
        "stream_quality": STREAM_QUALITY,
        "alert_cooldown": ALERT_COOLDOWN_SECONDS,
        "connected_clients": {
            "video": len(manager.active_connections),
            "alert": len(manager.alert_connections)
        }
    }

@app.get("/stats")
async def get_stats():
    """Get detection statistics"""
    return {
        "buffer_size": len(frame_buffer),
        "confidence_history": list(confidence_history),
        "last_alert": alert_last_sent_time.get(CAMERA_ID).isoformat() if alert_last_sent_time.get(CAMERA_ID) else None,
        "current_confidence": confidence_history[-1] if confidence_history else None,
        "warming_up": len(frame_buffer) < FRAME_COUNT
    }

@app.get("/")
def read_root():
    return {
        "service": "Accident Detection API",
        "version": "1.0",
        "camera_id": CAMERA_ID,
        "model_type": "TFLite",
        "endpoints": [
            "/predict (POST) - Send frame for prediction",
            "/video_feed (GET) - MJPEG video stream",
            "/ws/video (WebSocket) - Live video stream",
            "/ws/alerts (WebSocket) - Real-time alerts",
            "/camera/info (GET) - Camera information",
            "/stats (GET) - Detection statistics"
        ]
    }

# Background task to broadcast frames to WebSocket clients
@app.on_event("startup")
async def startup_event():
    """Start background tasks on server startup"""
    logger.info("Starting Accident Detection API server...")
    logger.info(f"Camera ID: {CAMERA_ID}")
    logger.info(f"Model Type: TFLite")
    logger.info(f"Django API URL: {DJANGO_API_URL}")
    
    # Start a background task to broadcast frames
    async def broadcast_frames():
        while True:
            if manager.active_connections and latest_frame is not None:
                frame_bytes = encode_frame_for_stream(latest_frame)
                await manager.broadcast_frame(frame_bytes)
            await asyncio.sleep(1.0 / STREAM_FPS)
    
    asyncio.create_task(broadcast_frames())

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on server shutdown"""
    logger.info("Shutting down server...")
    # Close all WebSocket connections
    for connection in manager.active_connections:
        await connection.close()
    for connection in manager.alert_connections:
        await connection.close()