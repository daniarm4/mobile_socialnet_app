from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter

from users.views import UserViewSet

router = SimpleRouter()
router.register(r'api/users', UserViewSet, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]

urlpatterns += router.urls 
