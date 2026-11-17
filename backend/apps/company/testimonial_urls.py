from django.urls import path
from .views import TestimonialListPublicView

urlpatterns = [
    path('', TestimonialListPublicView.as_view(), name='testimonial_list_public'),
]
