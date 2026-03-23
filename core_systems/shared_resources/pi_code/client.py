import cv2
import base64
import requests
import time
import subprocess
import os


def get_usb_webcam_device():
    """
    Find the USB webcam device connected to Raspberry Pi
    Returns the device path (e.g., /dev/video0) or None if not found
    """
    try:
        # List video devices
        result = subprocess.run(['v4l2-ctl', '--list-devices'], 
                              capture_output=True, text=True)
        output = result.stdout
        
        # Look for USB camera devices
        lines = output.split('\n')
        for i, line in enumerate(lines):
            if 'USB' in line or 'usb' in line.lower():
                # Next line usually contains the device path
                if i + 1 < len(lines) and '/dev/video' in lines[i+1]:
                    device = lines[i+1].strip()
                    return device
        return None
    except:
        return "/dev/video0"  # Default fallback


def stream_raw_frames(video_path, server_url):
    # 1. Find the USB-connected phone camera (acts as USB webcam)
    usb_device = get_usb_webcam_device()
    
    if usb_device and os.path.exists(usb_device):
        print(f"Using USB device: {usb_device}")
        # For USB webcam (phone connected via USB with camera app running)
        # Use GStreamer pipeline or V4L2 backend for better compatibility
        cap = cv2.VideoCapture(usb_device, cv2.CAP_V4L2)
    else:
        print("No USB webcam detected, trying default video0...")
        cap = cv2.VideoCapture(0, cv2.CAP_V4L2)  # Try default webcam
    
    # Alternative: If the above doesn't work, try with GStreamer pipeline
    if not cap.isOpened():
        print("Trying GStreamer backend for USB device...")
        # GStreamer pipeline for USB webcam (adjust based on your setup)
        gst_pipeline = "v4l2src device=/dev/video0 ! videoconvert ! video/x-raw,format=BGR ! appsink"
        cap = cv2.VideoCapture(gst_pipeline, cv2.CAP_GSTREAMER)

    if not cap.isOpened():
        print("Error: Could not open video from USB device.")
        print("Make sure your phone is connected via USB and is in USB tethering/webcam mode.")
        return

    print("Starting raw frame stream from USB-connected phone...")
    print(f"Server URL: {server_url}")

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print("Video ended or frame capture failed.")
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