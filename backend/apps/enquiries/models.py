from django.db import models

class ContactEnquiry(models.Model):
    STATUS_CHOICES = (
        ('new', 'New Enquiry'),
        ('in_progress', 'In Discussion'),
        ('resolved', 'Proposal Sent / Resolved'),
        ('closed', 'Closed'),
    )

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default="")
    company_name = models.CharField(max_length=150, blank=True, default="")
    service_interested_in = models.CharField(max_length=150, default="General Inquiry")
    message = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.service_interested_in} ({self.created_at.strftime('%Y-%m-%d')})"
