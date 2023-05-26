from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from core import models, serializers, utils
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination


class ReviewViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAdminUser]
    serializer_class = serializers.ReviewSerializer


    def list(self, req):
        items = models.Review.objects.count_pagination(req)

        items_serializer = serializers.ReviewSerializer(items, many=True)
        
        return Response({
            'items': items_serializer.data,
        })
        

    

    def retrieve(self, req, pk=None):
        item = models.Review.objects.get_one_or_fail(id = pk)

        item_serializer = serializers.ReviewSerializer(item)
        
        return Response({
            'item': item_serializer.data,
        })


    
    def create(self, req):
        data = req.data 

        if data['title']:
            title_parts = data['title'].split(' ')
            data['seo_title'] = '-'.join(title_parts)

        item_serializer = serializers.ReviewSerializer(data=data)

        if item_serializer.is_valid():
            item_serializer.save()
            return Response({
                'item': item_serializer.data,
                'message': 'Review saved',
            })

        raise ParseError(item_serializer.errors)
        


    
    def update(self, req, pk = None):
        item = models.Review.objects.get_one_or_fail(id=pk)

        data = req.data 

        item_serializer = serializers.ReviewSerializer(instance=item, data=data, partial=True)

        if item_serializer.is_valid(raise_exception=True):
            item_serializer.save()
            return Response({
                'item': item_serializer.data,
                'message': 'Review saved',
            })
        
        raise ParseError(item_serializer.errors)
        


    
    def destroy(self, req, pk = None):
        item = models.Review.objects.get_one_or_fail(id = pk)

        utils.delete_file(item.thumbnail)
        utils.delete_file(item.background_image)
        
        item.delete()

        return Response({
            'message': 'Deleted',
        })

        


        