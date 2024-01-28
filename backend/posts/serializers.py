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
        fields = ['id', 'owner_username', 'text', 'image', 'created_at', 'parent', 'level']


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments 
        fields = ['post', 'text', 'image', 'parent']

    def create(self, validated_data):
        owner = self.context['request'].user 
        comment = Comments.objects.create(owner=owner, **validated_data)
        return comment 


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
            'id',
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
    images = serializers.ListField(
        child=serializers.FileField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post 
        fields = [
            'title',
            'text',
            'owner',
            'categories',
            'images'
        ]

    def create(self, validated_data):
        images = validated_data.pop('images')
        categories = validated_data.pop('categories')
        owner = self.context['request'].user
        post = Post.objects.create(owner=owner, **validated_data)
        post.categories.set(categories)
        for image in images:
            PostImages.objects.create(post=post, image=image)
        return post
