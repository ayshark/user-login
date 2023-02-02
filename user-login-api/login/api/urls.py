from django.urls import path
from .views import UsersAPI, UserDetailAPI, LogInAPI, LogOutAPI

urlpatterns = [
    path('users/', UsersAPI.as_view()), #view all users, add a user
    path('user/<int:id>/', UserDetailAPI.as_view()), #view, edit or delete a specific user
    path('login/', LogInAPI.as_view()), #login
    path('logout/', LogOutAPI.as_view()), #logout
]