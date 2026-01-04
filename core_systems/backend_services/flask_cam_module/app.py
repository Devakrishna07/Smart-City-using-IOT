# app.py
from flask import Flask, Response, render_template
import cv2
from camera import VideoCamera
from ai_client import send_frame_to_ai
import json

app = Flask(__name__)
camera = VideoCamera()

def generate_frames():
    while True:
        frame = camera.get_frame()
        if frame is None:
            break

        # Send frame to AI
        ai_result = send_frame_to_ai(frame)

        # Overlay AI result
        label = ai_result["prediction"]
        confidence = ai_result["confidence"]

        cv2.putText(
            frame,
            f"{label} ({confidence})",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            2
        )

        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
