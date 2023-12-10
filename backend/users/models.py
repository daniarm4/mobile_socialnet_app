from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars', default='avatars/default.png', blank=True)
    phonenumber = PhoneNumberField()
    location = models.CharField(max_length=155, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    friends = models.ManyToManyField('self')

    def __str__(self):
        return self.username 
