from django.urls import path
from .views import ServiceListPublicView, ServiceDetailPublicView

urlpatterns = [
    path('', ServiceListPublicView.as_view(), name='services_public_list'),
    path('<slug:slug>/', ServiceDetailPublicView.as_view(), name='service_public_detail'),
]
