# Generated by Django 4.1.7 on 2024-04-18 23:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Registration',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
