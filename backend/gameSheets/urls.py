from django.urls import path
from .views import generate_game_sheets

urlpatterns = [
    path('', generate_game_sheets, name='generate_game_sheets'),
]
