import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const SettingsScreen = ({ navigation }) => {

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out!") } // Replace with actual logout logic
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "This action is irreversible. Do you want to proceed?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Account deleted!") } // Replace with actual delete logic
    ]);
  };

  return (
    <View style={styles.container}>
      {/* ✅ Back Button Only */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings →</Text>
        <SettingsItem icon={require('../assets/icons/language.png')} text="Change Language" onPress={() => console.log("Change Language Pressed")} />
        <SettingsItem icon={require('../assets/icons/help1.png')} text="Help" onPress={() => console.log("Help Pressed")} />
        <SettingsItem icon={require('../assets/icons/contact.png')} text="Contact Us" onPress={() => console.log("Contact Us Pressed")} />
        <SettingsItem icon={require('../assets/icons/about.png')} text="About Us" onPress={() => console.log("About Us Pressed")} />
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings →</Text>
        <SettingsItem icon={require('../assets/icons/delete.png')} text="Delete Account" onPress={handleDeleteAccount} />
        <SettingsItem icon={require('../assets/icons/logout1.png')} text="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

// Reusable Settings Item
const SettingsItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E9F9', 
    padding: 10,
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start', // Aligns the back button to the left
  },
  backArrow: {
    fontSize: 22,
    color: '#6A0DAD',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingsScreen;
