from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class APITestCaseWithAuth(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username='admin',
            password='admin',
            phonenumber='+11582374235',
        )
        self.client.force_authenticate(user=self.admin)
