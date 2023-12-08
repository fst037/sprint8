from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Tarjeta
from .serializers import TarjetasSerializer
from rest_framework import viewsets
from django.views import View
from rest_framework.authentication import BasicAuthentication

# Create your views here.

class TarjetasClienteAPI(APIView):
        authentication_classes = [BasicAuthentication]
        permission_classes = [IsAuthenticated]
        def get(self, request, format=None):
            tarjetas = Tarjeta.objects.filter(customer_id=request.user.userprofile.customer_id)
            serializer = TarjetasSerializer(tarjetas, many=True)
            return Response(serializer.data)