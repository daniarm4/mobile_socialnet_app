from django.test import TestCase
from django.contrib.auth import get_user_model

from users.serializers import UserSerializer

User = get_user_model()


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='user',
            password='12345678',
            phonenumber='+17538231242',
            location='UK'
        )

    def test_serializer(self):
        serializer_data = UserSerializer(self.user).data
        expected_data = {
            'username': 'user',
            'avatar': '/media/avatars/default.png',
            'phonenumber': '+17538231242',
            'location': 'UK',
            'birth_date': None,
            'friends': []
        }
        self.assertEqual(expected_data, serializer_data)
