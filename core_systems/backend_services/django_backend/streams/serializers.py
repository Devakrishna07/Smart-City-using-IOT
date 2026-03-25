from rest_framework import serializers
from .models import VideoStream


class VideoStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoStream
        fields = [
            "id",
            "name",
            "stream_url",
            "stream_type",
            "is_active",
            "created_at",
            "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_stream_url(self, value):
        if not value.startswith(("rtsp://", "http://", "https://")):
            raise serializers.ValidationError("Invalid stream URL format")
        return value

    def create(self, validated_data):
        user = self.context["request"].user
        return VideoStream.objects.create(user=user, **validated_data)