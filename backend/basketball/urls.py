from django.urls import path
from . import views

urlpatterns = [
    path('sort/', views.sort_basketball, name='sort_basketball'),
]
