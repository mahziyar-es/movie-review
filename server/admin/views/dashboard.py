from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.decorators import api_view, permission_classes
from core import models, serializers, utils
from rest_framework.permissions import IsAdminUser



@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard(req):
    reviews_count = models.Review.objects.count()

    return Response({
        'reviews_count': reviews_count
    })