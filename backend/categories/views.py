from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Prefetch
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from posts.models import Post, PostImages
from categories.serializers import CategorySerializer
from categories.models import Category


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    parser_classes = [MultiPartParser, JSONParser]

    # @swagger_auto_schema(
    #     manual_parameters=[
    #         openapi.Parameter(
    #             'category_id',
    #             openapi.IN_QUERY,
    #             description='Category id',
    #             type=openapi.TYPE_STRING
    #         ),
    #         openapi.Parameter(
    #             'limit',
    #             openapi.IN_QUERY,
    #             description='Posts count',
    #             type=openapi.TYPE_INTEGER
    #         )
    #     ]
    # )
    # @action(methods=['get'], detail=False)
    # def most_popular_posts(self, request):
    #     category_id = request.query_params.get('category_id')
    #     limit = int(request.query_params.get('limit'))
    #     posts = (
    #         Post.objects
    #             .filter(categories__id=category_id)
    #             .prefetch_related(
    #                 Prefetch('images', queryset=PostImages.objects.only('image', 'created_at')),
    #             )
    #             .annotate(total_likes=Count('likes', distinct=True))
    #             .order_by('-total_likes')[:limit]
    #     )
    #     return Response(status=200, data={'posts': 'yes'})

    def get_permissions(self):
        permissions = []
        if self.action in ('update', 'update_partial', 'create', 'destroy'):
            permissions = [IsAdminUser]
        return [permission() for permission in permissions]
