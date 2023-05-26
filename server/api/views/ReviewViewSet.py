from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core import models, serializers
from ..serializers import IndexReviewSerializer
from django.db.models import Q

class ReviewViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.ReviewSerializer

    def list(self, req):
        search_query = req.query_params.get('query', '')

        items = models.Review.objects.filter( Q(title__contains=search_query) | Q(tags__contains=search_query)  ).count_pagination(req)

        items_serializer = IndexReviewSerializer(items, many=True)
        
        return Response({
            'items': items_serializer.data,
        })
        

    
    def retrieve(self, req, pk=None):
        item = models.Review.objects.get_one_or_fail(id = pk)

        item_serializer = serializers.ReviewSerializer(item)
        
        return Response({
            'item': item_serializer.data,
        })
