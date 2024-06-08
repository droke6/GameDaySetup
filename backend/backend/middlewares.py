# middlewares.py
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import get_token

class CsrfMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response['X-CSRFToken'] = get_token(request)
        return response
