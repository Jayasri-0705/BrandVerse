from django.urls import path
from .views import JobApplicationCreatePublicView

urlpatterns = [
    path('', JobApplicationCreatePublicView.as_view(), name='application_public_create'),
]
