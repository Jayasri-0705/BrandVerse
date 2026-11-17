from rest_framework import generics, viewsets, permissions, filters
from .models import Service
from .serializers import ServiceSerializer

class ServiceListPublicView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Service.objects.filter(is_active=True).order_by('order', 'id')
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        return queryset

class ServiceDetailPublicView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    queryset = Service.objects.filter(is_active=True)

class ServiceAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all().order_by('order', 'id')
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'short_description', 'technologies']
    pagination_class = None
