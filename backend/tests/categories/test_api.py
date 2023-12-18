from django.urls import reverse
from rest_framework import status

from categories.serializers import CategorySerializer
from categories.models import Category
from tests.api import APITestCaseWithAuth
from tests.utils import get_image


class CategoryAPITestCase(APITestCaseWithAuth):
    def setUp(self):
        super().setUp()
        self.category_test = Category.objects.create(
            title='Category', 
            description='Descrtiption'
        )

    def test_category_create_endpoint(self):
        url = reverse('categories:list-create')
        category_data = {
            'title': 'New category',
            'description': 'Description'
        }
        response = self.client.post(url, data=category_data)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        created_category = Category.objects.get(title='New category', description='Description')
        expected_data = {
            'title': created_category.title,
            'description': created_category.description,
            'image': created_category.image.url
        }
        self.assertEqual(expected_data, response.json())

    def test_get_category_enpoint(self):
        url = reverse('categories:detail', kwargs={'pk': self.category_test.pk})
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        expected_data = {
            'title': 'Category', 
            'description': 'Descrtiption', 
            'image': '/media/categories/default.png'
        }
        self.assertEqual(expected_data, response.json())

    def test_update_category_endpoint(self):
        url = reverse('categories:detail', kwargs={'pk': self.category_test.pk})
        new_data = {
            'title': 'New category',
            'description': 'New description',
            'image': get_image(3)
        }
        response = self.client.put(url, data=new_data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        updated_category = Category.objects.get(pk=self.category_test.pk)
        expected_data = {
            'title': updated_category.title,
            'description': updated_category.description,
            'image': updated_category.image.url
        }
        self.assertEqual(expected_data, response.json())

    def test_update_partial_endpoint(self):
        url = reverse('categories:detail', kwargs={'pk': self.category_test.pk})
        new_data = {
            'title': 'New category #2'
        }
        response = self.client.patch(url, data=new_data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        updated_category = Category.objects.get(pk=self.category_test.pk)
        self.assertEqual('New category #2', updated_category.title)

    def test_destroy_endpoint(self):
        category_pk = self.category_test.pk
        url = reverse('categories:detail', kwargs={'pk': category_pk})
        response = self.client.delete(url)
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        try: 
            deleted_category = Category.objects.get(pk=category_pk)
        except Category.DoesNotExist:
            deleted_category = None
            
        self.assertIs(None, deleted_category)

