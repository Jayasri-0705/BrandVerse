from django.urls import path
from .views import ContactEnquiryCreatePublicView

urlpatterns = [
    path('', ContactEnquiryCreatePublicView.as_view(), name='enquiry_public_create'),
]
