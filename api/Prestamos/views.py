from datetime import datetime
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from Clientes.models import Cliente
from Prestamos.serializers import PrestamoSerializer
from .models import Prestamo

class PrestamosCliente(APIView):

    def get(self, request):
        prestamos = Prestamo.objects.filter(customer_id=request.user.userprofile.customer_id)
        data = []        
        for prestamo in prestamos:
            serializer = PrestamoSerializer(prestamo)
            data.append(serializer.data)
        return Response(data)
    
    def post(self, request):        
        serializer = PrestamoSerializer(data=request.data)

        cliente = Cliente.objects.get(customer_id=request.user.userprofile.customer_id)
        customer_type = cliente.customer_type

        if customer_type == 'BLACK':
            preapproval_amount = 500000.00
        elif customer_type == 'GOLD':
            preapproval_amount = 300000.00
        else:  # CLASSIC
            preapproval_amount = 100000.00
        
        if serializer.is_valid():

            if serializer.validated_data.get('loan_total') > preapproval_amount:
                return Response({'error': 'Solicitud rechazada: El monto del préstamo excede el monto de preaprobación.'}, status=status.HTTP_400_BAD_REQUEST)
            
            customer_id = Cliente.objects.get(customer_id=request.user.userprofile.customer_id)
            loan_type = serializer.validated_data.get('loan_type')
            loan_date = datetime.now().date().strftime('%Y-%m-%d')
            loan_total = serializer.validated_data.get('loan_total')
            
            Prestamo.objects.create(customer_id=customer_id, loan_type=loan_type, loan_date=loan_date, loan_total=loan_total)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


