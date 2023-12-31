# Generated by Django 5.0 on 2023-12-11 07:32

import django.contrib.auth.validators
import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phonenumber',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(db_index=True, max_length=155, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()]),
        ),
    ]
