from django.db import models
from django.contrib.auth.hashers import make_password

class Users(models.Model):
    name = models.CharField(max_length=25)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=40)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Users, self).save(*args, **kwargs)

    
class Logs(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(blank=True, null=True)
    token = models.PositiveIntegerField(auto_created=True, unique=True)
    has_logged_out = models.BooleanField(default=False)
    # token = models.???

    def __str__(self):
        return self.user.name

