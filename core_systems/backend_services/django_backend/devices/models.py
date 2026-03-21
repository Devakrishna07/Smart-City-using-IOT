from django.db import models
from django.conf import settings
import uuid


class Device(models.Model):
    """
    Represents a physical camera device registered to a user
    """

    # Internal unique identifier (not exposed publicly)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Camera ID coming from the device (e.g., Raspberry Pi ID)
    camera_id = models.CharField(max_length=100)

    # Link to Django auth user (owner of device)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='devices',
        editable=False
    )

    # Optional metadata
    device_name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    # Device status tracking
    is_active = models.BooleanField(default=True)
    last_seen = models.DateTimeField(blank=True, null=True)

    # Security / authentication (for device → backend communication)
    api_key = models.CharField(max_length=255, unique=True, editable=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevent duplicate camera IDs per user
        unique_together = ('camera_id', 'user')
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        """
        Auto-generate API key for device authentication
        """
        if not self.api_key:
            self.api_key = uuid.uuid4().hex

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.camera_id} ({self.user})"