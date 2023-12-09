from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Tarjeta
from .serializers import TarjetasSerializer
from rest_framework.authentication import BasicAuthentication

# Create your views here.

class TarjetasClienteAPI(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
            
    def get(self, request, customer_id):
        tarjetas = Tarjeta.objects.filter(customer_id=customer_id)
        serializer = TarjetasSerializer(tarjetas, many=True)
        return Response(serializer.data)
