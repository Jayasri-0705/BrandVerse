from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CompanyInfo, TeamMember, Testimonial, SiteSettings
from .serializers import CompanyInfoSerializer, TeamMemberSerializer, TestimonialSerializer, SiteSettingsSerializer

class CompanyInfoPublicView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        company = CompanyInfo.objects.first()
        if not company:
            company = CompanyInfo.objects.create(name="BRANDVERSE")
        serializer = CompanyInfoSerializer(company)
        return Response(serializer.data)

class TeamMemberListPublicView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TeamMemberSerializer
    pagination_class = None

    def get_queryset(self):
        return TeamMember.objects.filter(is_active=True).order_by('order', 'id')

class TestimonialListPublicView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TestimonialSerializer
    pagination_class = None

    def get_queryset(self):
        return Testimonial.objects.filter(is_active=True).order_by('-created_at')

class SiteSettingsPublicView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        settings_obj = SiteSettings.objects.first()
        if not settings_obj:
            settings_obj = SiteSettings.objects.create()
        serializer = SiteSettingsSerializer(settings_obj)
        return Response(serializer.data)

# Admin CRUD
class CompanyInfoAdminView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        company = CompanyInfo.objects.first()
        if not company:
            company = CompanyInfo.objects.create(name="BRANDVERSE")
        return Response(CompanyInfoSerializer(company).data)

    def put(self, request):
        company = CompanyInfo.objects.first()
        if not company:
            company = CompanyInfo.objects.create(name="BRANDVERSE")
        serializer = CompanyInfoSerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SiteSettingsAdminView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        settings_obj = SiteSettings.objects.first()
        if not settings_obj:
            settings_obj = SiteSettings.objects.create()
        return Response(SiteSettingsSerializer(settings_obj).data)

    def put(self, request):
        settings_obj = SiteSettings.objects.first()
        if not settings_obj:
            settings_obj = SiteSettings.objects.create()
        serializer = SiteSettingsSerializer(settings_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamMemberAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.all().order_by('order', 'id')
    pagination_class = None

class TestimonialAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.all().order_by('-created_at')
    pagination_class = None
