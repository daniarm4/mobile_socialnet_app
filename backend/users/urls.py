from django.urls import path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView
)

from users.views import (
    UserViewSet,
    FriendRequestListCreateView,
    AcceptFriendRequestView
)

app_name = 'users'

user_list_create = UserViewSet.as_view({
    'get': 'list', 
    'post': 'create'
})

user_detail = UserViewSet.as_view({
    'get': 'retrieve', 
    'put': 'update', 
    'patch': 'partial_update',
    'delete': 'destroy'
})

get_me = UserViewSet.as_view({
    'get': 'get_me',
})

confirm_register = UserViewSet.as_view({
    'get': 'confirm_register',
})

get_friends = UserViewSet.as_view({
    'get': 'get_friends'
})

urlpatterns = [
    path('', user_list_create, name='list-create'),
    path('<int:pk>/', user_detail, name='detail'),
    path('me/', get_me, name='me'),
    path('confirm/<slug:token>/', confirm_register, name='confirm-register'),
    path('get_friends/', get_friends, name='get-friends'),
    path('friend_requests/', FriendRequestListCreateView.as_view(), name='friend-requests'),
    path('friend_requests/accept/', AcceptFriendRequestView.as_view(), name='friend-request-accept'),
    path('token/', TokenObtainPairView.as_view(), name='tokens'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='blacklist'),
]
