import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserProfile, saveUserProfile, getFavorites, getOrderHistory } from '../utils/storage';

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [profile, favorites, orders] = await Promise.all([
        getUserProfile(),
        getFavorites(),
        getOrderHistory(),
      ]);
      
      setUserProfile(profile);
      setFavoritesCount(favorites.length);
      setOrdersCount(orders.length);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Profile editing feature will be available in the next update.',
      [{ text: 'OK' }]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Settings feature will be available in the next update.',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Help & Support',
      'For support, please contact us at support@fooddeliveryapp.com',
      [{ text: 'OK' }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Food Delivery App v1.0.0\n\nA modern food delivery app built with React Native and Expo.',
      [{ text: 'OK' }]
    );
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
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>
          {userProfile?.name || 'John Doe'}
        </Text>
        <Text style={styles.userEmail}>
          {userProfile?.email || 'john.doe@example.com'}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{ordersCount}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{favoritesCount}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        {renderMenuItem({
          icon: 'time-outline',
          title: 'Order History',
          subtitle: 'View your past orders',
          onPress: () => navigation.navigate('OrderHistory'),
        })}
        
        {renderMenuItem({
          icon: 'heart-outline',
          title: 'Favorites',
          subtitle: 'Your favorite dishes',
          onPress: () => navigation.navigate('Favorites'),
        })}
        
        {renderMenuItem({
          icon: 'location-outline',
          title: 'Delivery Addresses',
          subtitle: 'Manage your addresses',
          onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon!'),
        })}
        
        {renderMenuItem({
          icon: 'card-outline',
          title: 'Payment Methods',
          subtitle: 'Manage payment options',
          onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon!'),
        })}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        {renderMenuItem({
          icon: 'help-circle-outline',
          title: 'Help & Support',
          subtitle: 'Get help with your orders',
          onPress: handleHelp,
        })}
        
        {renderMenuItem({
          icon: 'chatbubble-outline',
          title: 'Contact Us',
          subtitle: 'Send us a message',
          onPress: () => Alert.alert('Contact', 'Email: support@fooddeliveryapp.com'),
        })}
        
        {renderMenuItem({
          icon: 'star-outline',
          title: 'Rate the App',
          subtitle: 'Share your feedback',
          onPress: () => Alert.alert('Rate App', 'Thank you for your feedback!'),
        })}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        {renderMenuItem({
          icon: 'notifications-outline',
          title: 'Notifications',
          subtitle: 'Manage notification preferences',
          onPress: handleSettings,
        })}
        
        {renderMenuItem({
          icon: 'shield-outline',
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          onPress: () => Alert.alert('Privacy Policy', 'Privacy policy will be available soon.'),
        })}
        
        {renderMenuItem({
          icon: 'document-text-outline',
          title: 'Terms of Service',
          subtitle: 'Read our terms of service',
          onPress: () => Alert.alert('Terms of Service', 'Terms of service will be available soon.'),
        })}
        
        {renderMenuItem({
          icon: 'information-circle-outline',
          title: 'About',
          subtitle: 'App version and info',
          onPress: handleAbout,
        })}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => Alert.alert('Logout', 'Logout feature will be available soon!')}
      >
        <Ionicons name="log-out-outline" size={24} color="#FF6B35" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  logoutText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
