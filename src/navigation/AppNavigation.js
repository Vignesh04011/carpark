import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, StyleSheet, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import MapScreen from '../screens/MapScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.navBar,
        }}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Image source={require('../assets/icons/home.png')} style={styles.icon} />
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Image source={require('../assets/icons/wallet.png')} style={styles.icon} />
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Image source={require('../assets/icons/map.png')} style={styles.icon} />
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Bookings" 
          component={BookingScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Image source={require('../assets/icons/bookings.png')} style={styles.icon} />
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.activeTab]}>
                <Image source={require('../assets/icons/profile.png')} style={styles.icon} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    navBar: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      backgroundColor: 'white',
      borderRadius: 30,
      height: 100, // Increase navbar height
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically
      justifyContent: 'space-around', // Space evenly
      paddingBottom: 25, // Adjust padding
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 70, // Increase clickable area
      height: 70,
      borderRadius: 35, // Make it round
    },
    activeTab: {
      backgroundColor: '#E6E6FA',
    },
    icon: {
      width: 55, // Increase icon size
      height: 55,
      resizeMode: 'contain',
    }
  });
  

export default AppNavigation;
