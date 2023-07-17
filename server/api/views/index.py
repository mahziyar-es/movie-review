from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.decorators import action, api_view
from core import models, serializers, utils
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from ..serializers import IndexReviewSerializer


@api_view(['GET'])
def index(req):

    # yesterday = datetime.now() - timedelta(1)

    new_reviews = models.Review.objects.order_by('-id')[0:5]

    review_serializer = IndexReviewSerializer(new_reviews, many=True)

    return Response({
        'new_reviews': review_serializer.data,
    })
        





@api_view(['GET'])
def sitemap(req):
    reviews = models.Review.objects.all().values('id','seo_title')
    return Response({
        'reviews': reviews,
    })
        




