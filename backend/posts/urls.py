from django.urls import path 

from posts.views import PostViewSet, CommentsListAPIView, CommentsCreateAPIView

app_name = 'posts'

post_list_create = PostViewSet.as_view({
    'get': 'list', 
    'post': 'create'    
})

post_detail = PostViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy' 
})

like_post = PostViewSet.as_view({
    'post': 'like',
})

comments_list = CommentsListAPIView.as_view()

comments_create = CommentsCreateAPIView.as_view()

urlpatterns = [
    path('', post_list_create, name='list-create'),
    path('like/', like_post, name='like'),
    path('comments/<int:post_id>/', comments_list, name='comments-list'),
    path('comments/', comments_create, name='comments-create'),
    path('<int:pk>/', post_detail, name='detail'),
]
