from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('clock', views.clock, name='clock'),
    path('weather', views.weather, name='weather'),
    path('news', views.news, name='news'),
    path("feedback/", views.feedback_submit, name="feedback_submit"),
    path("feedback/thanks/", lambda req: __import__('django.shortcuts').shortcuts.render(req, "daily/feedback_thanks.html"), name="feedback_thanks"),
    path("feedback/list/", views.feedback_list, name="feedback_list"),  # admin only
]
