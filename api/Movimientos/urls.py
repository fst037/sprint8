from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Cuentas import views

router = DefaultRouter()
router.register(r'Movimientos', views.MovimientosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]