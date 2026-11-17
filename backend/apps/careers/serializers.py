import os
from rest_framework import serializers
from .models import JobOpening, JobApplication

class JobOpeningSerializer(serializers.ModelSerializer):
    applications_count = serializers.SerializerMethodField()

    class Meta:
        model = JobOpening
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'applications_count']

    def get_applications_count(self, obj):
        return obj.applications.count()

class JobApplicationPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'job', 'job_position', 'full_name', 'email', 'phone', 'resume', 'cover_letter']
        read_only_fields = ['id']

    def validate_resume(self, value):
        if value:
            # Check size: 10MB limit
            if value.size > 10 * 1024 * 1024:
                raise serializers.ValidationError("Resume file size cannot exceed 10MB.")
            ext = os.path.splitext(value.name)[1].lower()
            if ext not in ['.pdf', '.doc', '.docx', '.rtf']:
                raise serializers.ValidationError("Only PDF and DOC/DOCX files are supported.")
        return value

class JobApplicationAdminSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = JobApplication
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
