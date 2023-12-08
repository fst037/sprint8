from rest_framework import serializers

from Clientes.models import Cliente
from .models import Prestamo 

class PrestamoSerializer(serializers.ModelSerializer):    
    loan_date = serializers.DateField(required=False)
    customer_id = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all(), required=False)

    class Meta:
        model = Prestamo
        fields = '__all__'