from django.db import models
from django.contrib.auth import get_user_model

from categories.models import Category

User = get_user_model()


class Post(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='posts')
    categories = models.ManyToManyField(Category, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'
        ordering = ['-created_at']

    def __str__(self):
        if not self.title:
            return f'Post #{self.pk}'
        return self.title


class PostImages(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Image'
        verbose_name_plural = 'Images'
        ordering = ['-created_at']


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'like'
        verbose_name_plural = 'likes'


class Comments(models.Model):
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='comments', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.owner: 
            return f'Owner - {self.owner}, post - {self.post}'
        return self.text[:30]

    class Meta:
        verbose_name = 'comment'
        verbose_name_plural = 'comments'
        constraints = [
            models.UniqueConstraint(fields=['owner', 'post'], name='unique_owner_post')
        ]
