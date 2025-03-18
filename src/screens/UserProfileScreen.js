import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>User Profile</Text>

      <Image source={require('../assets/icons/profile.png')} style={styles.profileImage} />
      <Text style={styles.label}>Full Name</Text>
      <Text style={styles.value}>Vignesh</Text>

      <Text style={styles.label}>Email Address</Text>
      <Text style={styles.value}>vigneshvane200@gmail.com</Text>

      <Text style={styles.label}>Phone Number</Text>
      <Text style={styles.value}>+91 XXXXXXXXXX</Text>

      <Text style={styles.label}>Parking Slots</Text>
      <Text style={styles.value}>2 Slots</Text>

      <Text style={styles.label}>Per Hour Rent Charges</Text>
      <Text style={styles.value}>₹ 50/hr</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#6A0DAD',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UserProfileScreen;
