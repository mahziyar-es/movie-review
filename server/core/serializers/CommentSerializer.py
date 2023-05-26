from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .. import models
from django.conf import settings


class CommentUserSerializer():
    class Meta:
        model = models.User
        fields = ('username')



class CommentSerializer(serializers.ModelSerializer):


    def create(self, validated_data):
        return super().create(validated_data)


    user = CommentUserSerializer()
    
    class Meta:
        model = models.Comment
        fields = '__all__'

    

    