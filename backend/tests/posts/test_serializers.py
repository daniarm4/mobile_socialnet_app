from django.test import TestCase
from django.contrib.auth import get_user_model

from categories.models import Category
from tests.utils import get_image
from posts.models import Post, PostImages, Like

User = get_user_model()


class PostSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='user',
            password='12345678',
            phonenumber='+17538231242',
            location='UK'
        )
        self.categories = Category.objects.bulk_create([
            Category(title=f'Category {i}', description=f'Description {i}') 
            for i in range(5) 
        ])
        self.post = Post.objects.create(
            title='Post title',
            text='Post description',
            owner=self.user,
        )
        self.post.categories.set(self.categories)
        self.images = PostImages.objects.bulk_create([
            PostImages(post=self.post, image=get_image(i)) 
            for i in range(5)
        ])

    def test_post(self):
        pass 
    