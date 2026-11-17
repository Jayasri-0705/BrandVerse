from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardOverviewView, AdminProfileView
from apps.services.views import ServiceAdminViewSet
from apps.projects.views import ProjectAdminViewSet
from apps.careers.views import JobOpeningAdminViewSet, JobApplicationAdminViewSet
from apps.enquiries.views import ContactEnquiryAdminViewSet
from apps.company.views import (
    TeamMemberAdminViewSet,
    TestimonialAdminViewSet,
    CompanyInfoAdminView,
    SiteSettingsAdminView,
)

router = DefaultRouter()
router.register(r'services', ServiceAdminViewSet, basename='admin-services')
router.register(r'projects', ProjectAdminViewSet, basename='admin-projects')
router.register(r'jobs', JobOpeningAdminViewSet, basename='admin-jobs')
router.register(r'applications', JobApplicationAdminViewSet, basename='admin-applications')
router.register(r'enquiries', ContactEnquiryAdminViewSet, basename='admin-enquiries')
router.register(r'team', TeamMemberAdminViewSet, basename='admin-team')
router.register(r'testimonials', TestimonialAdminViewSet, basename='admin-testimonials')

urlpatterns = [
    path('dashboard/', DashboardOverviewView.as_view(), name='admin-dashboard-overview'),
    path('profile/', AdminProfileView.as_view(), name='admin-profile'),
    path('company/', CompanyInfoAdminView.as_view(), name='admin-company'),
    path('settings/', SiteSettingsAdminView.as_view(), name='admin-settings'),
    path('', include(router.urls)),
]
