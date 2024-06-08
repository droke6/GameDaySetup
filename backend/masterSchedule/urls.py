from django.urls import path
from .views import download_sorted_file

urlpatterns = [
    path('', download_sorted_file, name='download_sorted_file'),
]
