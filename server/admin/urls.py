from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/verify', TokenVerifyView.as_view() ),

    path('dashboard', views.dashboard ),
]


router = routers.SimpleRouter(False)
router.register(r'review', views.ReviewViewSet, basename='review')
router.register(r'comment', views.CommentViewSet, basename='comment')
router.register(r'user', views.UserViewSet, basename='user')

urlpatterns += router.urls