from django.shortcuts import render
from django.views import View
from Login.models import UserProfile
from Clientes.models import Cliente
from rest_framework import viewsets
from .serializers import ClienteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class DatosCliente(APIView):        
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cliente = Cliente.objects.get(customer_id=request.user.userprofile.customer_id)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)
