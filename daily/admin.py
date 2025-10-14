from django.contrib import admin
from .models import Feedback

# Register your models here.

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "created_at")
    list_display_links = ("id", "name")
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at",)
