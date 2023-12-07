from django.shortcuts import render
from django.views import View
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import CuentaSerializer, SolicitudCuentaSerializer

from Clientes.models import Cliente
from .models import Cuenta
import random
import string

# Create your views here.

class CuentasCliente(APIView):    
    authentication_classes = [BasicAuthentication]
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
            def generate_iban(country_code='AR'):
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
    
class CuentaCliente(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, cuenta):
        cuenta = Cuenta.objects.get(account_id=cuenta)

        if not request.user.userprofile.customer_id == cuenta.customer_id.customer_id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = CuentaSerializer(cuenta)
        return Response(serializer.data)
    
    def put(self, request, cuenta):
        cuenta = Cuenta.objects.get(account_id=cuenta)

        if not request.user.userprofile.customer_id == cuenta.customer_id.customer_id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = CuentaSerializer(cuenta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request, cuenta):

        if not request.user.userprofile.customer_id == cuenta.customer_id.customer_id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        cuenta = Cuenta.objects.get(account_id=cuenta)
        cuenta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)