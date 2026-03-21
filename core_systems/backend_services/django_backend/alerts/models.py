# alerts/models.py

from django.db import models
from django.conf import settings
from .services.supabase_storage import upload_video_to_supabase


class Alert(models.Model):
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    video_url = models.URLField(blank=True, null=True)

    # temporary upload field
    video_file = models.FileField(upload_to='temp/', blank=True, null=True)

    # ✅ Proper user reference
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='alerts',
        editable=False  # Prevent manual editing in admin
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """
        Upload video to Supabase and store URL
        """
        if self.video_file and not self.video_url:
            try:
                public_url = upload_video_to_supabase(self.video_file)
                self.video_url = public_url
                self.video_file = None
            except Exception as e:
                raise Exception(f"Video upload failed: {str(e)}")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Alert at {self.location} on {self.date} {self.time}"