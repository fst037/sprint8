from django.shortcuts import render
from django.views import View
from Login.models import UserProfile
from Clientes.models import Cliente
from rest_framework import viewsets
from .serializers import ClienteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


# Create your views here.

class DatosCliente(APIView):        
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, customer_id = None):
        if customer_id is None:
            customer_id = request.user.userprofile.customer_id
        else:
            if not request.user.is_staff:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)


        cliente = Cliente.objects.get(customer_id=customer_id)
        
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)
    
    def put(self, request, customer_id = None):
        #SE INTERPRETO MODIFICAR DIRECCION DEL CLIENTE COMO MODIFICAR LA SUCURSAL
        if customer_id is None:
            customer_id = request.user.userprofile.customer_id
        else:
            if not request.user.is_staff:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)


        cliente = Cliente.objects.get(customer_id=customer_id)
        serializer = ClienteSerializer(cliente, data=request.data)
        
        if serializer.is_valid():
            cliente.branch_id = serializer.validated_data['branch_id']
            cliente.save()

            return Response(serializer.data)
        return Response(serializer.errors)
    
