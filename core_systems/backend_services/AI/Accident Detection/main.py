import cv2
import numpy as np
from flask import Response
from flask import Flask
from flask import render_template
import threading
import paho.mqtt.client as mqtt
import requests
import json
import base64
import socket
#from tensorflow.keras.models import load_model
from keras.models import Sequential
from keras.layers import Conv2D, BatchNormalization, MaxPooling2D, Flatten, Dense, Dropout
from fastapi import FastAPI
from pydantic import BaseModel, field_validator
import tensorflow as tf
model = tf.keras.models.load_model('./accident_recognition_model_1.keras')
classNames = ['minor','moderate','major']

app = FastAPI()

def log_response_to_file(response_data):
    with open("C:/Users/USER/Desktop/Project/AI/Yolo/Sign/API/response.txt", "w") as file:  # Open in append mode
        file.write(json.dumps(response_data, indent=4) + "\n\n")

class RequestModel(BaseModel):
    body: str

import base64
import cv2
from collections import deque

FRAME_COUNT = 30

prev_gray = None
flow_buffer = deque(maxlen=FRAME_COUNT - 1)

async def validate_body(request: RequestModel):

    global prev_gray, flow_buffer

    # 1️⃣ Decode incoming frame
    payload = request.body
    decoded_bytes = base64.b64decode(payload)
    nparray = np.frombuffer(decoded_bytes, np.uint8)
    raw_frame = cv2.imdecode(nparray, cv2.IMREAD_COLOR)

    if raw_frame is None:
        return {"error": "Invalid frame"}

    # 2️⃣ Preprocess frame (same as training)
    gray = cv2.cvtColor(raw_frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (128, 128))

    # 3️⃣ Compute optical flow (if previous frame exists)
    if prev_gray is not None:
        flow = cv2.calcOpticalFlowFarneback(
            prev_gray, gray,
            None, 0.5, 3, 15, 3, 5, 1.2, 0
        )

        # Normalize (SAME AS TRAINING)
        mean = np.mean(flow, axis=(0, 1))
        std = np.std(flow, axis=(0, 1))
        flow = (flow - mean) / (std + 1e-6)

        flow_buffer.append(flow)

    prev_gray = gray

    # 4️⃣ If not enough frames yet → wait
    if len(flow_buffer) < FRAME_COUNT - 1:
        return {
            "prediction": "Collecting frames",
            "confidence": "0.00%",
            "alert_triggered": False
        }

    # 5️⃣ Prepare model input
    input_tensor = np.array(flow_buffer, dtype=np.float32)
    input_tensor = np.expand_dims(input_tensor, axis=0)  # (1, 29, 128, 128, 2)

    # 6️⃣ Model inference
    prediction = model.predict(input_tensor, verbose=0)

    result_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction)) * 100
    status = classNames[result_index]

    return {
        "prediction": status,
        "confidence": f"{confidence:.2f}%",
        "alert_triggered": True if status == "Accident" and confidence > 90 else False
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}