from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import VideoStream
from .serializers import VideoStreamSerializer
from .permissions import IsOwner


class VideoStreamViewSet(viewsets.ModelViewSet):
    serializer_class = VideoStreamSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Only return streams owned by logged-in user
        """
        return VideoStream.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        """
        Assign stream to logged-in user
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Prevent editing others' streams
        """
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You cannot edit this stream")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Prevent deleting others' streams
        """
        if instance.user != self.request.user:
            raise PermissionDenied("You cannot delete this stream")
        instance.delete()