# Generated by Django 4.2 on 2023-05-20 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_user_managers_like_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_admin',
            new_name='is_staff',
        ),
    ]
