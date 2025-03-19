import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Create Authentication Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info or token

  useEffect(() => {
    // Check AsyncStorage for stored user
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData)); // Save user
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user'); // Remove user
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WishlistedParking" component={WishlistedParkingScreen} options={{ headerTitle: 'Wishlisted Parking' }} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const tabBarIcon = (icon) => ({ focused }) => (
  <View style={styles.iconContainer}>
    <Image
      source={icon}
      style={{
        width: 50,
        height: 50,
        bottom: -20,
        tintColor: focused ? '#4A90E2' : '#B0B0B0',
      }}
    />
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tabBarIcon(require('../assets/icons/home.png')) }} />
    <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarIcon: tabBarIcon(require('../assets/icons/wallet.png')) }} />
    <Tab.Screen name="Map" component={MapScreen} options={{ tabBarIcon: tabBarIcon(require('../assets/icons/map.png')) }} />
    <Tab.Screen name="Bookings" component={BookingScreen} options={{ tabBarIcon: tabBarIcon(require('../assets/icons/bookings.png')) }} />
    <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarIcon: tabBarIcon(require('../assets/icons/profile.png')) }} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
    <Stack.Screen name="Main" component={MainTabs} options={{ gestureEnabled: false }} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    height: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

// Wrap with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
