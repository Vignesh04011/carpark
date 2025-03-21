import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AboutScreen = () => {
  const handleVisitWebsite = () => {
    Linking.openURL('https://www.example.com'); // Replace with your website URL
  };

  return (
    <LinearGradient colors={['#6A0DAD', '#3700B3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Name */}
        <Text style={styles.appName}>Car Parking</Text>

        {/* App Description */}
        <Text style={styles.description}>
          Car Parking is a smart solution designed to simplify parking in urban areas. It allows users to check in and check out using QR codes, making parking more efficient and hassle-free. Our mission is to provide a seamless parking experience for everyone.
        </Text>

        {/* Key Features */}
        <Text style={styles.sectionTitle}>Key Features:</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>QR Code Scanning for Check-In/Checkout</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Real-Time Parking Availability</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Secure Payment Integration</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Parking History and Receipts</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Eco-Friendly Parking Solutions</Text>
          </View>
        </View>

        {/* Developer Info */}
        <Text style={styles.sectionTitle}>Developed By:</Text>
        <Text style={styles.developerInfo}>Car Parking Team</Text>
        <Text style={styles.developerInfo}>Contact: support@carparking.com</Text>

        {/* Visit Website Button */}
        <TouchableOpacity style={styles.websiteButton} onPress={handleVisitWebsite}>
          <Text style={styles.websiteButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  developerInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  websiteButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  websiteButtonText: {
    color: '#6A0DAD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;