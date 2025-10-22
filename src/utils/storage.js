import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  CART: 'cart',
  USER_PROFILE: 'user_profile',
  FAVORITES: 'favorites',
  ORDER_HISTORY: 'order_history',
};

// Cart management
export const getCart = async () => {
  try {
    const cartData = await AsyncStorage.getItem(STORAGE_KEYS.CART);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const addToCart = async (foodItem, quantity = 1) => {
  try {
    const cart = await getCart();
    const existingItem = cart.find(item => item.id === foodItem.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...foodItem,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return [];
  }
};

export const removeFromCart = async (foodId) => {
  try {
    const cart = await getCart();
    const updatedCart = cart.filter(item => item.id !== foodId);
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return [];
  }
};

export const updateCartItemQuantity = async (foodId, quantity) => {
  try {
    const cart = await getCart();
    const updatedCart = cart.map(item => 
      item.id === foodId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return [];
  }
};

export const getCartTotal = async () => {
  try {
    const cart = await getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

export const getCartItemCount = async () => {
  try {
    const cart = await getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

// User profile management
export const getUserProfile = async () => {
  try {
    const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profileData ? JSON.parse(profileData) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    return profile;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return null;
  }
};

// Favorites management
export const getFavorites = async () => {
  try {
    const favoritesData = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favoritesData ? JSON.parse(favoritesData) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = async (foodItem) => {
  try {
    const favorites = await getFavorites();
    const isAlreadyFavorite = favorites.some(item => item.id === foodItem.id);
    
    if (!isAlreadyFavorite) {
      favorites.push(foodItem);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
    
    return favorites;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return [];
  }
};

export const removeFromFavorites = async (foodId) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(item => item.id !== foodId);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return [];
  }
};

export const isFavorite = async (foodId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(item => item.id === foodId);
  } catch (error) {
    console.error('Error checking if favorite:', error);
    return false;
  }
};

// Order history management
export const getOrderHistory = async () => {
  try {
    const orderData = await AsyncStorage.getItem(STORAGE_KEYS.ORDER_HISTORY);
    return orderData ? JSON.parse(orderData) : [];
  } catch (error) {
    console.error('Error getting order history:', error);
    return [];
  }
};

export const addOrderToHistory = async (order) => {
  try {
    const orderHistory = await getOrderHistory();
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      orderDate: new Date().toISOString(),
      status: 'completed',
    };
    
    orderHistory.unshift(newOrder);
    await AsyncStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(orderHistory));
    return newOrder;
  } catch (error) {
    console.error('Error adding order to history:', error);
    return null;
  }
};

// Utility functions
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const calculateDeliveryFee = (subtotal) => {
  return subtotal > 25 ? 0 : 3.99; // Free delivery over $25
};

export const calculateTax = (subtotal) => {
  return subtotal * 0.08; // 8% tax
};

export const calculateTotal = (subtotal, deliveryFee, tax) => {
  return subtotal + deliveryFee + tax;
};
