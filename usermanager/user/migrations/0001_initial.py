# Generated by Django 3.2.4 on 2021-06-30 14:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Groups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GroupName', models.CharField(max_length=100)),
                ('GroupDescription', models.TextField(max_length=600)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UserName', models.CharField(max_length=100)),
                ('GroupId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.groups')),
            ],
        ),
    ]
