from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    # Automatically assign logged-in user
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    # API key should NEVER be writable by client
    api_key = serializers.ReadOnlyField()

    class Meta:
        model = Device
        fields = [
            'id',
            'camera_id',
            'user',
            'device_name',
            'location',
            'is_active',
            'last_seen',
            'api_key',
            'created_at'
        ]
        read_only_fields = ['id', 'api_key', 'created_at']

    def validate_camera_id(self, value):
        """
        Ensure camera_id is not empty and normalized
        """
        if not value.strip():
            raise serializers.ValidationError("Camera ID cannot be empty")
        return value.strip()

    def create(self, validated_data):
        """
        User is automatically assigned via HiddenField
        API key is generated in model.save()
        """
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Prevent changing ownership and API key
        """
        validated_data.pop('user', None)
        validated_data.pop('api_key', None)
        return super().update(instance, validated_data)