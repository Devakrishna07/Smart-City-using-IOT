from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class VideoStream(models.Model):
    STREAM_TYPES = [
        ("rtsp", "RTSP"),
        ("http", "HTTP"),
        ("webrtc", "WebRTC"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="video_streams"
    )

    name = models.CharField(max_length=255)
    stream_url = models.URLField()
    stream_type = models.CharField(max_length=10, choices=STREAM_TYPES, default="rtsp")

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"