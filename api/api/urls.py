"""
URL configuration for homebanking project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from Clientes.views import DatosCliente
from Prestamos.views import PrestamosCliente
from Cuentas.views import CuentasCliente
from Login.views import LoginView, LogoutView, RegisterView, HomeView,  LoginAPIView, RegisterAPIView
from Cuentas.views import CuentaCliente, CuentasCliente
from Login.views import LoginView, LogoutView, RegisterView, HomeView,  LoginAPIView
from Clientes.views import DatosCliente
from Negocio.views import ListarSucursales
from Movimientos.views import MovimientosCuenta
from Tarjetas.views import TarjetasClienteAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', HomeView.as_view(), name='home'),
    path('register/', RegisterView.as_view(),name='register'),
    path('login/', LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(),name='logout'),

    path('api-auth/', LoginAPIView.as_view(), name='api-login'),
    path('api-auth/register/', RegisterAPIView.as_view(), name='api-register'),
    path('api/datos/', DatosCliente.as_view(), name='datos_cliente'),
    path('api/cuentas/', CuentasCliente.as_view(), name='cuentas_cliente'),
    path('api/cuentas/<int:cuenta>/', CuentaCliente.as_view(), name='cuenta_cliente'),
    path('api/cuentas/<int:cuenta>/movimientos/', MovimientosCuenta.as_view(), name='movimientos_cuenta'),
    path('api/prestamos/', PrestamosCliente.as_view(), name='prestamos_cliente'),
    path('api/sucursales/', ListarSucursales.as_view(), name='listar_sucursales'),
    path('api/tarjetas/<int:customer_id>/', TarjetasClienteAPI.as_view(), name='tarjetas_cliente'),
]
