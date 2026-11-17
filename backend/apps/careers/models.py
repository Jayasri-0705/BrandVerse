from django.db import models
from django.utils.text import slugify

class JobOpening(models.Model):
    JOB_TYPE_CHOICES = (
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Contract', 'Contract'),
        ('Internship', 'Internship'),
        ('Remote', 'Remote'),
    )

    EXPERIENCE_CHOICES = (
        ('Entry Level', 'Entry Level (0-2 yrs)'),
        ('Mid Level', 'Mid Level (2-5 yrs)'),
        ('Senior Level', 'Senior Level (5+ yrs)'),
        ('Lead / Architect', 'Lead / Architect (8+ yrs)'),
    )

    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    department = models.CharField(max_length=100, default="Engineering")
    location = models.CharField(max_length=100, default="Remote / Hybrid")
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES, default='Full-time')
    experience_level = models.CharField(max_length=50, choices=EXPERIENCE_CHOICES, default='Mid Level')
    salary_range = models.CharField(max_length=100, blank=True, default="Competitive")
    description = models.TextField()
    requirements = models.JSONField(default=list, help_text="List of requirements")
    responsibilities = models.JSONField(default=list, help_text="List of responsibilities")
    benefits = models.JSONField(default=list, help_text="List of company perks & benefits")
    is_active = models.BooleanField(default=True)
    deadline = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while JobOpening.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.department})"

class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('applied', 'New Application'),
        ('reviewing', 'In Review'),
        ('interviewed', 'Interview Scheduled / Completed'),
        ('offered', 'Offer Extended'),
        ('rejected', 'Not Selected'),
    )

    job = models.ForeignKey(JobOpening, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications')
    job_position = models.CharField(max_length=150)
    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    resume_url = models.CharField(max_length=500, blank=True, null=True)
    cover_letter = models.TextField(blank=True, default="")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='applied')
    admin_notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.job_position} ({self.get_status_display()})"
