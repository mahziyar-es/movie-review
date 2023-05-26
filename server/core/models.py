from django.db import models
from rest_framework.exceptions import NotFound
from core import utils
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import UserManager


class EnhancedModelManager(models.QuerySet):

    def custom_filter(self, *args, **kwargs):
        filters = {k:v for k,v in kwargs.items() if v }
        return self.filter(**filters)


    def get_one(self, **kwargs):
        try:
            return self.get(**kwargs)
        except:
            return None


    def get_one_or_fail(self, **kwargs):
        try:
            return self.get(**kwargs)
        except:
            raise NotFound('Item not found')



    def page_pagination(self, req):
        per_page = 10

        page = int(req.query_params.get('page', 1)) - 1
        offset = page * per_page 
        to = offset + per_page

        total_count = self.count() 
        items = self[offset:to] 

        return {
            "items": items,
            "total_count": total_count,
            "per_page": per_page,
        }


    def count_pagination(self, req):
        per_load = 20

        offset = int(req.query_params.get('count', 0))
        to = offset + per_load

        items = self[offset:to] 

        return items




# ========================================================================================================
class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    password = models.TextField()
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    is_authenticated = True

    objects = UserManager()


# ========================================================================================================
class Review(models.Model):
    title = models.CharField(max_length=255)
    thumbnail = models.FileField(upload_to=utils.upload_file_path)
    background_image = models.FileField(upload_to=utils.upload_file_path)
    video = models.TextField()
    text = models.TextField()
    tags = models.CharField(max_length=255)
    seo_title = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    objects = EnhancedModelManager.as_manager()


# ========================================================================================================
class Comment(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    objects = EnhancedModelManager.as_manager()


# ========================================================================================================
class Like(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = EnhancedModelManager.as_manager()