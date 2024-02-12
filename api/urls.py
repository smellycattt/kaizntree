from django.urls import path
from .views import ItemListView, ItemDetailView, ItemCreateListView, ItemUpdateDeleteView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('items/', ItemListView.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('items/create/', ItemCreateListView.as_view(), name='item-create-list'),
    path('items/update/<int:pk>/', ItemUpdateDeleteView.as_view(), name='item-update-delete'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]