import tensorflow as tf
import cv2
import numpy as np
global prev_gray, flow_buffer
from collections import deque
VIDEO_PATH = "accident_2.mp4"
FRAME_COUNT = 30

prev_gray = None
flow_buffer = deque(maxlen=FRAME_COUNT - 1)

import tensorflow as tf

# Enable mixed precision (matches your trained model)
tf.keras.mixed_precision.set_global_policy("float32")





model = tf.keras.models.load_model('./accident_recognition_model_1.keras')
classNames = ['minor','moderate','major']

cap = cv2.VideoCapture(VIDEO_PATH)
success, frame = cap.read()

while success:
    raw_frame = frame
    gray = cv2.cvtColor(raw_frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (128, 128))

    if prev_gray is not None:
        flow = cv2.calcOpticalFlowFarneback(prev_gray, gray,None, 0.5, 3, 15, 3, 5, 1.2, 0)

        mean = np.mean(flow, axis=(0, 1))
        std = np.std(flow, axis=(0, 1))
        flow = (flow - mean) / (std + 1e-6)

        flow_buffer.append(flow)
    prev_gray = gray

    if len(flow_buffer) < FRAME_COUNT - 1:
        print("Collecting Frames")
    else:
        input_tensor = np.array(flow_buffer, dtype=np.float32)
        input_tensor = np.expand_dims(input_tensor, axis=0)
        prediction = model.predict(input_tensor, verbose=0)
        result_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction)) * 100
        print(result_index)
        status = classNames[result_index]