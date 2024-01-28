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
    avatar = models.ImageField(upload_to='avatars', default='avatars/default.png', blank=True)
    phonenumber = PhoneNumberField(unique=True)
    location = models.CharField(max_length=155, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField('self')

    def __str__(self):
        return self.username 
    
    def send_friend_request(self, user):
        if self.sent_requests.filter(receiver=user).exists():
            raise ValueError('Friend request already sent.')
        if self.received_requests.filter(sender=user).exists():
            raise ValueError('Friend request already received.')
        return FriendRequest.objects.create(sender=self, receiver=user)
    
    def accept_friend_request(self, friend_request: 'FriendRequest'):
        if not friend_request.receiver == self:
             raise ValueError('This request was not sent to you.')
        with transaction.atomic():
            self.friends.add(friend_request.sender)
            friend_request.sender.friends.add(self)
            friend_request.delete()


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
