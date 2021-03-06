from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date=models.DateField(blank=True, null=True)
    description = models.CharField(max_length=300,default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='book_photos', max_length=254)

    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title