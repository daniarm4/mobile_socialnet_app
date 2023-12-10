from rest_framework.permissions import BasePermission


class IsOwnerOrIsAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user or obj.user.is_superuser
