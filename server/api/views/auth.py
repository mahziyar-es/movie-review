from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.decorators import action, api_view
from core import models, serializers, utils
from rest_framework_simplejwt.tokens import RefreshToken



@api_view(['POST'])
def signup(req):

    data = {}
    data['email'] = req.data.get('email')
    data['password'] = req.data.get('password')

    serializer = serializers.UserSerializer(data = data)

    if not serializer.is_valid():
        raise ParseError(serializer.errors)

    serializer.save()

    user = models.User.objects.get(id= serializer.data['id'])

    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })
        


        