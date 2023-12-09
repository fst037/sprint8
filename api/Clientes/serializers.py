from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        extra_kwargs = {
            'customer_id': {'required': False},
            'customer_name': {'required': False},
            'customer_surname': {'required': False},
            'customer_dni': {'required': False},
            'dob': {'required': False},
            'customer_type': {'required': False},
        }