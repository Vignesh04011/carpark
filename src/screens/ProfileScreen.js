import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking, Alert 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Fetch wallet balance when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchWalletBalance = async () => {
        try {
          const balance = await AsyncStorage.getItem('walletBalance');
          setWalletBalance(balance ? parseFloat(balance) : 0);
        } catch (error) {
          console.log("Error fetching wallet balance", error);
        }
      };
      fetchWalletBalance();
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={require('../assets/icons/carpark.png')} style={styles.logo} />
          <View>
            <Text style={styles.userName}>Vignesh</Text>
            <Text style={styles.email}>vigneshvane200@gmail.com</Text>
            <Text style={styles.balance}>₹ {walletBalance.toFixed(2)}</Text>
          </View>
        </View>

        {/* Wallet Actions */}
        <View style={styles.walletActions}>
          <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate('Wallet')}>
            <Image source={require('../assets/icons/rupee.png')} style={styles.icon} />
            <Text style={styles.walletText}>₹ {walletBalance.toFixed(2)}</Text>
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
          {transactions.length === 0 ? (
            <Text style={styles.noTransactions}>No recent transactions</Text>
          ) : (
            transactions.map((transaction, index) => (
              <Text key={index} style={styles.transactionItem}>{transaction}</Text>
            ))
          )}
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
          <ProfileItem icon={require('../assets/icons/setting.png')} text="Settings" onPress={() => navigation.navigate('Settings')} />
          <ProfileItem icon={require('../assets/icons/rate.png')} text="Rate App" onPress={() => console.log("Rate App Pressed")} />
          <ProfileItem icon={require('../assets/icons/terms.png')} text="Terms & Conditions" onPress={() => console.log("Terms & Conditions Pressed")} />
          
        </View>

        {/* Footer Image */}
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
    paddingBottom: 130,
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
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  walletButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  walletText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6A0DAD',
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
  noTransactions: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
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
