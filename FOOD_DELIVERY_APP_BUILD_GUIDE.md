# Complete Food Delivery App Build Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup & Installation](#setup--installation)
3. [Project Structure](#project-structure)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Navigation Architecture](#navigation-architecture)
6. [Data Management](#data-management)
7. [Screen Implementation](#screen-implementation)
8. [Key Features Logic](#key-features-logic)
9. [Testing & Deployment](#testing--deployment)

## Project Overview

This is a comprehensive React Native food delivery app built with Expo. The app features:
- **4 Main Tabs**: Home, Menu, Cart, Profile
- **8 Food Categories**: Pizza, Burger, Pasta, Salad, Dessert, Drinks, Asian, Mexican
- **18+ Food Items** with images, descriptions, ratings, and pricing
- **Local Storage**: Cart, favorites, order history, user profile
- **Search & Filter**: Real-time search across food items
- **Checkout System**: Complete order flow with pricing calculations

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Visual Studio Code

### Step 1: Initialize Project
```bash
# Create new Expo project
npx create-expo-app FoodDeliveryApp --template blank

# Navigate to project
cd FoodDeliveryApp

# Install dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install @expo/vector-icons
```

### Step 2: Update package.json
```json
{
  "name": "fooddeliveryapp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^15.0.2",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-navigation/bottom-tabs": "^7.4.9",
    "@react-navigation/native": "^7.1.18",
    "@react-navigation/stack": "^7.4.10",
    "expo": "~54.0.16",
    "expo-status-bar": "~3.0.8",
    "react": "19.1.0",
    "react-native": "0.81.4",
    "react-native-safe-area-context": "^5.6.1",
    "react-native-screens": "~4.16.0",
    "react-native-vector-icons": "^10.3.0"
  }
}
```

## Project Structure

```
src/
├── components/          # Reusable UI components (empty in this app)
├── data/
│   └── foodData.js     # Food data and API simulation functions
├── navigation/
│   └── AppNavigator.js # Main navigation configuration
├── screens/            # All app screens
│   ├── HomeScreen.js
│   ├── MenuScreen.js
│   ├── FoodDetailScreen.js
│   ├── CartScreen.js
│   ├── CheckoutScreen.js
│   ├── ProfileScreen.js
│   ├── OrderHistoryScreen.js
│   └── FavoritesScreen.js
└── utils/
    └── storage.js      # AsyncStorage management functions
```

## Step-by-Step Implementation

### Step 1: Create Data Layer (src/data/foodData.js)

**Purpose**: Centralized data management with API simulation

**Key Logic**:
- **Food Categories**: 8 categories with icons and names
- **Food Items**: 18+ items with complete metadata
- **API Simulation**: Async functions with delays to simulate real API calls

**Implementation**:
```javascript
// Food categories with icons
export const foodCategories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  // ... 6 more categories
];

// Food items with complete metadata
export const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    rating: 4.5,
    prepTime: '25-30 min',
    isPopular: true,
    isVegetarian: true,
  },
  // ... 17 more items
];

// API simulation functions
export const getFoodItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return foodItems;
};

export const searchFood = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const lowercaseQuery = query.toLowerCase();
  return foodItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  );
};
```

### Step 2: Create Storage Layer (src/utils/storage.js)

**Purpose**: Local data persistence using AsyncStorage

**Key Logic**:
- **Cart Management**: Add, remove, update quantities
- **Favorites**: Add/remove favorite items
- **Order History**: Store completed orders
- **User Profile**: Store user information

**Implementation**:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CART: 'cart',
  USER_PROFILE: 'user_profile',
  FAVORITES: 'favorites',
  ORDER_HISTORY: 'order_history',
};

// Cart management
export const addToCart = async (foodItem, quantity = 1) => {
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
};

// Pricing calculations
export const calculateDeliveryFee = (subtotal) => {
  return subtotal > 25 ? 0 : 3.99; // Free delivery over $25
};

export const calculateTax = (subtotal) => {
  return subtotal * 0.08; // 8% tax
};
```

### Step 3: Create Navigation System (src/navigation/AppNavigator.js)

**Purpose**: Define app navigation structure

**Architecture**:
- **Bottom Tab Navigator**: 4 main tabs (Home, Menu, Cart, Profile)
- **Stack Navigators**: Each tab has its own stack for nested screens
- **Shared Screens**: FoodDetailScreen accessible from multiple stacks

**Implementation**:
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack (Home + FoodDetail)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          }
          // ... other tabs
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
```

## Navigation Architecture

### Navigation Flow
```
AppNavigator
├── TabNavigator
│   ├── HomeStack
│   │   ├── HomeMain (HomeScreen)
│   │   └── FoodDetail (FoodDetailScreen)
│   ├── MenuStack
│   │   ├── MenuMain (MenuScreen)
│   │   └── FoodDetail (FoodDetailScreen)
│   ├── CartStack
│   │   ├── CartMain (CartScreen)
│   │   └── Checkout (CheckoutScreen)
│   └── ProfileStack
│       ├── ProfileMain (ProfileScreen)
│       ├── OrderHistory (OrderHistoryScreen)
│       └── Favorites (FavoritesScreen)
```

### Screen Relationships
- **HomeScreen** → **FoodDetailScreen** (via navigation.navigate)
- **MenuScreen** → **FoodDetailScreen** (via navigation.navigate)
- **CartScreen** → **CheckoutScreen** (via navigation.navigate)
- **ProfileScreen** → **OrderHistoryScreen** (via navigation.navigate)
- **ProfileScreen** → **FavoritesScreen** (via navigation.navigate)

## Data Management

### Data Flow Architecture
```
User Interaction
    ↓
Screen Component
    ↓
Storage Functions (AsyncStorage)
    ↓
Local Storage
    ↓
UI Update
```

### Key Data Operations

1. **Cart Management**:
   - Add items with quantity
   - Update quantities
   - Remove items
   - Clear entire cart
   - Calculate totals

2. **Favorites System**:
   - Add/remove favorites
   - Check favorite status
   - Display favorites list

3. **Order Processing**:
   - Create order from cart
   - Store in order history
   - Clear cart after order

## Screen Implementation

### Step 4: HomeScreen Implementation

**Purpose**: Welcome screen with search, categories, and popular items

**Key Logic**:
- **Search Functionality**: Real-time search with debouncing
- **Category Navigation**: Navigate to Menu with category filter
- **Popular Items**: Display featured food items
- **Cart Badge**: Show cart item count

**Implementation Logic**:
```javascript
export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [popularFood, setPopularFood] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load data on component mount
  useEffect(() => {
    loadData();
    loadCartCount();
  }, []);

  // Search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchFood(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Navigate to food detail
  const navigateToFoodDetail = (foodItem) => {
    navigation.navigate('FoodDetail', { foodItem });
  };

  // Navigate to menu with category filter
  const navigateToMenu = (category) => {
    navigation.navigate('Menu', { category });
  };
}
```

### Step 5: MenuScreen Implementation

**Purpose**: Browse all food items with category filtering

**Key Logic**:
- **Category Filtering**: Filter items by selected category
- **Search Integration**: Search within filtered results
- **Item Display**: Show food cards with images and details
- **Navigation**: Navigate to food details

**Implementation Logic**:
```javascript
export default function MenuScreen({ navigation, route }) {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load food items based on category and search
  useEffect(() => {
    loadFoodItems();
  }, [selectedCategory, searchQuery]);

  const loadFoodItems = async () => {
    let items = [];
    
    if (searchQuery.trim()) {
      items = await searchFood(searchQuery);
    } else if (selectedCategory === 'All') {
      items = await getFoodItems();
    } else {
      items = await getFoodByCategory(selectedCategory);
    }
    
    setFoodItems(items);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };
}
```

### Step 6: FoodDetailScreen Implementation

**Purpose**: Detailed view of individual food items

**Key Logic**:
- **Item Display**: Show complete food information
- **Quantity Selection**: Allow quantity adjustment
- **Add to Cart**: Add item with selected quantity
- **Favorites**: Add/remove from favorites
- **Price Calculation**: Calculate total price

**Implementation Logic**:
```javascript
export default function FoodDetailScreen({ navigation, route }) {
  const { foodItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(foodItem, quantity);
    Alert.alert('Added to Cart', `${foodItem.name} has been added to your cart!`);
  };

  const handleToggleFavorite = async () => {
    if (isFavorited) {
      await removeFromFavorites(foodItem.id);
      setIsFavorited(false);
    } else {
      await addToFavorites(foodItem);
      setIsFavorited(true);
    }
  };

  const adjustQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
}
```

### Step 7: CartScreen Implementation

**Purpose**: Manage shopping cart items

**Key Logic**:
- **Cart Display**: Show all cart items with quantities
- **Quantity Management**: Increase/decrease item quantities
- **Item Removal**: Remove items from cart
- **Price Calculation**: Calculate subtotal, delivery fee, tax, and total
- **Checkout Navigation**: Navigate to checkout screen

**Implementation Logic**:
```javascript
export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    await updateCartItemQuantity(itemId, newQuantity);
    await loadCart();
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
    await loadCart();
  };

  // Calculate pricing
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, deliveryFee, tax);
}
```

### Step 8: CheckoutScreen Implementation

**Purpose**: Complete order process

**Key Logic**:
- **Form Validation**: Validate user information
- **Payment Selection**: Choose payment method
- **Order Summary**: Display final order details
- **Order Processing**: Create order and clear cart
- **Confirmation**: Show order confirmation

**Implementation Logic**:
```javascript
export default function CheckoutScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const validateForm = () => {
    const { name, phone, address, city, zipCode } = userInfo;
    
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !zipCode.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    const order = {
      items: cartItems,
      userInfo,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    await addOrderToHistory(order);
    await clearCart();
    
    Alert.alert('Order Placed Successfully!', 'Your order has been placed and will be delivered in 30-45 minutes.');
    navigation.navigate('Home');
  };
}
```

### Step 9: ProfileScreen Implementation

**Purpose**: User profile and account management

**Key Logic**:
- **User Information**: Display user profile
- **Statistics**: Show order count, favorites count, rating
- **Navigation**: Navigate to order history and favorites
- **Settings**: Access app settings and preferences

**Implementation Logic**:
```javascript
export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const loadUserData = async () => {
    const [profile, favorites, orders] = await Promise.all([
      getUserProfile(),
      getFavorites(),
      getOrderHistory(),
    ]);
    
    setUserProfile(profile);
    setFavoritesCount(favorites.length);
    setOrdersCount(orders.length);
  };

  const renderMenuItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <Ionicons name={icon} size={24} color="#FF6B35" />
        </View>
        <View style={styles.menuText}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </TouchableOpacity>
  );
}
```

### Step 10: OrderHistoryScreen Implementation

**Purpose**: Display past orders

**Key Logic**:
- **Order Display**: Show order details with items
- **Status Tracking**: Display order status with colors
- **Date Formatting**: Format order dates
- **Reorder Functionality**: Allow reordering items

**Implementation Logic**:
```javascript
export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };
}
```

### Step 11: FavoritesScreen Implementation

**Purpose**: Manage favorite food items

**Key Logic**:
- **Favorites Display**: Show all favorite items
- **Remove Functionality**: Remove items from favorites
- **Navigation**: Navigate to food details
- **Empty State**: Handle empty favorites list

**Implementation Logic**:
```javascript
export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFavorite = async (foodId, foodName) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove ${foodName} from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFromFavorites(foodId);
            await loadFavorites();
          },
        },
      ]
    );
  };
}
```

## Key Features Logic

### Search Functionality
```javascript
// Real-time search with debouncing
const handleSearch = async (query) => {
  setSearchQuery(query);
  if (query.trim()) {
    const results = await searchFood(query);
    setSearchResults(results);
  } else {
    setSearchResults([]);
  }
};
```

### Cart Management
```javascript
// Add item to cart with quantity
const addToCart = async (foodItem, quantity = 1) => {
  const cart = await getCart();
  const existingItem = cart.find(item => item.id === foodItem.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...foodItem, quantity, addedAt: new Date().toISOString() });
  }
  
  await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};
```

### Pricing Calculations
```javascript
// Dynamic pricing system
const calculateDeliveryFee = (subtotal) => {
  return subtotal > 25 ? 0 : 3.99; // Free delivery over $25
};

const calculateTax = (subtotal) => {
  return subtotal * 0.08; // 8% tax
};

const calculateTotal = (subtotal, deliveryFee, tax) => {
  return subtotal + deliveryFee + tax;
};
```

### Data Persistence
```javascript
// AsyncStorage operations
export const getCart = async () => {
  const cartData = await AsyncStorage.getItem(STORAGE_KEYS.CART);
  return cartData ? JSON.parse(cartData) : [];
};

export const saveUserProfile = async (profile) => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};
```

## Testing & Deployment

### Step 12: Testing
```bash
# Start development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios

# Run on web
npx expo start --web
```

### Step 13: Build for Production
```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Build for web
npx expo build:web
```

## Key Implementation Notes

### 1. Navigation Flow
- **Bottom Tabs**: Main navigation between sections
- **Stack Navigation**: Nested screens within each tab
- **Shared Screens**: FoodDetailScreen accessible from multiple stacks

### 2. Data Flow
- **Local Storage**: All data persisted using AsyncStorage
- **State Management**: React hooks for component state
- **API Simulation**: Async functions with delays for realistic behavior

### 3. User Experience
- **Real-time Updates**: Cart count, search results, pricing
- **Form Validation**: Checkout form validation
- **Error Handling**: Try-catch blocks for all async operations
- **Loading States**: Loading indicators for better UX

### 4. Performance Considerations
- **Lazy Loading**: Components loaded as needed
- **Efficient Rendering**: FlatList for large lists
- **Memory Management**: Proper cleanup of async operations

This guide provides a complete roadmap for building a production-ready food delivery app with React Native and Expo. Each step includes the logic explanation and implementation details needed to understand how the app works.

