from django.urls import path
from .views import JobOpeningListPublicView, JobOpeningDetailPublicView

urlpatterns = [
    path('', JobOpeningListPublicView.as_view(), name='jobs_public_list'),
    path('<slug:slug>/', JobOpeningDetailPublicView.as_view(), name='job_public_detail'),
]
