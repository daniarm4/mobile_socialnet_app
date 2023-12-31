from django.urls import path 

from categories.views import CategoryViewSet

app_name = 'categories'

category_list_create = CategoryViewSet.as_view({
    'get': 'list', 
    'post': 'create'    
})

category_detail = CategoryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy' 
})

# most_popular_posts = CategoryViewSet.as_view({
#     'get': 'most_popular_posts'
# })

urlpatterns = [
    path('', category_list_create, name='list-create'),
    path('<int:pk>/', category_detail, name='detail'),
    # path('popular_posts/', most_popular_posts, name='popular-posts')
]
