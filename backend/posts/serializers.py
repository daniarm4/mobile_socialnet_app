from rest_framework import serializers

from posts.models import Post, PostImages
from categories.serializers import PostCategorySerializer


class PostImagesSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = PostImages
        fields = ['image', 'created_at']


class PostLikeSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()


class PostSerializer(serializers.ModelSerializer):
    categories = PostCategorySerializer(many=True, read_only=True)
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    total_likes = serializers.IntegerField(read_only=True)
    images = PostImagesSerializer(many=True, read_only=True)
    is_liked = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Post 
        fields = [
            'title', 
            'text', 
            'owner_username', 
            'categories', 
            'total_likes', 
            'images', 
            'created_at',
            'is_liked'
        ]


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    images = PostImagesSerializer(many=True)

    class Meta:
        model = Post 
        fields = [
            'title',
            'text',
            'owner',
            'categories',
            'images'
        ]
