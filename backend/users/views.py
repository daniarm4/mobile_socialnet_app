from django.contrib.auth import get_user_model
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
from drf_spectacular.utils import extend_schema

from permissions import IsOwnerOrIsAdmin
from users.serializers import (
    UserLightSerializer,
    UserDetailSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    FriendRequestSerializer,
)
from users.services import (
    get_user_friend_requests, 
    accept_friend_request, 
    send_friend_request, 
    create_new_user, 
    send_confirm_link, 
    confirm_register_account,
    get_users_with_annotate_is_current_user_friend
)
from users.pagination import UserPagination

User = get_user_model()


@extend_schema(tags=['Users'])
class UserViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['username']
    pagination_class = UserPagination
    parser_classes = [MultiPartParser, JSONParser]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        queryset = User.objects.filter(is_active=True) 

        if self.action == 'list':
            queryset = get_users_with_annotate_is_current_user_friend(user=self.request.user)
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        if self.action in ('update', 'partial_update'):
            return UserUpdateSerializer
        if self.action in ('get_friends', 'list'):
            return UserLightSerializer
        return UserDetailSerializer

    def get_permissions(self):
        permissions = []
        if self.action in ('retrieve', 'update', 'destroy', 'partial_update'):
            permissions = [IsOwnerOrIsAdmin]
        if self.action in ('list', 'get_me'):
            permissions = [IsAuthenticated]
        return [permission() for permission in permissions]

    def perform_create(self, serializer):
        user = create_new_user(user_data=serializer.validated_data)        
        send_confirm_link(request=self.request, user=user)

    @action(detail=False, methods=['get'])
    def confirm_register(self, request, token):
        token = self.kwargs.get('token')
        is_token_expired = not cache.ttl(token)
        if is_token_expired:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='Token expired')

        confirm_register_account(token)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False)
    def get_me(self, request):
        serializer_data = self.get_serializer(request.user).data
        return Response(serializer_data, status=status.HTTP_200_OK)

    @action(detail=False)
    def get_friends(self, request):
        friends = request.user.friends.all()
        serializer_data = self.get_serializer(friends, many=True).data
        return Response(serializer_data, status=200)
 

@extend_schema(tags=['Friend requests'])
class FriendRequestListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer

    def post(self, request, *args, **kwargs):
        data = {'sender': request.user.pk, 'receiver': request.data['receiver']}
        serializer = FriendRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)   
        sender, receiver = serializer.validated_data.values()
        send_friend_request(sender, receiver)
        return Response(status=200)

    def get_queryset(self):
        return get_user_friend_requests(self.request.user)


@extend_schema(tags=['Friend requests'])
class AcceptFriendRequestView(APIView): 
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer    

    def post(self, request):
        friend_request_id = request.data['id']
        accept_friend_request(friend_request_id)
        return Response(status=200)
