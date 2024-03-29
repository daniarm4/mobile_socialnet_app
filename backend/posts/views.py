from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, CreateAPIView
from django.db.models import Prefetch, Count, OuterRef, Exists
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema

from permissions import IsOwnerOrIsAdmin
from posts.models import Post, Like, PostImages, Comments
from posts.serializers import PostSerializer, PostCreateUpdateSerializer, CommentSerializer, CommentCreateSerializer, PostLikeSerializer
from posts.pagination import PostPagination
from posts.service import like_post
from categories.models import Category


class PostViewSet(ModelViewSet):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    pagination_class = PostPagination

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
                    total_comments=Count('comments'),
                    is_liked=is_liked_annotation
                )
                .order_by(
                    '-created_at'
                )
                .only(
                    'id',
                    'text',
                    'title',
                    'created_at',
                    'owner_id',
                    'owner__username'
                )
        )

    @extend_schema(
        request=PostLikeSerializer,
        responses={201: None, 204: None},
        description='Like post via id'
    )
    @action(detail=False, methods=['post'])
    def like(self, request):
        post_id = request.data.get('post_id')
        is_liked = like_post(post_id=post_id, user=request.user)
        return Response(status=200, data={'is_liked': is_liked})

    def get_serializer_class(self):
        if self.action in ('update', 'create', 'partial_update'):
            return PostCreateUpdateSerializer
        return PostSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ('retrieve', 'update', 'partial_update', 'destroy'):
            permissions = [IsOwnerOrIsAdmin]
        return [permission() for permission in permissions]


class CommentsListAPIView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        comments = (
            Comments.objects
                .filter(post=post_id)
                .select_related('owner')
                .order_by('-created_at')
                .only('owner__username', 'text', 'image', 'created_at', 'parent')
        )
        return comments


class CommentsCreateAPIView(CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentCreateSerializer
    parser_classes = [MultiPartParser]
