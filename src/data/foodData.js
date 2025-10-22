// Dummy food data for the app
export const foodCategories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burger', icon: '🍔' },
  { id: 3, name: 'Pasta', icon: '🍝' },
  { id: 4, name: 'Salad', icon: '🥗' },
  { id: 5, name: 'Dessert', icon: '🍰' },
  { id: 6, name: 'Drinks', icon: '🥤' },
  { id: 7, name: 'Asian', icon: '🍜' },
  { id: 8, name: 'Mexican', icon: '🌮' },
];

export const foodItems = [
  // Pizza
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
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni with mozzarella cheese on tomato sauce',
    price: 15.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    rating: 4.7,
    prepTime: '25-30 min',
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 3,
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
    price: 17.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    rating: 4.6,
    prepTime: '25-30 min',
    isPopular: false,
    isVegetarian: false,
  },

  // Burger
  {
    id: 4,
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
    price: 9.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    rating: 4.4,
    prepTime: '15-20 min',
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 5,
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado, sprouts, and vegan mayo',
    price: 11.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    rating: 4.3,
    prepTime: '15-20 min',
    isPopular: false,
    isVegetarian: true,
  },
  {
    id: 6,
    name: 'Bacon Deluxe Burger',
    description: 'Double beef patty with bacon, cheese, and crispy onions',
    price: 13.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400',
    rating: 4.8,
    prepTime: '20-25 min',
    isPopular: true,
    isVegetarian: false,
  },

  // Pasta
  {
    id: 7,
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with eggs, cheese, and crispy bacon',
    price: 14.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=400',
    rating: 4.6,
    prepTime: '20-25 min',
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 8,
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic and red chili peppers',
    price: 12.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
    rating: 4.4,
    prepTime: '15-20 min',
    isPopular: false,
    isVegetarian: true,
  },

  // Salad
  {
    id: 9,
    name: 'Caesar Salad',
    description: 'Romaine lettuce with parmesan cheese and caesar dressing',
    price: 8.99,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    rating: 4.2,
    prepTime: '10-15 min',
    isPopular: false,
    isVegetarian: true,
  },
  {
    id: 10,
    name: 'Mediterranean Salad',
    description: 'Mixed greens with olives, feta cheese, and balsamic vinaigrette',
    price: 10.99,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    rating: 4.5,
    prepTime: '10-15 min',
    isPopular: true,
    isVegetarian: true,
  },

  // Dessert
  {
    id: 11,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 6.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    rating: 4.8,
    prepTime: '15-20 min',
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: 12,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 7.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    rating: 4.7,
    prepTime: '10-15 min',
    isPopular: true,
    isVegetarian: true,
  },

  // Drinks
  {
    id: 13,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 3.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    rating: 4.3,
    prepTime: '5-10 min',
    isPopular: false,
    isVegetarian: true,
  },
  {
    id: 14,
    name: 'Coca Cola',
    description: 'Classic Coca Cola soft drink',
    price: 2.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400',
    rating: 4.1,
    prepTime: '2-5 min',
    isPopular: true,
    isVegetarian: true,
  },

  // Asian
  {
    id: 15,
    name: 'Chicken Teriyaki',
    description: 'Grilled chicken with teriyaki sauce and steamed rice',
    price: 13.99,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    rating: 4.6,
    prepTime: '20-25 min',
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 16,
    name: 'Vegetable Stir Fry',
    description: 'Mixed vegetables with soy sauce and ginger',
    price: 11.99,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f3a0b0a0?w=400',
    rating: 4.4,
    prepTime: '15-20 min',
    isPopular: false,
    isVegetarian: true,
  },

  // Mexican
  {
    id: 17,
    name: 'Chicken Tacos',
    description: 'Soft tortillas with seasoned chicken, lettuce, and salsa',
    price: 8.99,
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38174c4a5a5a?w=400',
    rating: 4.5,
    prepTime: '15-20 min',
    isPopular: true,
    isVegetarian: false,
  },
  {
    id: 18,
    name: 'Beef Burrito',
    description: 'Large tortilla with seasoned beef, beans, rice, and cheese',
    price: 10.99,
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    rating: 4.7,
    prepTime: '15-20 min',
    isPopular: true,
    isVegetarian: false,
  },
];

// API functions for food data
export const getFoodItems = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return foodItems;
};

export const getFoodCategories = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return foodCategories;
};

export const getFoodById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return foodItems.find(item => item.id === id);
};

export const getFoodByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return foodItems.filter(item => item.category === category);
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

export const getPopularFood = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return foodItems.filter(item => item.isPopular);
};
