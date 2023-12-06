from rest_framework import serializers
from .models import Cuenta

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class SolicitudCuentaSerializer(serializers.Serializer):
    tipo = serializers.CharField(max_length=20)
    
    def validate_tipo(self, value):
        if value not in ['CCDolares', 'CCPesos', 'CADolares', 'CAPesos', 'CuentaInversion' ]:
            raise serializers.ValidationError("El tipo de cuenta no es correcto")
        return value