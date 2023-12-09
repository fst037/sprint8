from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Prestamos import views

router = DefaultRouter()
router.register(r'Cuentas', views.PrestamosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]