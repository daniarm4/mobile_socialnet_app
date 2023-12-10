from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class UserAPITestCase(APITestCase):
    def setUp(self):
        User.objects.create_superuser(
            username='admin',
            password='admin',
        )

    def test_list_endpoint(self):
        self.client.login(username='admin', password='admin')
        response = self.client.get(reverse('users-list'))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.client.logout()
        