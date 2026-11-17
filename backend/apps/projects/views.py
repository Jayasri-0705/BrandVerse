from rest_framework import generics, viewsets, permissions, filters
from django.db.models import Q
from .models import Project
from .serializers import ProjectSerializer

class ProjectListPublicView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Project.objects.all().order_by('order', '-created_at')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')

        if category and category != 'All':
            queryset = queryset.filter(category__iexact=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(short_description__icontains=search) |
                Q(full_description__icontains=search)
            )
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)

        return queryset

class ProjectDetailPublicView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializer
    lookup_field = 'slug'
    queryset = Project.objects.all()

class ProjectAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all().order_by('order', '-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'category', 'short_description', 'client_name']
    pagination_class = None
