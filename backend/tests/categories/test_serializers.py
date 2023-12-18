from django.test import TestCase

from categories.serializers import CategorySerializer
from categories.models import Category
from tests.utils import get_image


class CategorySerializersTestCase(TestCase):
    def setUp(self):
        self.category_test = Category.objects.create(
            title='Category',
            description='Description',
        )

    def test_category_create_serializer(self):
        category_data = {
            'title': 'Category #1',
            'description': 'Description',
        }
        category_serializer = CategorySerializer(data=category_data)
        category_serializer.is_valid()
        category = category_serializer.save()
        expected_category = Category.objects.get(
            title='Category #1',
            description='Description'
        )
        self.assertEqual(expected_category, category)

    def test_category_serializer(self):
        category_serializer_data = CategorySerializer(self.category_test).data
        expected_data = {
            'title': 'Category', 
            'description': 'Description', 
            'image': '/media/categories/default.png'
        }
        self.assertEqual(expected_data, category_serializer_data)
    
    def test_update_category_serializer(self):
        new_data = {
            'title': 'New title',
            'description': 'New description',
            'image': get_image(1)
        }
        update_category_serializer = CategorySerializer(self.category_test, data=new_data)
        update_category_serializer.is_valid() 
        updated_category = update_category_serializer.save() 
        self.assertEqual(self.category_test, updated_category)

    def test_update_partial_category_serializer(self):
        new_title = {
            'title': 'New title #2'
        }
        update_category_serializer = CategorySerializer(self.category_test, data=new_title, partial=True)
        update_category_serializer.is_valid()
        update_category_serializer.save() 
        self.assertEqual('New title #2', self.category_test.title)
