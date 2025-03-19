import React, { createContext, useState, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import MapScreen from '../screens/MapScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WishlistedParkingScreen from '../screens/WishlistedParkingScreen';

// Wallet Context
const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WishlistedParking" component={WishlistedParkingScreen} options={{ headerTitle: 'Wishlisted Parking' }} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

// Custom Tab Icons
const tabBarIcon = (icon) => ({ focused }) => (
  <Image
    source={icon}
    style={{ width: 60, height: 60, tintColor: focused ? '#00008B' : '#D3D3D3' }}
  />
);

// Custom Tab Bar
const CustomTabBarStyle = {
  position: 'absolute',
  bottom: 10,
  left: 20,
  right: 20,
  backgroundColor: 'white',
  borderRadius: 30,
  height: 70,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 5,
};

// Main Tab Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: CustomTabBarStyle,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ tabBarIcon: tabBarIcon(require('../assets/icons/home.png')) }} 
    />
    <Tab.Screen 
      name="Wallet" 
      component={WalletScreen} 
      options={{ tabBarIcon: tabBarIcon(require('../assets/icons/wallet.png')) }} 
    />
    <Tab.Screen 
      name="Map" 
      component={MapScreen} 
      options={{ tabBarIcon: tabBarIcon(require('../assets/icons/map.png')) }} 
    />
    <Tab.Screen 
      name="Bookings" 
      component={BookingScreen} 
      options={{ tabBarIcon: tabBarIcon(require('../assets/icons/bookings.png')) }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStack} 
      options={{ tabBarIcon: tabBarIcon(require('../assets/icons/profile.png')) }} 
    />
  </Tab.Navigator>
);

// Auth Stack (Login + Register)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
    <Stack.Screen name="Main" component={MainTabs} options={{ gestureEnabled: false }} />
  </Stack.Navigator>
);

// Main Navigation Stack
const AppNavigation = () => {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
};

export default AppNavigation;