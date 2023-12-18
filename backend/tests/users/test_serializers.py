from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ErrorDetail

from users.serializers import UserSerializer, UserCreateSerializer, UserUpdateSerializer
from tests.utils import get_image

User = get_user_model()


class UserSerializersTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='user',
            password='12345678',
            phonenumber='+17538231242',
            location='UK'
        )

    def test_user_serializer(self):
        serializer_data = UserSerializer(self.user).data
        expected_data = {
            'username': 'user',
            'avatar': '/media/avatars/default.png',
            'phonenumber': '+17538231242',
            'email': '',
            'location': 'UK',
            'birth_date': None,
            'friends': []
        }
        self.assertEqual(expected_data, serializer_data)

    def test_create_user_serializer(self):
        user_data = {
            'username': 'test_user',
            'phonenumber': '+79562731243',
            'email': 'test_user@example.com',
            'password1': 'Test12345678', 
            'password2': 'Test12345678'
        }
        serializer_user = UserCreateSerializer(data=user_data)
        serializer_user.is_valid()
        created_user = serializer_user.save()
        expected_user = User.objects.get(username='test_user')
        self.assertEqual(expected_user, created_user)

    def test_create_user_serializer_with_wrong_password(self):
        user_data = {
            'username': 'test_user',
            'phonenumber': '+79562731243',
            'email': 'test_user@example.com',
            'password1': 'Test12345678', 
            'password2': 'Test1234567'
        }
        serializer_user = UserCreateSerializer(data=user_data)
        serializer_user.is_valid()
        expected_errors = {
            'password1': [ErrorDetail(string='Passwords do not match', code='invalid')]
        }
        self.assertEqual(expected_errors, serializer_user.errors)

    def test_partial_update_user_serializer(self):
        avatar = get_image(1)
        location = 'Germany'
        new_data = {
            'location': location,
            'avatar': avatar,
        }
        serializer_user = UserUpdateSerializer(self.user, data=new_data, partial=True)        
        serializer_user.is_valid()
        updated_user = serializer_user.save()
        self.assertIn(avatar.name, updated_user.avatar.url)
        self.assertEqual(location, updated_user.location)

    def test_update_user_serializer(self):
        avatar = get_image(2)
        location = 'Germany'
        new_data = {
            'location': location,
            'avatar': avatar,
            'birth_date': '2002-11-11'
        }
        serializer_user = UserUpdateSerializer(self.user, data=new_data)    
        serializer_user.is_valid()
        updated_user = serializer_user.save()
        self.assertIn(avatar.name, updated_user.avatar.url)
        self.assertEqual(location, updated_user.location)
