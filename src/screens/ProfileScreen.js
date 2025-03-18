import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={require('../assets/icons/carpark.png')} style={styles.logo} />
          <View>
            <Text style={styles.userName}>Vignesh</Text>
            <Text style={styles.email}>vigneshvane200@gmail.com</Text>
            <Text style={styles.balance}>₹ 0.0</Text>
          </View>
        </View>

        {/* Wallet Actions */}
        <View style={styles.walletActions}>
          <TouchableOpacity 
            style={styles.walletButton} 
            onPress={() => navigation.navigate('Wallet')}
          >
            <Image source={require('../assets/icons/rupee.png')} style={styles.icon} />
            <Text style={styles.walletText}>₹ 0.0</Text>
            <Text style={styles.actionText}>Add Cash To Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.walletButton}>
            <Image source={require('../assets/icons/help.png')} style={styles.icon} />
            <Text style={styles.actionText}>Get Help</Text>
            <Text style={styles.actionTextSmall}>Solve Issue</Text>
          </TouchableOpacity>
        </View>

        {/* Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Activity</Text>
          <ProfileItem 
            icon={require('../assets/icons/profile1.png')} 
            text="Profile" 
            onPress={() => navigation.navigate('UserProfile')} // Added navigation
          />
          <ProfileItem icon={require('../assets/icons/heart.png')} text="Wishlisted Parking" />
          <ProfileItem icon={require('../assets/icons/car_icon.jpg')} text="My Vehicles Info" />
          <ProfileItem icon={require('../assets/icons/booking.png')} text="My Bookings" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Payments</Text>
          <ProfileItem icon={require('../assets/icons/transaction.png')} text="Transactions" />
          <ProfileItem icon={require('../assets/icons/wallet_1.jpg')} text="See Wallet" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Others</Text>
          <ProfileItem icon={require('../assets/icons/community.png')} text="Community" />
          <ProfileItem icon={require('../assets/icons/setting.png')} text="Setting" />
          <ProfileItem icon={require('../assets/icons/rate.png')} text="Rate App" />
          <ProfileItem icon={require('../assets/icons/terms.png')} text="Terms & Conditions" />
          <ProfileItem icon={require('../assets/icons/logout.png')} text="Logout" />
        </View>

        {/* Footer Image */}
        <View style={styles.footer}>
          <Image source={require('../assets/images/footer.png')} style={styles.footerImage} />
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable Component for Profile Items
const ProfileItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={icon} style={styles.itemIcon} />
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Extra space for the bottom navigation
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
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
  },
  walletButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
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
  actionTextSmall: {
    fontSize: 12,
    color: '#888',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
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
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerImage: {
    width: 500,  
    height: 200, 
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
