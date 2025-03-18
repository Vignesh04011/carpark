import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import MapScreen from '../screens/MapScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen} 
        options={{ headerShown: true }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          headerTitle: '',  
          headerBackTitleVisible: false,
          headerTransparent: true,
        }} 
      />
    </Stack.Navigator>
  );
};

const TabIcon = ({ source, focused }) => (
  <View style={[styles.iconContainer, focused && styles.activeTab]}>
    <Image source={source} style={styles.icon} />
  </View>
);

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
            tabBarIcon: ({ focused }) => <TabIcon source={require('../assets/icons/home.png')} focused={focused} />,
          }}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen} 
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={require('../assets/icons/wallet.png')} focused={focused} />,
          }}
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={require('../assets/icons/map.png')} focused={focused} />,
          }}
        />
        <Tab.Screen 
          name="Bookings" 
          component={BookingScreen} 
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={require('../assets/icons/bookings.png')} focused={focused} />,
          }}
        />
        <Tab.Screen 
          name="Profile"
          component={ProfileStack}  // ✅ FIXED: Pass component directly
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={require('../assets/icons/profile.png')} focused={focused} />,
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
    height: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 25,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  activeTab: {
    backgroundColor: '#E6E6FA',
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  }
});

export default AppNavigation;
