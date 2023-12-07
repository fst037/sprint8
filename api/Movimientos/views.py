from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movimientos
from .serializers import MovimientosSerializer
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from Cuentas.models import Cuenta

# Create your views here.

class MovimientosCuenta(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, cuenta):
        cuentas = Cuenta.objects.filter(customer_id=request.user.userprofile.customer_id)
        
        if not cuentas.filter(account_id=cuenta).exists():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        movimientos = Movimientos.objects.filter(numero_cuenta=cuenta)
        serializer = MovimientosSerializer(movimientos, many=True)
        
        return Response(serializer.data)
    
        