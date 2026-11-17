from rest_framework import serializers
from .models import ContactEnquiry

class ContactEnquiryPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ['id', 'name', 'email', 'phone', 'company_name', 'service_interested_in', 'message']
        read_only_fields = ['id']

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Please provide a valid full name.")
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Please provide more details in your message (at least 10 characters).")
        return value.strip()

class ContactEnquiryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
