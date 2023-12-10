from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView, 
    TokenBlacklistView
)

app_name = 'users'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='tokens'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='blacklist')
]
