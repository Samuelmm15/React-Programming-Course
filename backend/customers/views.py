from customers.models import Customer
from django.http import JsonResponse, Http404
from customers.serializers import CustomerSerializer

def customers(request):
  #invoke serealizer and return to client
  data = Customer.objects.all()
  serializer = CustomerSerializer(data, many=True)
  return JsonResponse({'customers': serializer.data})

def customer(request, id):
  # Para poder obtener un error del tipo 404 procedente del backend de la aplicación, es necesario
  # generar este tipo de error y lanzarlo, porque si no lo hacemos se van a lanzar errores del tipo 500 y no el que estamos buscando en concreto.
  try:
    data = Customer.objects.get(pk=id)
  except Customer.DoesNotExist:
    raise Http404("Customer does not exist")
  # TENER EN CUENTA ESTAS CARACTERÍSTICAS ANTERIORES PARA PODER REALIZAR ESTO DE MANERA CORRECTA
  serializer = CustomerSerializer(data)
  return JsonResponse({'customer': serializer.data})