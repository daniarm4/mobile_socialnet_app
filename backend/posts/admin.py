from django.contrib import admin

from posts.models import Post, Like, PostImages, Comments

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(PostImages)
admin.site.register(Comments)
