from django.db import models
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from slugify import slugify

# Create your models here.
class Note(models.Model):

    CATEGORY = (
        ('BUSINESS','Business'),
        ('PERSONAL','Personal'),
        ('IMPORTANT','Important'),
    )

    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank=True, null=True)
    category = models.CharField(max_length=15, choices=CATEGORY, default='PERSONAL')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')

    
    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        if not self.slug:
            slug_base = slugify(self.title)
            slug = slug_base

            if Note.objects.filter(slug=slug).exists():
                slug = f'{slug_base}-{get_random_string(5)}'
            self.slug = slug

        super(Note, self).save(*args, **kwargs)