from rest_framework import generics, viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import JobOpening, JobApplication
from .serializers import JobOpeningSerializer, JobApplicationPublicSerializer, JobApplicationAdminSerializer

class JobOpeningListPublicView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = JobOpeningSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = JobOpening.objects.filter(is_active=True).order_by('-created_at')
        department = self.request.query_params.get('department')
        location = self.request.query_params.get('location')
        if department and department != 'All':
            queryset = queryset.filter(department__iexact=department)
        if location and location != 'All':
            queryset = queryset.filter(location__iexact=location)
        return queryset

class JobOpeningDetailPublicView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = JobOpeningSerializer
    lookup_field = 'slug'
    queryset = JobOpening.objects.filter(is_active=True)

class JobApplicationCreatePublicView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = JobApplicationPublicSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "message": "Your application has been submitted successfully! Our talent acquisition team will review your profile shortly.",
            "application_id": serializer.data['id']
        }, status=status.HTTP_201_CREATED)

class JobOpeningAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = JobOpeningSerializer
    queryset = JobOpening.objects.all().order_by('-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'department', 'location', 'experience_level']
    pagination_class = None

class JobApplicationAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = JobApplicationAdminSerializer
    queryset = JobApplication.objects.all().order_by('-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'email', 'job_position', 'status']
    pagination_class = None
