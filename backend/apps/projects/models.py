from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    CATEGORY_CHOICES = (
        ('Web Development', 'Web Development'),
        ('Mobile Applications', 'Mobile Applications'),
        ('AI Solutions', 'AI Solutions'),
        ('E-commerce', 'E-commerce'),
        ('UI/UX Design', 'UI/UX Design'),
    )

    title = models.CharField(max_length=180, unique=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    category = models.CharField(max_length=60, choices=CATEGORY_CHOICES, default='Web Development')
    image = models.CharField(max_length=500, blank=True, help_text="Image URL or upload path")
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    client_name = models.CharField(max_length=150, blank=True, default="Enterprise Client")
    completion_date = models.CharField(max_length=50, blank=True, default="2026")
    technologies = models.JSONField(default=list, help_text="List of technologies e.g. ['React', 'Python', 'AWS']")
    live_link = models.URLField(blank=True, default="")
    github_link = models.URLField(blank=True, default="")
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.category})"
