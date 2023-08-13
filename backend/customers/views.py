from customers.models import Customer
from django.http import JsonResponse, Http404
from customers.serializers import CustomerSerializer
from rest_framework.decorators import api_view, permission_classes
# Esto sirve para poder administrar todas las distintas respuestas que se pueden dar a un cliente.
from rest_framework.response import Response
# Esto sirve para poder administrar los distintos estados que puede tener una respuesta.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def customers(request):
  # En este punto realizamos la obtención de la lista total de clientes que se encuentran en la base de datos
  if request.method == 'GET':
    data = Customer.objects.all()
    serializer = CustomerSerializer(data, many=True)
    return Response({'customers': serializer.data}, status=status.HTTP_200_OK)
    # En este punto se realiza la creación de un nuevo cliente en la base de datos.
  elif request.method == 'POST':
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      # HAY QUE TENER EN CUENTA QUE CADA VEZ QUE SE PONE EL SERIALIZER.DATA, LO QUE PONEMOS DELANTE ES UNA KEY QUE SE USA PARA EL DICCIONARIO DE LA BASE DE DATOS
      return Response({'customers': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Para poder entender que es @, esto en python se conoce como decorador, y es una función que recibe como parámetro otra función.
# y sirve para poder agregar funcionalidades a una función, en este caso, se le agrega la funcionalidad de poder recibir
# los métodos GET, POST y DELETE.
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def customer(request, id):
  try:
    data = Customer.objects.get(pk=id)
  except Customer.DoesNotExist:
    # Cabe desatacar que al hacer uso del método `Response` se produce una mejor interfaz de usuario en la administración y en el cliente, permitiendo establecer que este método es mejor que el anteriormente usado.
    return Response(status=status.HTTP_404_NOT_FOUND)

  # Para este punto se va a realizar la implementación de todos los métodos especificados anteriormente
  if request.method == 'GET':
    serializer = CustomerSerializer(data)
    # Hay que tener en cuenta que el método `Response` permite establecer varias opciones en vez de usar el método `JsonResponse`
    return Response({'customer': serializer.data}, status=status.HTTP_200_OK)
  elif request.method == 'DELETE':
    # Este método sirve para eliminar el dato que ha sido obtenido mediante el GET realizado anteriormente.
    data.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  elif request.method == 'POST':
    # Este método u operación sirve para actualizar los datos de un cliente en particular.
    serializer = CustomerSerializer(data, data=request.data)
    # En este punto debemos de comprobar si los datos actualizados son válidos.
    if serializer.is_valid():
        serializer.save()
        return Response({'customer': serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def register():
#   pass