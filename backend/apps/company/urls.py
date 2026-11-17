from django.urls import path
from .views import CompanyInfoPublicView, SiteSettingsPublicView

urlpatterns = [
    path('', CompanyInfoPublicView.as_view(), name='company_info_public'),
    path('settings/', SiteSettingsPublicView.as_view(), name='site_settings_public'),
]
