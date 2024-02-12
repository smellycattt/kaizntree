from rest_framework import serializers
from .models import Item, Category, Tag

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'sku', 'name', 'category', 'tags', 'in_stock', 'available_stock']
