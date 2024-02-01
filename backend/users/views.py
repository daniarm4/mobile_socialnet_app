from uuid import uuid4

from django.urls import reverse_lazy
from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.core.cache import cache

from permissions import IsOwnerOrIsAdmin
from users.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    FriendRequestSerializer,
    FriendRequestCreateSerializer,
    AcceptFriendSerializer
)
from users.pagination import UserPagination
from users.tasks import send_mail_task
from users.models import FriendRequest

User = get_user_model()


class UserViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['username']
    pagination_class = UserPagination
    parser_classes = [MultiPartParser, JSONParser]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        return User.objects.filter(is_active=True).prefetch_related(
            Prefetch('friends', queryset=User.objects.only('id'))
        )
    
    def perform_create(self, serializer):
        instance = serializer.save()
        token = uuid4().hex 
        cache.set(token, {'user_pk': instance.pk}, timeout=180)
        confirm_link = self.request.build_absolute_uri(
            reverse_lazy('users:confirm-register', kwargs={'token': token})
        )
        send_mail_task.delay(
            'Register confirm',
            f'Link: {confirm_link}',
            [instance.email],
        )
    
    @action(detail=False, methods=['get'])
    def confirm_register(self, request, token):
        token = self.kwargs.get('token')
        is_token_expired = not cache.ttl(token)
        if is_token_expired:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='Token expired')

        user_data = cache.get(token)
        user_pk = user_data.get('user_pk')
        user = User.objects.get(pk=user_pk)
        user.is_active = True 
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False)
    def get_me(self, request):
        user_serializer = self.get_serializer(request.user).data
        return Response(user_serializer, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        if self.action in ('update', 'partial_update'):
            return UserUpdateSerializer
        return UserSerializer

    def get_permissions(self):
        permissions = []
        if self.action in ('retrieve', 'update', 'destroy', 'partial_update'):
            permissions = [IsOwnerOrIsAdmin]
        if self.action in ('list', 'get_me'):
            permissions = [IsAuthenticated]
        return [permission() for permission in permissions]


class FriendRequestListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(receiver=user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FriendRequestCreateSerializer
        return FriendRequestSerializer


class AcceptFriendRequestView(APIView): 
    permission_classes = [IsAuthenticated]
    serializer_class = AcceptFriendSerializer

    def post(self, request):
        receiver = request.user
        friend_request = get_object_or_404(FriendRequest, pk=request.data['friend_request_id'])
        receiver.accept_friend_request(friend_request)
        return Response(status=200)
