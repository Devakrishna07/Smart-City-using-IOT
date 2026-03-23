import cv2
import base64
import requests
import time


def stream_raw_frames(video_path, server_url):
    # 1. Open the video file
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    print("Starting raw frame stream...")

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print("Video ended.")
            break

        # 2. Encode the raw frame to JPEG (standard pixel format)
        # We don't resize or grayscale here—just send it as captured
        _, buffer = cv2.imencode('.jpg', frame)

        # 3. Convert to Base64 string for JSON packaging
        jpg_as_text = base64.b64encode(buffer).decode('utf-8')

        # 4. Create the payload
        payload = {"body": jpg_as_text}

        try:
            # Send to your FastAPI server
            response = requests.post(server_url, json=payload)
            result_data = response.json()
            print(result_data)
            current_status = result_data.get("label")
            confidence = result_data.get("probability")
            print(f"Server says: {current_status} ({confidence})")
        except Exception as e:
            print(f"Connection Error: {e}")
            break

        # Small sleep so we don't overwhelm the network/CPU
        time.sleep(0.01)

    cap.release()


# Usage
URL = "http://127.0.0.1:8001/predict"
stream_raw_frames("Accident video.mp4", URL)