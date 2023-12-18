from django.urls import path
from users.views import (
    DecoratedTokenBlacklistView, 
    DecoratedTokenObtainPairView, 
    DecoratedTokenRefreshView,
    UserViewSet
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

urlpatterns = [
    path('', user_list_create, name='list-create'),
    path('<int:pk>/', user_detail, name='detail'),
    path('me/', get_me, name='me'),
    path('confirm/<slug:token>/', confirm_register, name='confirm-register'),
    path('token/', DecoratedTokenObtainPairView.as_view(), name='tokens'),
    path('token/refresh/', DecoratedTokenRefreshView.as_view(), name='refresh'),
    path('token/blacklist/', DecoratedTokenBlacklistView.as_view(), name='blacklist'),
]
