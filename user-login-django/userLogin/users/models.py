from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

class User(AbstractUser):
    name = models.CharField(max_length = 20, default = '')
    bio = models.CharField(max_length = 100)
    place = models.CharField(max_length = 20)

    def __str__(self):
        return self.name

@receiver(post_save, sender = User)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user = instance)