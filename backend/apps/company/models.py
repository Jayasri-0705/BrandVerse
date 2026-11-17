from django.db import models

class CompanyInfo(models.Model):
    name = models.CharField(max_length=150, default="BRANDVERSE")
    tagline = models.CharField(max_length=255, default="Innovating Ideas. Building Digital Futures.")
    description = models.TextField(
        default="BrandVerse is a technology-driven software development company focused on creating innovative digital solutions for businesses, startups, and enterprises. We specialize in web development, mobile application development, AI and machine learning, UI/UX design, cloud solutions, and custom software development."
    )
    mission = models.TextField(
        default="Our mission is to transform business ideas into powerful digital products through creativity, innovation, and cutting-edge technology."
    )
    vision = models.TextField(
        default="To be a premier global technology partner recognized for building revolutionary, scalable, and human-centric digital experiences."
    )
    core_values = models.JSONField(default=list, help_text="List of core values with title, description, and icon")
    journey = models.JSONField(default=list, help_text="Timeline of company journey milestones")
    stats = models.JSONField(default=dict, help_text="Company stats e.g. completed_projects, happy_clients")
    email = models.EmailField(default="contact@brandverse.tech")
    phone = models.CharField(max_length=30, default="+1 (555) 349-2810")
    address = models.TextField(default="742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025")
    working_hours = models.CharField(max_length=100, default="Mon - Fri: 9:00 AM - 6:00 PM PST")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Company Information"

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    department = models.CharField(max_length=100, default="Engineering")
    bio = models.TextField(blank=True, default="")
    image = models.CharField(max_length=500, blank=True, help_text="Image URL or uploaded path")
    linkedin_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    twitter_url = models.URLField(blank=True, default="")
    email = models.EmailField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name} - {self.role}"

class Testimonial(models.Model):
    client_name = models.CharField(max_length=120)
    client_title = models.CharField(max_length=120)
    company_name = models.CharField(max_length=150)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    avatar = models.CharField(max_length=500, blank=True, help_text="Avatar URL or uploaded path")
    is_featured = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} ({self.company_name})"

class SiteSettings(models.Model):
    site_title = models.CharField(max_length=150, default="BrandVerse - IT & Software Development")
    contact_email = models.EmailField(default="contact@brandverse.tech")
    contact_phone = models.CharField(max_length=50, default="+1 (555) 349-2810")
    office_address = models.TextField(default="742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025")
    google_maps_url = models.URLField(default="https://maps.google.com/?q=San+Francisco+CA")
    facebook_url = models.URLField(blank=True, default="https://facebook.com/brandverse")
    twitter_url = models.URLField(blank=True, default="https://twitter.com/brandverse")
    linkedin_url = models.URLField(blank=True, default="https://linkedin.com/company/brandverse")
    instagram_url = models.URLField(blank=True, default="https://instagram.com/brandverse")
    github_url = models.URLField(blank=True, default="https://github.com/brandverse")
    meta_title = models.CharField(max_length=200, default="BrandVerse | Innovating Ideas. Building Digital Futures.")
    meta_description = models.TextField(default="BrandVerse is a premier technology & software development company specializing in Web, Mobile, AI, and Cloud solutions.")
    maintenance_mode = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_title
