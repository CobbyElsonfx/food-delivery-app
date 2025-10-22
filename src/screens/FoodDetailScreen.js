import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addToCart, addToFavorites, removeFromFavorites, isFavorite } from '../utils/storage';

const { width } = Dimensions.get('window');

export default function FoodDetailScreen({ navigation, route }) {
  const { foodItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorite = await isFavorite(foodItem.id);
      setIsFavorited(favorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(foodItem, quantity);
      Alert.alert(
        'Added to Cart',
        `${foodItem.name} has been added to your cart!`,
        [
          { text: 'Continue Shopping', style: 'cancel' },
          { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
        ]
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorited) {
        await removeFromFavorites(foodItem.id);
        setIsFavorited(false);
        Alert.alert('Removed from Favorites', `${foodItem.name} has been removed from your favorites.`);
      } else {
        await addToFavorites(foodItem);
        setIsFavorited(true);
        Alert.alert('Added to Favorites', `${foodItem.name} has been added to your favorites!`);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites. Please try again.');
    }
  };

  const adjustQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Food Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: foodItem.image }} style={styles.foodImage} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={24}
            color={isFavorited ? "#FF6B35" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* Food Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.foodHeader}>
          <View style={styles.foodTitleContainer}>
            <Text style={styles.foodName}>{foodItem.name}</Text>
            {foodItem.isPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Popular</Text>
              </View>
            )}
          </View>
          <Text style={styles.foodPrice}>${foodItem.price}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{foodItem.rating}</Text>
          </View>
          <Text style={styles.prepTime}>⏱️ {foodItem.prepTime}</Text>
          {foodItem.isVegetarian && (
            <Text style={styles.vegetarianBadge}>🌱 Vegetarian</Text>
          )}
        </View>

        <Text style={styles.foodDescription}>{foodItem.description}</Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => adjustQuantity(-1)}
              disabled={quantity <= 1}
            >
              <Ionicons name="remove" size={20} color={quantity <= 1 ? "#ccc" : "#FF6B35"} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => adjustQuantity(1)}
              disabled={quantity >= 10}
            >
              <Ionicons name="add" size={20} color={quantity >= 10 ? "#ccc" : "#FF6B35"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Price */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${(foodItem.price * quantity).toFixed(2)}</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.addToCartButton, loading && styles.addToCartButtonDisabled]}
          onPress={handleAddToCart}
          disabled={loading}
        >
          <Ionicons name="basket" size={20} color="#fff" />
          <Text style={styles.addToCartText}>
            {loading ? 'Adding...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Estimated delivery: 30-45 minutes</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Food safety guaranteed</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="refresh-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Easy reordering available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    padding: 25,
    minHeight: 400,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  foodTitleContainer: {
    flex: 1,
    marginRight: 15,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  popularBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  prepTime: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
  },
  vegetarianBadge: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  foodDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 5,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 25,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  additionalInfo: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});
