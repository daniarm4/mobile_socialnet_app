from rest_framework import serializers

from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'image']

    def get_image(self, obj):
        return obj.image.url


class PostCategorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(read_only=True)

    class Meta:
        model = Category
        fields = ['title']
