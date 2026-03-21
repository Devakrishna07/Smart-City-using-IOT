from rest_framework.routers import DefaultRouter
from .views import DeviceViewSet

# Create router
router = DefaultRouter()

# Register DeviceViewSet
router.register(r'devices', DeviceViewSet, basename='device')

# Expose URLs
urlpatterns = router.urls