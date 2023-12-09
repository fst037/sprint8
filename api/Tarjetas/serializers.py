from rest_framework import serializers
from .models import Tarjeta
from Clientes.models import Cliente

class TarjetasSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer_id.customer_name', required=False)
    customer_surname = serializers.CharField(source='customer_id.customer_surname', required=False)    
    customer_id = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all(), required=False)
    numero = serializers.IntegerField(required=False)
    fechaotorgamiento = serializers.DateField(required=False)
    fechaexpiracion = serializers.DateField(required=False)
    cvv = serializers.IntegerField(required=False)

    class Meta:
        model = Tarjeta
        fields = '__all__'