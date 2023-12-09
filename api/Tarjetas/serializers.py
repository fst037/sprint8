from rest_framework import serializers
from .models import Tarjeta
from Clientes.models import Cliente

class TarjetasSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer_id.customer_name')
    customer_surname = serializers.CharField(source='customer_id.customer_surname')    
    class Meta:
        model = Tarjeta
        fields = '__all__'