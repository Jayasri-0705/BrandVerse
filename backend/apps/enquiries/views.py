from rest_framework import generics, viewsets, permissions, filters, status
from rest_framework.response import Response
from .models import ContactEnquiry
from .serializers import ContactEnquiryPublicSerializer, ContactEnquiryAdminSerializer

class ContactEnquiryCreatePublicView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactEnquiryPublicSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "message": "Thank you for contacting BrandVerse! Our solution architects will review your enquiry and get back to you within 24 hours.",
            "enquiry_id": serializer.data['id']
        }, status=status.HTTP_201_CREATED)

class ContactEnquiryAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = ContactEnquiryAdminSerializer
    queryset = ContactEnquiry.objects.all().order_by('-created_at')
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email', 'company_name', 'service_interested_in', 'message']
    pagination_class = None
