from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User 
        fields = ['username', 'avatar', 'phonenumber', 'email', 'location', 'birth_date', 'friends']

    def get_avatar(self, obj):
        return obj.avatar.url


class UserCreateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User 
        fields = ['username', 'phonenumber', 'email', 'password1', 'password2']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            phonenumber=validated_data['phonenumber'],
            email=validated_data['email'],
            password=validated_data['password1'],
            is_active=False
        )
        return user 

    def validate_password1(self, password1):
        if password1 != self.initial_data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return password1


class UserUpdateSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(write_only=True)
    birth_date = serializers.DateField(write_only=True)
    location = serializers.CharField(max_length=155, write_only=True)

    class Meta:
        model = User 
        fields = ['avatar', 'birth_date', 'location']


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenBlacklistResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
