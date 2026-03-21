from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    # Ensure user is not manually set by client
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Alert
        fields = [
            'id',
            'date',
            'time',
            'location',
            'video_url',
            'video_file',
            'created_by',
            'created_at'
        ]
        read_only_fields = ['video_url', 'created_at']

    def create(self, validated_data):
        """
        Automatically assign user and handle video upload via model save()
        """
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Prevent changing owner and allow updating video if needed
        """
        validated_data.pop('created_by', None)
        return super().update(instance, validated_data)