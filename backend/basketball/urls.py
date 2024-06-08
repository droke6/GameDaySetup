# basketball/urls.py

from django.urls import path
from .views import basketball

urlpatterns = [
    path('', basketball, name='basketball_upload'),
]
