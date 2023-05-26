from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .. import models
from django.conf import settings
from core import utils


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = '__all__'

    def to_representation(self, instance):
        rep =  super().to_representation(instance)

        rep['thumbnail'] = settings.BASE_URL + rep['thumbnail']
        rep['background_image'] = settings.BASE_URL + rep['background_image']
        
        return rep


   
    def update(self, instance, validated_data):
        if validated_data.get('thumbnail'):
            utils.delete_file(instance.thumbnail)
            
        if validated_data.get('background_image'):
            utils.delete_file(instance.background_image)

        return super().update(instance, validated_data)