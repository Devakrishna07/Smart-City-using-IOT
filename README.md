# Smart City IoT — AI-Powered Accident & Anomaly Detection

An AI and IoT-based **Smart City monitoring and security system** designed to detect **road accidents, abnormal activities, and security anomalies** using camera-based monitoring, artificial intelligence, and connected IoT devices.

The system combines **IoT cameras, AI-based detection, Django, Flask, React.js, Tailwind CSS, and Python** to provide an integrated platform for monitoring roads and residential environments.

---

## 🚀 Project Overview

The **Smart City IoT** project was developed to improve safety and security in **urban roads, public areas, and homes** through intelligent camera-based monitoring.

The system uses IoT-connected cameras to capture real-time visual information and processes the camera feed using AI-based detection modules. When an accident or abnormal activity is identified, the system can process the event and provide the information to the connected backend and web interface.

### Main Objectives

* 🚗 Detect road accidents using AI-powered camera analysis
* ⚠️ Identify abnormal or anomalous activities
* 🏠 Provide camera-based security monitoring for homes
* 📷 Integrate IoT cameras with the AI processing system
* 🤖 Apply AI/ML techniques for intelligent event detection
* 🌐 Provide a web-based monitoring interface
* 🔗 Integrate IoT devices, AI services, backend systems, and frontend applications
* 📊 Provide a centralized platform for monitoring detected events

---

# 🏗️ System Architecture

The project is organized into multiple components responsible for IoT communication, AI processing, backend services, camera processing, and web integration.

```text
                         ┌───────────────────────┐
                         │      IoT Camera       │
                         │  Road / Home Camera   │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    Flask Cam Module   │
                         │ Camera Stream / Input  │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │      AI Backend       │
                         │ AI / ML Detection      │
                         │ Accident & Anomaly     │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    Django Backend     │
                         │ APIs / Data Handling   │
                         │ Application Backend    │
                         └───────────┬───────────┘
                                     │
                                     ▼
                  ┌────────────────────────────────────┐
                  │             React Frontend          │
                  │       React.js + Tailwind CSS       │
                  │ Monitoring / Web Integration        │
                  └────────────────────────────────────┘
```

---

# 📁 Project Structure

```text
smart-city-iot/
│
├── core_systems/
│   │
│   ├── backend/
│   │   │
│   │   ├── django_backend/
│   │   │   ├── manage.py
│   │   │   ├── requirements.txt
│   │   │   └── ...
│   │   │
│   │   ├── ai_backend/
│   │   │   ├── models/
│   │   │   ├── detection/
│   │   │   ├── inference/
│   │   │   └── ...
│   │   │
│   │   └── flask_cam/
│   │       ├── app.py
│   │       ├── camera/
│   │       └── ...
│   │
│   ├── shared_resources/
│   │   ├── iot/
│   │   │   ├── camera/
│   │   │   ├── sensors/
│   │   │   └── ...
│   │   │
│   │   └── ...
│   │
│   └── frontend/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── tailwind.config.js
│       └── ...
│
├── README.md
└── ...
```

---

# ⚙️ Core Components

## 1. Django Backend

The Django backend acts as the primary application backend and provides the infrastructure required for communication between the frontend, AI processing components, and system resources.

### Responsibilities

* Backend application logic
* API development
* Data management
* Communication with the frontend
* Handling detection-related information
* Integration with other system components

**Technology:**

* Python
* Django
* REST APIs

---

## 2. AI Backend

The AI backend contains the components responsible for processing camera information and performing intelligent detection.

The AI layer is designed to identify:

* 🚗 Road accidents
* ⚠️ Abnormal events
* 🏠 Security-related anomalies
* 📷 Camera-based visual events

The AI backend receives camera data and performs the required processing before passing relevant detection information to the application backend.

### Technology

* Python
* Artificial Intelligence
* Machine Learning
* Computer Vision
* Image/Video Processing

---

## 3. Flask Camera Module

The Flask camera module provides the camera-processing layer between the IoT camera and the AI/backend components.

It is responsible for handling camera input and making the camera stream or captured frames available to the processing pipeline.

