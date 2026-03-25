from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoStreamViewSet

router = DefaultRouter()
router.register(r"streams", VideoStreamViewSet, basename="streams")

urlpatterns = [
    path("streams", include(router.urls)),
]