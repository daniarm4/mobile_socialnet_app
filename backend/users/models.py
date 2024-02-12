from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import transaction
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    username = models.CharField(
        max_length=155, 
        db_index=True, 
        unique=True, 
        validators=[AbstractUser.username_validator]
    )
    avatar = models.ImageField(upload_to='avatars', default='avatars/default.jpg', blank=True)
    phonenumber = PhoneNumberField(unique=True)
    location = models.CharField(max_length=155, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField('self')

    def __str__(self):
        return self.username 


class FriendRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')

    def __str__(self):
        return f'Friend request #{self.id}: {self.sender} -> {self.receiver}'

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['sender', 'receiver'],
                name='unique friend request'
            )
        ]
