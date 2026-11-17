from django.urls import path
from .views import TeamMemberListPublicView

urlpatterns = [
    path('', TeamMemberListPublicView.as_view(), name='team_list_public'),
]
