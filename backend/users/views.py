from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.utils import swagger_auto_schema
from django_filters.rest_framework import DjangoFilterBackend

from users.permissions import IsOwnerOrIsAdmin
from users.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    TokenBlacklistResponseSerializer, 
    TokenObtainPairResponseSerializer, 
    TokenRefreshResponseSerializer
)

User = get_user_model()


class UserViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['location', 'birth_date']
    search_fields = ['username']
    parser_classes = [MultiPartParser, JSONParser]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        return User.objects.prefetch_related(
            Prefetch('friends', queryset=User.objects.only('id'))
        )
    
    @action(detail=False)
    def get_me(self, request):
        user_serializer = self.get_serializer(request.user).data
        return Response(user_serializer, status=status.HTTP_200_OK)

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            return UserCreateSerializer(*args, **kwargs)
        if self.action in ('update', 'partial_update'):
            return UserUpdateSerializer(*args, **kwargs)
        return UserSerializer(*args, context={'request': self.request}, **kwargs)

    def get_permissions(self):
        permissions = []
        if self.action in ('retrieve', 'update', 'destroy', 'partial_update'):
            permissions = [IsOwnerOrIsAdmin]
        if self.action in ('list', 'get_me'):
            permissions = [IsAuthenticated]
        return [permission() for permission in permissions]


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)