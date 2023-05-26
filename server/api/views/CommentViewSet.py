from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from core import models, serializers, utils
from rest_framework.permissions import IsAuthenticated, AllowAny


class CommentViewSet(viewsets.ModelViewSet):


    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated]
        else:
            return []


    def list(self, req):
        review = req.query_params.get('review')

        items = models.Comment.objects.custom_filter(review = review)

        serializer = serializers.CommentSerializer(items, many=True)

        return Response({
            'items': serializer.data,
        })
        


    def create(self, req):

        data = req.data.dict()
        data['user'] = req.user.id

        serializer = serializers.CommentSerializer(data = data)

        if not serializer.is_valid(raise_exception=True):
            raise ParseError(serializer.errors)

        serializer.save()

        return Response({
            'item': serializer.data,
        })
        


        