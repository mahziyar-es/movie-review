from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .. import models
from django.conf import settings
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):

    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    class Meta:
        model = models.User
        fields = '__all__'

    

    