from customers.models import Customer
from django.http import JsonResponse
from customers.serealizer import CustomersSerializer

def customers(request):
  #invoke serealizer and return to client
  data = Customer.objects.all()
  serializer = CustomersSerializer(data, many=True)
  return JsonResponse({'customers': serializer.data})