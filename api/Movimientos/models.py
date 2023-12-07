from django.db import models
from Cuentas.models import Cuenta

# Create your models here.

class Movimientos(models.Model):
    numero_cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE, db_column='numero_cuenta', null=True)
    monto = models.FloatField(blank=True, null=True)
    tipo_operacion = models.TextField(blank=True, null=True)
    hora = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'movimientos'