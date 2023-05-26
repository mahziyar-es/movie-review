from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from core import models, serializers, utils
from rest_framework.permissions import IsAdminUser


class UserViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAdminUser]


    def list(self, req):
        items = models.User.objects.all()

        items_serializer = serializers.UserSerializer(items, many=True)
        
        return Response({
            'items': items_serializer.data,
        })
        

    

    def retrieve(self, req, pk=None):
        item = models.User.objects.get_one_or_fail(id = pk)

        item_serializer = serializers.UserSerializer(item)
        
        return Response({
            'item': item_serializer.data,
        })


        