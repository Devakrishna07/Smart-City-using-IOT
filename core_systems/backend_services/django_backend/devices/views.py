from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Device
from .serializers import DeviceSerializer


class IsOwner(permissions.BasePermission):
    """
    Custom permission to allow only owners of a device
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class DeviceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user devices (camera systems)
    """

    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Restrict devices to the logged-in user only
        """
        return Device.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Automatically assign logged-in user to device
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Prevent updating devices that don't belong to user
        """
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You cannot edit this device.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Prevent deleting devices that don't belong to user
        """
        if instance.user != self.request.user:
            raise PermissionDenied("You cannot delete this device.")
        instance.delete()