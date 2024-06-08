# basketball/urls.py

from django.urls import path
from .views import BasketballView

urlpatterns = [
    path('', BasketballView.as_view(), name='basketball_upload'),
]
