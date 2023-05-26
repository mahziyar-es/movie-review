from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from core import models, serializers, utils
from rest_framework.permissions import IsAdminUser


class CommentViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAdminUser]


    def list(self, req):
        items = models.Comment.objects.all()

        items_serializer = serializers.CommentSerializer(items, many=True)
        
        return Response({
            'items': items_serializer.data,
        })
        

    

    def retrieve(self, req, pk=None):
        item = models.Comment.objects.get_one_or_fail(id = pk)

        item_serializer = serializers.CommentSerializer(item)
        
        return Response({
            'item': item_serializer.data,
        })


    
    def destroy(self, req, pk = None):
        item = models.Comment.objects.get_one_or_fail(id = pk)

        item.delete()

        return Response({
            'message': 'Deleted',
        })

        


        