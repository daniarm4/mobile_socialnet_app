from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from posts.models import Like, Post

User = get_user_model()


def like_post(post_id: int, user: User) -> bool:
    post = get_object_or_404(Post, id=post_id)
    like, like_created = Like.objects.get_or_create(user=user, post=post)
    if not like_created:
        like.delete()
    return like_created
