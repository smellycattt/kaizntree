from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Item, Category

class ItemAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.category = Category.objects.create(name='Electronics')
        print("Category ID:", self.category.id) 
        self.item = Item.objects.create(name='Test Item', category=self.category, in_stock=0, available_stock=10)
    
    def test_create_item(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        data = {
        'name': 'New Item',
        'sku': 'ETSY-FOREST',
        'category': self.category.id,
        'in_stock': 20,
        'available_stock': 15
        }
        response = self.client.post(reverse('item-create-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    
    def test_retrieve_item(self):
        response = self.client.get(reverse('item-detail', kwargs={'pk': self.item.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Item')
    
    def test_update_item(self):
        data = {'id':'1234', 'name': 'Updated Item', 'sku': 'ETSY-FOREST', 'category': self.category.id, 'in_stock': 12, 'available_stock': 0}
        response = self.client.put(reverse('item-update-delete', kwargs={'pk': self.item.pk}), data)
        print(response.data)  # Add this line to see the error details
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.item.refresh_from_db()
        self.assertEqual(self.item.name, 'Updated Item')
    
    def test_delete_item(self):
        response = self.client.delete(reverse('item-update-delete', kwargs={'pk': self.item.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Item.objects.count(), 0)