### Responsibilities

* Camera stream handling
* Camera input processing
* Frame acquisition
* Communication with AI processing
* Camera service integration

**Technology:**

* Python
* Flask
* Camera/Video Processing

---

# 📡 IoT Module

The IoT components are located inside:

```text
core_systems/shared_resources/iot/
```

The IoT module contains the code required for connecting and integrating the camera/device layer with the overall Smart City system.

The IoT layer enables the project to operate with connected monitoring devices deployed in environments such as:

* Roads
* Residential areas
* Homes
* Other monitored locations

### IoT Workflow

```text
IoT Device
    │
    ▼
Camera Capture
    │
    ▼
Camera Module
    │
    ▼
AI Processing
    │
    ▼
Accident / Anomaly Detection
    │
    ▼
Backend
    │
    ▼
Web Dashboard
```

---

# 🎥 Accident Detection

One of the primary objectives of the project is **AI-powered road accident detection**.

The camera system continuously provides visual information that can be processed by the AI detection pipeline.

The system is designed to identify potential accident events from camera input and forward the resulting information through the backend architecture.

### Example Flow

```text
Road Camera
     ↓
Video / Image Input
     ↓
AI Processing
     ↓
Accident Detection
     ↓
Event Information
     ↓
Django Backend
     ↓
Web Interface
```

This approach can help reduce the dependency on manual monitoring and provide faster identification of potential road incidents.

---

# ⚠️ Anomaly Detection

The system also focuses on identifying **anomalous or unusual activities** from camera feeds.

Anomaly detection can be applied to monitored environments such as:

* Roads
* Residential areas
* Homes
* Security-sensitive locations

The AI processing layer analyzes incoming visual information and identifies events that differ from expected activity.

---

# 🏠 Home Security

In addition to smart-city road monitoring, the project can be used as a **camera-based security device for homes**.

The IoT camera can monitor a residential environment while the AI layer analyzes the incoming visual information for potentially abnormal events.

```text
Home IoT Camera
       ↓
Camera Processing
       ↓
AI Analysis
       ↓
Anomaly Detection
       ↓
Backend
       ↓
Web Interface
```

This provides a foundation for intelligent home monitoring using IoT and AI technologies.

---

# 🌐 Frontend

The frontend is located in:

```text
core_systems/frontend/
```

The web interface is developed using:

* **React.js**
* **Tailwind CSS**

The frontend provides the web integration layer for interacting with the Smart City monitoring system.

### Frontend Responsibilities

* Monitoring system information
* Displaying detection results
* Web-based system interaction
* Integrating backend APIs
* Presenting accident/anomaly information
* Providing a responsive user interface

### Technology Stack

```text
React.js
    +
Tailwind CSS
    +
Backend APIs
```

---

# 🔄 End-to-End Data Flow

The complete system follows an integrated IoT → AI → Backend → Web architecture.

```text
                  ┌──────────────┐
                  │  IoT Camera  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Flask Camera │
                  │    Module    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ AI Backend   │
                  │              │
                  │ Accident     │
                  │ Detection    │
                  │     +        │
                  │ Anomaly      │
                  │ Detection    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │    Django    │
                  │    Backend   │
                  │              │
                  │ APIs / Data  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   React.js   │
                  │   Frontend   │
                  │              │
                  │ Tailwind CSS │
                  └──────────────┘
```

---

# 🛠️ Technology Stack

| Category             | Technologies                                               |
| -------------------- | ---------------------------------------------------------- |
| **Programming**      | Python                                                     |
| **Backend**          | Django, Flask                                              |
| **AI / ML**          | Artificial Intelligence, Machine Learning, Computer Vision |
| **Frontend**         | React.js, Tailwind CSS                                     |
| **IoT**              | IoT Cameras, Connected Devices                             |
| **API**              | REST API                                                   |
| **Web Technologies** | HTML, CSS, JavaScript                                      |
| **Architecture**     | IoT + AI + Backend + Web                                   |

---

# 💻 Installation

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd smart-city-iot
```

---

## 2. Setup Django Backend

Navigate to the Django backend:

```bash
cd core_systems/backend/django_backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Activate it on Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

