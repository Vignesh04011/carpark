import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import { View, Text, Image } from 'react-native';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName) => {
  switch (routeName) {
    case 'Home':
      return require('../assets/icons/home.png');
    case 'Wallet':
      return require('../assets/icons/wallet.png');
    case 'Bookings':
      return require('../assets/icons/bookings.png');
    case 'Profile':
      return require('../assets/icons/profile.png');
    case 'Map':
      return require('../assets/icons/map.png');
    default:
      return require('../assets/icons/default.png');
  }
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Image source={getTabIcon(route.name)} style={{ width: size, height: size, tintColor: color }} />
          ),
          tabBarActiveTintColor: '#6d28d9',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Bookings" component={BookingScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;