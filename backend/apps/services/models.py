from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    icon = models.CharField(max_length=50, default="Code", help_text="Lucide icon name e.g. Globe, Smartphone, Cpu")
    image = models.CharField(max_length=500, blank=True, help_text="Image URL or upload path")
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    benefits = models.JSONField(default=list, help_text="Key advantages/benefits of the service")
    technologies = models.JSONField(default=list, help_text="List of tools & tech used")
    process_steps = models.JSONField(default=list, help_text="List of process steps: [{step: 1, title: '', desc: ''}]")
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
