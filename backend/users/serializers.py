from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.models import FriendRequest

User = get_user_model()


class UserLightSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    is_current_user_friend = serializers.BooleanField(required=False, read_only=True)

    class Meta:
        model = User 
        fields = ['id', 'username', 'avatar', 'is_current_user_friend']

    def get_avatar(self, obj):
        return obj.avatar.url


class UserDetailSerializer(UserLightSerializer):
    avatar = serializers.SerializerMethodField()
    
    class Meta:
        model = User 
        fields = UserLightSerializer.Meta.fields + ['phonenumber', 'email', 'location', 'birth_date']


class UserCreateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User 
        fields = ['username', 'phonenumber', 'email', 'password1', 'password2']

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


class FriendRequestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'receiver']

    def validate(self, attrs):
        if attrs['sender'] == attrs['receiver']:
            raise serializers.ValidationError('The sender cannot be the receiver')
        return attrs

    def to_representation(self, instance):
        return {
            'request': {
                'id': instance.id
            },
            'sender': {
                'id': instance.sender.id,
                'username': instance.sender.username,
                'avatar': instance.sender.avatar.url
            }
        }
