from django.urls import path
from .views import generate_net_height_file

urlpatterns = [
    path('generate_net_height_file/', generate_net_height_file, name='generate_net_height_file'),
]
