from rest_framework import serializers

from posts.models import Post, PostImages, Comments
from categories.serializers import PostCategorySerializer


class PostImagesSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = PostImages
        fields = ['image', 'created_at']


class PostLikeSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()


class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'owner_username', 'text', 'image', 'created_at', 'parent']


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments 
        fields = ['owner', 'post', 'text', 'image', 'parent']


class PostSerializer(serializers.ModelSerializer):
    categories = PostCategorySerializer(many=True, read_only=True)
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    total_likes = serializers.IntegerField(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)
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
            'total_comments',
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
