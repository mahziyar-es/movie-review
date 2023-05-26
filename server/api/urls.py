from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('auth/login', TokenObtainPairView.as_view()),
    path('auth/signup', views.auth.signup),
    path('auth/refresh', TokenRefreshView.as_view()),

    path('index', views.index),
    path('sitemap', views.sitemap),
]


router = routers.SimpleRouter(False)

router.register(r'review', views.ReviewViewSet, basename='review')

urlpatterns += router.urls