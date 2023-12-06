from django.shortcuts import render
from django.views import View
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication 
from rest_framework.permissions import IsAuthenticated
from .serializers import CuentaSerializer, SolicitudCuentaSerializer

from Clientes.models import Cliente
from .models import Cuenta
import random
import string

# Create your views here.

class CuentasCliente(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cuentas = Cuenta.objects.filter(customer_id=request.user.userprofile.customer_id)
        data = []
        for cuenta in cuentas:
            serializer = CuentaSerializer(cuenta)
            data.append(serializer.data)
        return Response(data)
    
    def post(self, request):        
        serializer = SolicitudCuentaSerializer(data=request.data)
        
        if serializer.is_valid():
            def generate_iban(country_code='ES'):
                control_digits = ''.join(random.choices(string.digits, k=2))
                account_number = ''.join(random.choices(string.digits, k=20))
                iban = country_code + control_digits + account_number
                return iban

            customer_id = Cliente.objects.get(customer_id=request.user.userprofile.customer_id)
            balance = 0
            iban = generate_iban()
            tipo = serializer.validated_data.get('tipo')
            
            Cuenta.objects.create(customer_id=customer_id, balance=balance, iban=iban, tipo=tipo)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)