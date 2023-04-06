from customers.models import Customer
from django.http import JsonResponse
from customers.serializers import CustomerSerializer

def customers(request):
  #invoke serealizer and return to client
  data = Customer.objects.all()
  serializer = CustomerSerializer(data, many=True)
  return JsonResponse({'customers': serializer.data})

# Esta es la nueva función que ha sido añadida en este episodio, para poder obtener los detalles de un cliente en particular
def customer(request, id):
  #invoke serealizer and return to client
  data = Customer.objects.get(pk=id)
  serializer = CustomerSerializer(data)
  return JsonResponse({'customer': serializer.data})