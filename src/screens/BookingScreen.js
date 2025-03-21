import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import PromotionsBanner from '../components/PromotionsBanner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [latestBooking, setLatestBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestBooking = async () => {
    try {
      const bookingData = await AsyncStorage.getItem('latestBooking');
      if (bookingData) {
        const parsedBooking = JSON.parse(bookingData);
        setLatestBooking(parsedBooking);
      }
    } catch (error) {
      console.error('Error fetching latest booking:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLatestBooking();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#6200ea', '#3700b3']} style={styles.headerContainer}>
        <Text style={styles.headerText}>CarPark</Text>
      </LinearGradient>

      <PromotionsBanner />

      {latestBooking ? (
        <View style={styles.activeSessionCard}>
          <Text style={styles.sessionHeader}>Active Parking Session</Text>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <QRCode value={latestBooking.qrCodeValue} size={150} />
          </View>

          {/* Number Plate Below QR Code */}
          <Text style={[styles.text, styles.numberPlateText]}>
            <Text style={styles.bold}>Number Plate:</Text> {latestBooking.numberPlate}
          </Text>

          {/* Parking Details */}
          <View style={styles.textContainer}>
            <Text style={styles.text}><Text style={styles.bold}>Parking Area:</Text> {latestBooking.spotName}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Vehicle:</Text> {latestBooking.carType}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Check-in:</Text> {new Date(latestBooking.checkInTime).toLocaleString()}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Check-out:</Text> {new Date(latestBooking.checkOutTime).toLocaleString()}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noBookingText}>No active parking session.</Text>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <GradientButton text="Subscribe Now" onPress={() => navigation.navigate('Subscription')} />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton text="EV Station" onPress={() => navigation.navigate('EVStation')} />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton text="Enter Vehicle Number" onPress={() => navigation.navigate('EnterVehicleScreen')} />
      </View>
    </ScrollView>
  );
};

const GradientButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.gradientButton}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    paddingTop: 10,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activeSessionCard: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center', // Centering QR Code
  },
  sessionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 10, // Space between QR Code and Number Plate
  },
  numberPlateText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 10, // Spacing between Number Plate and other details
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  noBookingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  gradientButton: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
