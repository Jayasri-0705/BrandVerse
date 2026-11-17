from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from apps.services.models import Service
from apps.projects.models import Project
from apps.careers.models import JobOpening, JobApplication
from apps.enquiries.models import ContactEnquiry
from apps.company.models import TeamMember, Testimonial, CompanyInfo, SiteSettings
from apps.careers.serializers import JobApplicationAdminSerializer
from apps.enquiries.serializers import ContactEnquiryAdminSerializer
from apps.accounts.serializers import UserSerializer

class DashboardOverviewView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        total_services = Service.objects.count()
        active_services = Service.objects.filter(is_active=True).count()

        total_projects = Project.objects.count()
        featured_projects = Project.objects.filter(is_featured=True).count()

        total_jobs = JobOpening.objects.count()
        active_jobs = JobOpening.objects.filter(is_active=True).count()

        total_applications = JobApplication.objects.count()
        new_applications = JobApplication.objects.filter(status='applied').count()

        total_enquiries = ContactEnquiry.objects.count()
        new_enquiries = ContactEnquiry.objects.filter(status='new').count()

        total_team = TeamMember.objects.count()
        total_testimonials = Testimonial.objects.count()

        recent_enquiries = ContactEnquiry.objects.all().order_by('-created_at')[:6]
        recent_applications = JobApplication.objects.all().order_by('-created_at')[:6]

        # Category distribution for projects
        categories = ['Web Development', 'Mobile Applications', 'AI Solutions', 'E-commerce', 'UI/UX Design']
        project_stats_by_cat = {
            cat: Project.objects.filter(category=cat).count() for cat in categories
        }

        return Response({
            "metrics": {
                "total_services": total_services,
                "active_services": active_services,
                "total_projects": total_projects,
                "featured_projects": featured_projects,
                "total_jobs": total_jobs,
                "active_jobs": active_jobs,
                "total_applications": total_applications,
                "new_applications": new_applications,
                "total_enquiries": total_enquiries,
                "new_enquiries": new_enquiries,
                "total_team": total_team,
                "total_testimonials": total_testimonials,
            },
            "project_distribution": project_stats_by_cat,
            "recent_enquiries": ContactEnquiryAdminSerializer(recent_enquiries, many=True).data,
            "recent_applications": JobApplicationAdminSerializer(recent_applications, many=True).data,
        })

class AdminProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
