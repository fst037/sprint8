from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Tarjetas import views

router = DefaultRouter()
router.register(r'Tarjetas', views.DatosClienteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
