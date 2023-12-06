from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Sucursal
from .serializers import SucursalSerializer

# Create your views here.

class ListarSucursales(APIView):
    def get(self, request):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data)