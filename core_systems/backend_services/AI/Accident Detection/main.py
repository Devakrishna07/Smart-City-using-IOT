import json
from fastapi import FastAPI
from pydantic import BaseModel, field_validator
from fastapi import FastAPI
from pydantic import BaseModel, field_validator
import tensorflow as tf
import base64
import cv2
from collections import deque
import numpy as np
from sympy.stats.rv import probability

IMG_SIZE     = 128
FRAME_COUNT  = 16
CONFIRM_FRAMES  = 1
CONFIDENCE_GATE = 0.90   # show accident only above this
frame_buffer = deque(maxlen=FRAME_COUNT)
confidence_history = deque(maxlen=CONFIRM_FRAMES)

model = tf.keras.models.load_model('./accident_epoch_002.keras')

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
    return result

app = FastAPI()

class RequestModel(BaseModel):
    body: str

@app.post("/predict")
async def validate_body(request: RequestModel):
    payload = request.body
    decoded_bytes = base64.b64decode(payload)
    nparray = np.frombuffer(decoded_bytes, np.uint8)
    raw_frame = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    result = input_fn(raw_frame)
    return result

@app.get("/")
def read_root():
    return {"Hello": "World"}