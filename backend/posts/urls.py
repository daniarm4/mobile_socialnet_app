from django.urls import path 

from posts.views import PostViewSet

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

urlpatterns = [
    path('', post_list_create, name='list-create'),
    path('like/', like_post, name='like'),
    path('<int:pk>/', post_detail, name='detail'),
]
