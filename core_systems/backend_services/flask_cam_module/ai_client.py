# ai_client.py
import base64
import requests
import cv2
import json

FASTAPI_URL = "http://127.0.0.1:8000/validate_body"

def send_frame_to_ai(frame):
    _, buffer = cv2.imencode(".jpg", frame)
    encoded = base64.b64encode(buffer).decode("utf-8")

    payload = {"body": encoded}

    response = requests.post(FASTAPI_URL, json=payload, timeout=2)
    return response.json()
