# AI-Accident Detection (CNN)
### Phase 1: Real-time Accident Detection Pipeline

Video File or Live video Stream from the client is taken and sent to the server. The server then processes the video and detects accidents using a CNN model. The server then sends the results back to the client.

---

## 🚀 System Overview
The system utilizes a **Producer-Consumer** architecture:
1.  **Client (Producer):** Captures raw video from local cameras, converts frames into Base64 encoded strings, and sends them via HTTP POST requests.
2.  **Server (Consumer):** A high-performance FastAPI backend that receives the strings, reconstructs the images, and passes them through a custom CNN for inference.



---

## 🛠️ Technical Stack
* **Backend:** FastAPI (Python)
* **Machine Learning:** TensorFlow/Keras (CNN Model)
* **Computer Vision:** OpenCV (Image Preprocessing & Decoding)
* **Data Transport:** JSON with Base64 String Encoding
* **Version Control:** Git

## 📁 Project Structure
```text
Smart-City-using-IOT/
├── core_systems/
│   └── backend_services/
│       └── AI/
│           └── Accident Detection/
│               ├── main.py            # FastAPI Server (Logic & AI Brain)
│               ├── client.py          # Camera Streaming Script
│               ├── model.h5           # Trained CNN Weights
│               └── requirements.txt   # Environment Dependencies
├── .gitignore                         # Tracking exclusions (venv, pycache)
└── README.md                          # Project Documentation

```
## ⚙️ Installation and Usage

* **Prerequisites:** Python 3.10+, pip, and a webcam or video file.


1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/Smart-City-using-IOT.git
   cd Smart-City-using-IOT/core_systems/backend_services/AI/Accident Detection
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Server:**
   ```bash
   fastapi dev main.py
   ```

4. **Run the Client:**
   ```bash
   python client.py
   ```

5. **Access the API:**
   - Open the link[^1] in your browser to interact with the API documentation.

[^1]: The Link will be provided in the terminal after running the server (usually `http://127.0.0.1:8000/docs`).

## 📊 Model Performance
The CNN model achieves an accuracy of **95%** on the test dataset, demonstrating robust performance in accident detection scenarios.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.