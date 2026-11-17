"""
URL configuration for brandverse project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/company/', include('apps.company.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/projects/', include('apps.projects.urls')),
    path('api/team/', include('apps.company.team_urls')),
    path('api/testimonials/', include('apps.company.testimonial_urls')),
    path('api/jobs/', include('apps.careers.urls')),
    path('api/applications/', include('apps.careers.app_urls')),
    path('api/enquiries/', include('apps.enquiries.urls')),
    path('api/admin/', include('apps.dashboard.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
