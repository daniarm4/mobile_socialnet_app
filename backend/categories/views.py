from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, JSONParser

from categories.serializers import CategorySerializer
from categories.models import Category


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    parser_classes = [MultiPartParser, JSONParser]

    def get_permissions(self):
        permissions = []
        if self.action in ('update', 'update_partial', 'create', 'destroy'):
            permissions = [IsAdminUser]
        return [permission() for permission in permissions]
