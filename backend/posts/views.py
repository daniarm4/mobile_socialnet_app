from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Prefetch, Count, OuterRef, Exists
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema

from permissions import IsOwnerOrIsAdmin
from posts.models import Post, Like, PostImages
from posts.serializers import PostSerializer, PostCreateUpdateSerializer, PostLikeSerializer
from categories.models import Category


class PostViewSet(ModelViewSet):
    def get_queryset(self):
        is_liked_annotation = Exists(Like.objects.filter(
            post=OuterRef('pk'),
            user=self.request.user
        ))

        return (
            Post.objects
                .select_related('owner')
                .prefetch_related(
                    Prefetch('categories', queryset=Category.objects.only('title')),
                    Prefetch('images', queryset=PostImages.objects.only('image', 'created_at'))
                )
                .annotate(
                    total_likes=Count('likes'),
                    is_liked=is_liked_annotation
                )
                .only(
                    'text',
                    'title',
                    'created_at',
                    'owner_id',
                    'owner__username',
                )
        )

    @swagger_auto_schema('post', request_body=PostLikeSerializer)
    @action(detail=False, methods=['post'])
    def like(self, request):
        post = get_object_or_404(Post, pk=request.data['post_id'])
        like, like_created = Like.objects.get_or_create(user=request.user, post=post)
        if not like_created:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in ('update', 'create', 'partial_update'):
            return PostCreateUpdateSerializer
        return PostSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ('retrieve', 'update', 'partial_update', 'destroy'):
            permissions = [IsOwnerOrIsAdmin]
        return [permission() for permission in permissions]

