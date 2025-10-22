# Food Delivery App

A modern food delivery mobile application built with React Native and Expo. This app allows users to browse, search, and order food items with a beautiful and intuitive user interface.

## Features

### 🏠 Home Screen
- Welcome message and search functionality
- Food categories with icons
- Popular food items carousel
- Quick action buttons
- Real-time search with results

### 🍽️ Menu Screen
- Browse all food items by category
- Search functionality
- Filter by categories
- Food item cards with images, ratings, and prices
- Vegetarian and popular item badges

### 🛒 Cart Management
- Add/remove items from cart
- Update quantities
- Real-time cart total calculation
- Delivery fee calculation (free over $25)
- Tax calculation
- Clear cart functionality

### 📱 Food Details
- Detailed food information
- High-quality food images
- Quantity selector
- Add to cart functionality
- Add to favorites
- Rating and preparation time display

### 💳 Checkout Process
- User information form
- Delivery address management
- Payment method selection (Cash on Delivery, Credit/Debit Card)
- Order summary with pricing breakdown
- Order confirmation

### 👤 Profile Management
- User profile display
- Order history
- Favorites management
- Settings and preferences
- Help and support

### ❤️ Favorites
- Save favorite food items
- Remove from favorites
- Quick access to favorite dishes

### 📋 Order History
- View past orders
- Order status tracking
- Reorder functionality
- Order details and pricing

## Technical Features

### 📱 Data Management
- **AsyncStorage**: Local data persistence for cart, favorites, and user data
- **Dummy Data**: Comprehensive food database with 18+ items across 8 categories
- **API Simulation**: Async functions that simulate real API calls with delays

### 🎨 UI/UX Design
- Modern, clean interface with orange (#FF6B35) primary color
- Card-based layouts with shadows and rounded corners
- Responsive design for different screen sizes
- Intuitive navigation with bottom tabs
- Loading states and error handling

### 🔍 Search & Filter
- Real-time search across food names, descriptions, and categories
- Category-based filtering
- Popular items highlighting
- Vegetarian options identification

### 💰 Pricing System
- Dynamic pricing calculation
- Delivery fee logic (free over $25)
- Tax calculation (8%)
- Real-time total updates

## Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Food data and API functions
│   └── foodData.js     # Dummy food data and API simulation
├── navigation/          # Navigation configuration
│   └── AppNavigator.js # Main navigation setup
├── screens/            # App screens
│   ├── HomeScreen.js
│   ├── MenuScreen.js
│   ├── FoodDetailScreen.js
│   ├── CartScreen.js
│   ├── CheckoutScreen.js
│   ├── ProfileScreen.js
│   ├── OrderHistoryScreen.js
│   └── FavoritesScreen.js
└── utils/              # Utility functions
    └── storage.js      # AsyncStorage management
```

## Installation & Setup

1. **Prerequisites**
   - Node.js (v14 or higher)
   - Expo CLI
   - Android Studio (for Android development)
   - Xcode (for iOS development, macOS only)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the Development Server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on Device/Emulator**
   - **Android**: `npm run android` or `expo run:android`
   - **iOS**: `npm run ios` or `expo run:ios`
   - **Web**: `npm run web` or `expo start --web`

## Dependencies

### Core Dependencies
- **React Native**: Mobile app framework
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence

### Navigation
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/stack`
- `react-native-screens`
- `react-native-safe-area-context`

### Storage
- `@react-native-async-storage/async-storage`

### Icons
- `@expo/vector-icons`
- `react-native-vector-icons`

## Key Features Implementation

### 🛒 Cart System
- Persistent cart using AsyncStorage
- Real-time quantity updates
- Cart badge with item count
- Automatic total calculation

### 🔍 Search Functionality
- Debounced search input
- Search across multiple fields
- Real-time results display
- Search result highlighting

### 💾 Data Persistence
- User cart persistence
- Favorites management
- Order history storage
- User profile data

### 🎨 Modern UI Components
- Custom styled components
- Consistent color scheme
- Responsive layouts
- Loading and error states

## Food Categories

1. **Pizza** 🍕 - Italian favorites
2. **Burger** 🍔 - American classics
3. **Pasta** 🍝 - Italian pasta dishes
4. **Salad** 🥗 - Healthy options
5. **Dessert** 🍰 - Sweet treats
6. **Drinks** 🥤 - Beverages
7. **Asian** 🍜 - Asian cuisine
8. **Mexican** 🌮 - Mexican dishes

## Sample Food Items

The app includes 18+ food items with:
- High-quality images from Unsplash
- Detailed descriptions
- Pricing information
- Preparation times
- Ratings
- Vegetarian indicators
- Popular item badges

## Future Enhancements

- [ ] User authentication
- [ ] Real payment integration
- [ ] Push notifications
- [ ] Restaurant management
- [ ] Real-time order tracking
- [ ] Social features (reviews, sharing)
- [ ] Offline support
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React Native and Expo**
