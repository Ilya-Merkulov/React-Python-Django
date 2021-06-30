from django.db import models


# Create your models here.

class Groups(models.Model):
    GroupName = models.CharField(max_length=100)
    GroupDescription = models.TextField(max_length=600)


class User(models.Model):
    UserName = models.CharField(max_length=100)
    DateOfCreating = models.DateField(auto_now_add=True)
    GroupId = models.ForeignKey(Groups, on_delete=models.CASCADE)

