import json
from datetime import date

from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status

from tests.api import APITestCaseWithAuth
from users.serializers import UserSerializer
from tests.utils import get_image

User = get_user_model()


class UserAPITestCase(APITestCaseWithAuth):
    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            username='new_user',
            password='new_user',
            phonenumber='+11582374234'
        )
        
    def test_get_list_endpoint(self):
        url = reverse('users:list-create')
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        users = User.objects.prefetch_related('friends').all()
        serializer_data = UserSerializer(users, many=True).data
        self.assertEqual(serializer_data, response.data)

    def test_get_me_endpoint(self):
        url = reverse('users:me')
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        serializer_data = UserSerializer(self.admin).data
        self.assertEqual(serializer_data, response.data)

    def test_create_enpoint(self):
        user_data = {
            'username': 'test_user',
            'phonenumber': '+79573483275',
            'email': 'test_user@example.com',
            'password1': 'Test12345678',
            'password2': 'Test12345678'
        }
        url = reverse('users:list-create')
        response = self.client.post(url, data=user_data)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        created_user = User.objects.get(username='test_user')
        expected_data = {
            'username': created_user.username,
            'phonenumber': created_user.phonenumber,
            'email': created_user.email
        }
        self.assertEqual(expected_data, response.data)

    def test_update_endpoint(self):
        avatar = get_image(3)
        url = reverse('users:detail', kwargs={'pk': self.user.pk})
        user_data = {
            'avatar': avatar,
            'birth_date': '2007-11-11',
            'location': 'Germany'
        }
        response = self.client.put(url, data=user_data, format='multipart')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        updated_user = User.objects.get(pk=self.user.pk)
        self.assertEqual(date(2007, 11, 11), updated_user.birth_date)
        self.assertEqual('Germany', updated_user.location)
        self.assertEqual('/media/avatars/test_image3.jpg', updated_user.avatar.url)

    def test_partial_update_endpoint(self):
        url = reverse('users:detail', kwargs={'pk': self.user.pk})
        user_data = {
            'location': 'Poland'
        }
        response = self.client.patch(url, data=user_data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        updated_user = User.objects.get(pk=self.user.pk)
        self.assertEqual('Poland', updated_user.location)

    def test_get_detail_endpoint(self):
        url = reverse('users:detail', kwargs={'pk': self.user.pk})
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        expected_data = {
            'username': 'new_user', 
            'avatar': '/media/avatars/default.png', 
            'phonenumber': '+11582374234', 
            'email': '', 
            'location': None, 
            'birth_date': None, 
            'friends': []
        }
        self.assertEqual(expected_data, response.data)

    def test_destroy_endpoint(self):
        user_pk = self.user.pk
        url = reverse('users:detail', kwargs={'pk': user_pk})
        response = self.client.delete(url)
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        try: 
            deleted_user = User.objects.get(pk=user_pk)
        except User.DoesNotExist:
            deleted_user = None
            
        self.assertIs(None, deleted_user)
