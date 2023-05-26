from rest_framework import serializers
from django.conf import settings
from core import models


class IndexReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = ('id', 'title', 'seo_title', 'thumbnail', 'background_image')

    def to_representation(self, instance):
        rep =  super().to_representation(instance)

        rep['thumbnail'] = settings.BASE_URL + rep['thumbnail']
        rep['background_image'] = settings.BASE_URL + rep['background_image']
        
        return rep
