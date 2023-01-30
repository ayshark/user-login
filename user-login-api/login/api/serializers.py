from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Users, Logs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data['password'])
    #     return super(UserSerializer, self).create(validated_data)

    # validate_password = make_password

class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logs
        fields = '__all__'