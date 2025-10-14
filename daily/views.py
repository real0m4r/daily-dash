from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from .models import Feedback

def index(request):
    return render(request, "daily/index.html", {})
def clock(request):
    return render(request, "daily/clock.html", {})
def weather(request):
    return render(request, "daily/weather.html", {})
def news(request):
    return render(request, "daily/news.html", {})

def feedback_submit(request):
    """
    Public page to submit feedback. Saves to DB.
    """
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        message_text = request.POST.get("message", "").strip()
        if not message_text:
            messages.error(request, "Message is required.")
            return render(request, "daily/feedback_form.html", {"name": name, "email": email, "message": message_text})
        Feedback.objects.create(name=name or None, email=email or None, message=message_text)
        messages.success(request, "Thank you — your feedback has been received.")
        return redirect("feedback_thanks")
    return render(request, "daily/feedback_form.html")


@staff_member_required
def feedback_list(request):
    """
    Admin-only list of feedback entries.
    """
    qs = Feedback.objects.all()
    # simple pagination (optional)
    from django.core.paginator import Paginator
    paginator = Paginator(qs, 20)
    page = request.GET.get("page")
    page_obj = paginator.get_page(page)
    return render(request, "daily/feedback_list.html", {"page_obj": page_obj})
