import React, { useState, useContext } from 'react'; // Import useState and useContext
import { 
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking, Alert 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletContext } from '../context/WalletContext'; // Import WalletContext
import { useAuth } from '../navigation/AppNavigation'; // Import useAuth

const ProfileScreen = ({ navigation }) => {
  const { balance } = useContext(WalletContext); // Use WalletContext
  const [userData, setUserData] = useState({ username: '', email: '', phone: '' }); // Correct useState usage
  const { logout } = useAuth(); // Use useAuth

  // Fetch user data when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch user data
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData)); // Parse the string back to an object
          }
        } catch (error) {
          console.log("Error fetching user data", error);
          Alert.alert("Error", "Failed to fetch user data. Please try again.");
        }
      };
      fetchData();
    }, [])
  );

  const openWhatsApp = () => {
    const whatsappGroupLink = 'https://chat.whatsapp.com/KXzVe0JrDeF4yx1eLyabrT';
    Linking.canOpenURL(whatsappGroupLink).then((supported) => {
      if (supported) {
        Linking.openURL(whatsappGroupLink);
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device.');
      }
    });
  };

  const handleRateApp = () => {
    navigation.navigate('RateApp');
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: async () => {
            await logout();
            navigation.replace("Login");
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={require('../assets/icons/carpark.png')} style={styles.logo} />
          <View>
            <Text style={styles.userName}>{userData.username}</Text> {/* Display username */}
            <Text style={styles.email}>{userData.email}</Text> {/* Display email */}
            <Text style={styles.phone}>{userData.phone}</Text> {/* Display phone number */}
            <Text style={styles.balance}>₹ {balance.toFixed(2)}</Text> {/* Display wallet balance */}
          </View>
        </View>

        {/* Wallet Actions */}
        <View style={styles.walletActions}>
          <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate('Wallet')}>
            <Image source={require('../assets/icons/rupee.png')} style={styles.icon} />
            <Text style={styles.walletText}>₹ {balance.toFixed(2)}</Text> {/* Display wallet balance */}
            <Text style={styles.actionText}>Add Cash To Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.walletButton} onPress={openWhatsApp}>
            <Image source={require('../assets/icons/help.png')} style={styles.icon} />
            <Text style={styles.actionText}>Get Help</Text>
            <Text style={styles.actionTextSmall}>Solve Issue</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Recent Transactions</Text>
          <Text style={styles.noTransactions}>No recent transactions</Text>
        </View>

        {/* My Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Activity</Text>
          <ProfileItem icon={require('../assets/icons/profile1.png')} text="Profile" onPress={() => navigation.navigate('UserProfile')} />
          <ProfileItem icon={require('../assets/icons/heart.png')} text="Wishlisted Parking" onPress={() => navigation.navigate('WishlistedParking')} />
          <ProfileItem icon={require('../assets/icons/car_icon.jpg')} text="My Vehicles Info" onPress={() => console.log("My Vehicles Info Pressed")} />
          <ProfileItem icon={require('../assets/icons/booking.png')} text="My Bookings" onPress={() => console.log("My Bookings Pressed")} />
          <ProfileItem icon={require('../assets/icons/wallet_1.jpg')} text="See Wallet" onPress={() => navigation.navigate('Wallet')} />
        </View>

        {/* Others Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Others</Text>
          <ProfileItem icon={require('../assets/icons/language.png')} text="Change Language" onPress={() => console.log("Change Language Pressed")} />
          <ProfileItem icon={require('../assets/icons/about.png')} text="About Us" onPress={() => console.log("About Pressed")} />
          <ProfileItem icon={require('../assets/icons/rate.png')} text="Rate App" onPress={handleRateApp} />
          <ProfileItem icon={require('../assets/icons/terms.png')} text="Terms & Conditions" onPress={() => console.log("Terms & Conditions Pressed")} />
          <ProfileItem icon={require('../assets/icons/logout.png')} text="Logout" onPress={handleLogout} />
        </View>

        <Image source={require('../assets/images/footer.png')} style={styles.footerImage} />
      </View>
    </ScrollView>
  );
};

// Reusable Profile Item Component
const ProfileItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={icon} style={styles.itemIcon} />
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  phone: {
    fontSize: 14,
    color: '#888',
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  walletButton: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 3,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footerImage: {
    width: '90%',
    height: 250,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;