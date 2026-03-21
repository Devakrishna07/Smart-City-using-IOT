# alerts/views.py

from rest_framework import viewsets, permissions
from .models import Alert
from .serializers import AlertSerializer


class AlertViewSet(viewsets.ModelViewSet):
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # ✅ Only return alerts of logged-in user
        return Alert.objects.filter(created_by=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # ✅ Assign logged-in user automatically
        serializer.save(created_by=self.request.user)