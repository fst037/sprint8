from datetime import datetime
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from Clientes.models import Cliente
from Cuentas.models import Cuenta
from Movimientos.models import Movimientos
from Prestamos.serializers import PrestamoSerializer
from .models import Prestamo

class PrestamosCliente(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prestamos = Prestamo.objects.filter(customer_id=request.user.userprofile.customer_id)
        data = []        
        for prestamo in prestamos:
            serializer = PrestamoSerializer(prestamo)
            data.append(serializer.data)
        return Response(data)


class PrestamosClienteEmpleado(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, customer_id):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        prestamos = Prestamo.objects.filter(customer_id=customer_id)
        data = []        
        for prestamo in prestamos:
            serializer = PrestamoSerializer(prestamo)
            data.append(serializer.data)
        return Response(data)

    def post(self, request, customer_id):

        if not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        serializer = PrestamoSerializer(data=request.data)

        cliente = Cliente.objects.get(customer_id=customer_id)
        customer_type = cliente.customer_type

        #esta en centavos de peso, porque asi esta en la base de datos de CUENTAS segun la consigna
        if customer_type == 'BLACK':
            preapproval_amount = 50000000
        elif customer_type == 'GOLD':
            preapproval_amount = 30000000
        else:  # CLASSIC
            preapproval_amount = 10000000
        
        cuentas = Cuenta.objects.filter(customer_id=cliente, tipo='CAPesos')

        if serializer.is_valid():

            if serializer.validated_data.get('loan_total') > preapproval_amount:
                return Response({'error': 'Solicitud rechazada: El monto del préstamo excede el monto de preaprobación.'}, status=status.HTTP_400_BAD_REQUEST)
            
            if len(cuentas) == 0:
                return Response({'error': 'Solicitud rechazada: El cliente no tiene cuentas.'}, status=status.HTTP_400_BAD_REQUEST)

            customer_id = cliente
            loan_type = serializer.validated_data.get('loan_type')
            loan_date = datetime.now().date().strftime('%Y-%m-%d')
            loan_total = serializer.validated_data.get('loan_total')
            
            Prestamo.objects.create(customer_id=customer_id, loan_type=loan_type, loan_date=loan_date, loan_total=loan_total)
            cuentas[0].balance += loan_total
            cuentas[0].save()
            Movimientos.objects.create(numero_cuenta=cuentas[0], tipo_operacion='AUTORIZACION PRESTAMO', hora=loan_date, monto=loan_total)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, loan_id):

        if not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        prestamo = Prestamo.objects.get(loan_id=loan_id)

        cuentas = Cuenta.objects.filter(customer_id=prestamo.customer_id, tipo='CAPesos')

        if len(cuentas) == 0:
            return Response({'error': 'Solicitud rechazada: El cliente no tiene cuentas CAPesos.'}, status=status.HTTP_400_BAD_REQUEST)

        print(cuentas[0].balance)
        print(prestamo.loan_total)
        
        cuentas[0].balance = cuentas[0].balance - prestamo.loan_total
        cuentas[0].save()

        print(cuentas[0].balance)
        Movimientos.objects.create(numero_cuenta=cuentas[0], tipo_operacion='ANULACION PRESTAMO', hora=datetime.now().date().strftime('%Y-%m-%d %H:%M:%S'), monto=-prestamo.loan_total)
        prestamo.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class PrestamosSucursal(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, branch_id):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        clientes = Cliente.objects.filter(branch_id=branch_id)
        data = []   
        prestamos = Prestamo.objects.filter(customer_id__in=clientes)     
        for prestamo in prestamos:
            serializer = PrestamoSerializer(prestamo)
            data.append(serializer.data)
        return Response(data)
    
