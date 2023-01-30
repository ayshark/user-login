from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import check_password

import datetime
import sys

from .models import Users, Logs
from .serializers import UserSerializer, LogsSerializer


class UsersAPI(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(
            serializer.data,
            status = status.HTTP_200_OK
        )
    
    def post(self, request):
        data = {
            'name': request.data.get('name'),
            'username': request.data.get('username'),
            'password': request.data.get('password'),
        }
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status = status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )

class UserDetailAPI(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get_user(self, id):
        try:
            return Users.objects.get(id = id)
        except:
            return None
    
    def get(self, request, id):
        user = self.get_user(id)
        if not user:
            return Response(
                {'res': 'User does not exist'},
                status = status.HTTP_400_BAD_REQUEST
            )
        serializer = UserSerializer(user)
        return Response(
            serializer.data,
            status = status.HTTP_200_OK
        )

    def delete(self, request, id):
        user = self.get_user(id)
        if not user:
            return Response(
                {'res': 'User does not exist'},
                status = status.HTTP_400_BAD_REQUEST
            )
        user.delete()
        return Response(
            {'res': 'User deleted'},
            status = status.HTTP_200_OK
        )
    
    def put(self, request, id):
        user = self.get_user(id)
        if not user:
            return Response(
                {'res': 'User does not exist'},
                status = status.HTTP_400_BAD_REQUEST
            )
        data = {
            'name': request.data.get('name'),
            'username': request.data.get('username'),
            'password': request.data.get('password'),
        }
        serializer = UserSerializer(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status = status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )

class LogInAPI(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    # def get_user(self, username, password, request):
    #     try: 
    #         user = Users.objects.filter(username = username)[0]
    #         if not user:
    #             # return user
    #             return "user not found"
    #         if user.password != password:
    #             return "password incorrect"
    #         if user.password == request.data.get('password'):
    #             return user
    #     except: 
    #         return None
        # else:
            
# {
# "username": "ef",
# "password": "fa"
# }

    def get_user(self, username, password):
        try:
            user = Users.objects.get(username = username)
            if check_password(password, user.password):
                return user
            else:
                return "password incorrect"
            # print(check_password(password, user.password), file=sys.stderr)
        except:
            return None

    
    def post(self, request):
        user = self.get_user(request.data.get('username'), request.data.get('password'))
        if user == "password incorrect":
            return Response(
                {'res': '{}'.format(user)},
                status = status.HTTP_400_BAD_REQUEST
            )
        if not user:
            return Response(
                {'res': 'account with username {} does not exist'.format(request.data.get('username'))},
                status = status.HTTP_400_BAD_REQUEST
            )
        user_id = Users.objects.get(username = request.data.get('username')).id
        data = {
            'user': user_id,
        }
        serializer = LogsSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status = status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )
        

