# 🚀 Django Backend Setup Guide

**Project:** Smart City using IoT
**Repository:** https://github.com/Devakrishna07/Smart-City-using-IOT.git

---

## 📌 Overview

This guide walks you through setting up and running the Django backend located at:

```
Smart-City-using-IOT/core_systems/backend_services/django_backend
```

It includes:

* Repository cloning
* Virtual environment setup
* Environment variable configuration
* Database migrations
* Running the development server

---

## 🧰 Prerequisites

Ensure the following are installed:

* Python 3.10+
* pip
* Git

---

## 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/Devakrishna07/Smart-City-using-IOT.git
cd Smart-City-using-IOT/core_systems/backend_services/django_backend
```

---

## 🧪 Step 2: Create Virtual Environment

### On Linux / macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

### On Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 📦 Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ⚙️ Step 4: Configure Environment Variables

Create a `.env` file in the `django_backend` directory:

```bash
touch .env
```

Add the following variables:

```env
HOSTNAME=your_supabase_hostname
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE=your_database_name
PORT=your_database_port
USER=your_database_username
PASSWORD=your_database_password
```

⚠️ **Important Notes:**

* Do NOT commit `.env` to Git
* Add `.env` to `.gitignore` if not already present

---

## 🗄️ Step 5: Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 👤 Step 6: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

Follow prompts to set username, email, and password.

---

## ▶️ Step 7: Run Development Server

```bash
python manage.py runserver
```

Server will start at:

```
http://127.0.0.1:8000/
```

---

## 🌐 Access Points

| Service     | URL                          |
| ----------- | ---------------------------- |
| Django App  | http://127.0.0.1:8000/       |
| Admin Panel | http://127.0.0.1:8000/admin/ |

---

## 📡 Running on Local Network (For IoT Devices)

To allow Raspberry Pi / FastAPI devices to connect:

```bash
python manage.py runserver 0.0.0.0:8000
```

Then access using:

```
http://<your-local-ip>:8000/
```

Example:

```
http://192.168.1.10:8000/
```

---

## 🧹 Deactivating Virtual Environment

```bash
deactivate
```

---

## ❗ Troubleshooting

### 1. Module Not Found Errors

```bash
pip install -r requirements.txt
```

---

### 2. Migration Issues

```bash
python manage.py makemigrations --merge
python manage.py migrate
```

---

### 3. Port Already in Use

```bash
python manage.py runserver 8001
```

---

## 🔐 Security Best Practices

* Never expose `.env` publicly
* Rotate Supabase keys if leaked
* Use strong passwords for superuser
* Disable DEBUG in production

---

## 📦 Production Notes (Optional)

For deployment:

* Use **Gunicorn + Nginx**
* Replace SQLite with **PostgreSQL (Supabase)**
* Configure static/media files properly

---

## ✅ Summary

You have now:

* Cloned the repository
* Configured environment variables
* Set up database migrations
* Started the Django server

Your backend is ready for:

* Frontend integration
* FastAPI device communication
* IoT-based alert ingestion

---

## 📞 Support

For issues or contributions:

* Open an issue in the GitHub repository
* Contact the project maintainer

---

🚀 Happy Building!
