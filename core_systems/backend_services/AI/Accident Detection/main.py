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
from tensorflow.keras.models import load_model
from keras.models import Sequential
from keras.layers import Conv2D, BatchNormalization, MaxPooling2D, Flatten, Dense, Dropout
from fastapi import FastAPI
from pydantic import BaseModel, field_validator


def cnn_model():
    input_shape = (128,128,1)
    model = Sequential()
    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', padding='Same', input_shape=input_shape))
    model.add(BatchNormalization())

    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', padding='Same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(64, (3, 3), activation='relu', padding='Same'))
    model.add(BatchNormalization())

    model.add(Conv2D(64, (3, 3), activation='relu', padding='Same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu', padding='Same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(128, (3, 3), activation='relu', padding='Same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Flatten())

    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(2, activation='softmax'))

    return model

model = cnn_model()
model.load_weights("./car_accident_model.weights.h5")
classNames = ['Accident','Not Accident']

app = FastAPI()

def log_response_to_file(response_data):
    with open("C:/Users/USER/Desktop/Project/AI/Yolo/Sign/API/response.txt", "w") as file:  # Open in append mode
        file.write(json.dumps(response_data, indent=4) + "\n\n")

class RequestModel(BaseModel):
    body: str

@app.post("/validate_body")
async def validate_body(request: RequestModel):  # Length of the starting format
    payload = request.body  # Extract only the inner content
    decoded_bytes = base64.b64decode(payload)
    nparray = np.frombuffer(decoded_bytes, np.uint8)
    raw_frame = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    gray_frame = cv2.cvtColor(raw_frame, cv2.COLOR_BGR2GRAY)
    resized_frame = cv2.resize(gray_frame, (128, 128))
    normalized_frame = resized_frame.astype("float32") / 255.0
    final_frame = np.expand_dims(np.expand_dims(normalized_frame, axis=0), axis=-1)
    prediction = model.predict(final_frame)
    result_index = np.argmax(prediction)
    status = classNames[result_index]
    confidence = float(np.max(prediction)) * 100
    return {
        "prediction": status,
        "confidence": f"{confidence:.2f}%",
        "alert_triggered": True if status == "Accident" and confidence > 90 else False
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}