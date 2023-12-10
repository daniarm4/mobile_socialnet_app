from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from users.permissions import IsOwnerOrIsAdmin
from users.serializers import UserSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.prefetch_related('friends').all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['location', 'birth_date']
    search_fields = ['username']

    def get_permissions(self):
        permissions = []
        if self.action in ('retrieve', 'update', 'destroy', 'partial_update'):
            permissions = [IsOwnerOrIsAdmin]
        if self.action == 'list':
            permissions = [IsAdminUser]
        return [permission() for permission in permissions]