---

# 🤖 Running the AI Backend

Navigate to the AI backend:

```bash
cd core_systems/backend/ai_backend
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Run the AI processing service according to the project's AI backend entry point.

Example:

```bash
python app.py
```

> The exact command may vary depending on the AI backend entry file used in the repository.

---

# 📷 Running the Flask Camera Module

Navigate to:

```bash
cd core_systems/backend/flask_cam
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask camera service:

```bash
python app.py
```

The Flask module handles the camera-processing layer and provides camera input to the detection pipeline.

---

# 🌐 Running the React Frontend

Navigate to:

```bash
cd core_systems/frontend
```

Install Node.js dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

or, depending on the project configuration:

```bash
npm start
```

The frontend can then communicate with the backend through the configured APIs.

---

# 🔗 System Integration

The different components communicate through the following architecture:

```text
                    SMART CITY IoT SYSTEM
                             │
             ┌───────────────┴───────────────┐
             │                               │
        IoT Devices                    Web Application
             │                               │
             ▼                               ▼
      Flask Camera Module              React + Tailwind
             │                               │
             └───────────────┬───────────────┘
                             │
                             ▼
                       Django Backend
                             │
                             ▼
                        AI Backend
                             │
                   ┌─────────┴─────────┐
                   │                   │
                   ▼                   ▼
             Accident Detection   Anomaly Detection
```

---

# 🎯 Key Features

* **AI-powered accident detection**
* **Camera-based anomaly detection**
* **IoT camera integration**
* **Smart-city road monitoring**
* **Home security monitoring**
* **Python-based AI processing**
* **Django backend**
* **Flask camera service**
* **React.js web application**
* **Tailwind CSS responsive UI**
* **Backend API integration**
* **Modular system architecture**

---

# 🔮 Future Enhancements

Potential future improvements include:

* Real-time accident notifications
* SMS/email alert integration
* Mobile application support
* GPS-based accident location tracking
* Real-time notification dashboard
* Multiple-camera management
* Edge AI processing
* Cloud deployment
* Advanced anomaly classification
* Historical incident analytics
* Automated emergency-service integration
* Scalable IoT device management

---

# 📌 Use Cases

### 🚗 Smart Roads

AI-powered camera monitoring can help identify potential road accidents and abnormal events.

### 🏙️ Smart City Monitoring

The architecture can be extended to multiple IoT camera nodes across an urban environment.

### 🏠 Home Security

IoT cameras can be used for intelligent residential monitoring and anomaly detection.

### 🏢 Security Monitoring

The same architecture can be adapted for monitoring offices, institutions, and other controlled environments.

---

# 👨‍💻 Project Architecture Summary

The project follows a modular architecture where each component has a specific responsibility:

```text
IoT Layer
   ↓
Camera Layer
   ↓
AI / ML Layer
   ↓
Django Backend
   ↓
REST API
   ↓
React + Tailwind Frontend
```

This separation allows the IoT, AI, backend, and frontend components to be developed and maintained independently while working together as a unified monitoring platform.

---

# 📂 Repository Structure Summary

```text
smart-city-iot
│
└── core_systems
    │
    ├── backend
    │   ├── django_backend
    │   ├── ai_backend
    │   └── flask_cam
    │
    ├── shared_resources
    │   └── iot
    │
    └── frontend
        ├── React.js
        └── Tailwind CSS
```

---

# 📜 License

This project is developed for educational, research, and demonstration purposes.

Add the appropriate license file to this repository if the project is intended for public distribution.

---

# ⭐ Acknowledgements

This project combines concepts from:

* Internet of Things (IoT)
* Artificial Intelligence
* Machine Learning
* Computer Vision
* Web Development
* Cloud and Backend Systems

The goal is to demonstrate how **IoT devices and AI-based computer vision can be integrated with modern web technologies to create intelligent safety and security systems.**

---

## 🚀 Smart City IoT

**AI + IoT + Computer Vision + Web Technologies**

*Building intelligent systems for safer roads and smarter security.*
