from .models import Movimientos
from rest_framework import serializers

class MovimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimientos
        fields = '__all__'

