from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Tarjeta
from Clientes.models import Cliente
from .serializers import TarjetasSerializer
from rest_framework.authentication import BasicAuthentication
import random

# Create your views here.

class TarjetasCliente(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        tarjetas = Tarjeta.objects.filter(customer_id=request.user.userprofile.customer_id)
        serializer = TarjetasSerializer(tarjetas, many=True)
        return Response(serializer.data)
        
    def post(self, request):
        serializer = TarjetasSerializer(data=request.data)
        if serializer.is_valid():
            customer = Cliente.objects.get(customer_id=request.user.userprofile.customer_id)
            numero = random.randint(1000000000000000, 9999999999999999)
            marca = serializer.validated_data.get('marca')
            tipo = serializer.validated_data.get('tipo')
            fechaOtorgamiento = datetime.now().date().strftime('%Y-%m-%d')
            fechaVencimiento = (datetime.now().date() + timedelta(days=1200)).strftime('%Y-%m-%d')
            cvv = random.randint(100, 999)
            Tarjeta.objects.create(customer_id=customer, numero=numero, tipo=tipo, marca=marca, fechaotorgamiento=fechaOtorgamiento, fechaexpiracion=fechaVencimiento, cvv=cvv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TarjetasClienteEmpleado(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
            
    def get(self, request, customer_id):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        tarjetas = Tarjeta.objects.filter(customer_id=customer_id)
        serializer = TarjetasSerializer(tarjetas, many=True)
        return Response(serializer.data)
