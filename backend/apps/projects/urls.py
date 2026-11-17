from django.urls import path
from .views import ProjectListPublicView, ProjectDetailPublicView

urlpatterns = [
    path('', ProjectListPublicView.as_view(), name='projects_public_list'),
    path('<slug:slug>/', ProjectDetailPublicView.as_view(), name='project_public_detail'),
]
