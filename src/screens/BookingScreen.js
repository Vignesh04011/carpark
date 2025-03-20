import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, RefreshControl, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);

        // Sort bookings by checkInTime in descending order (latest first)
        const sortedBookings = parsedBookings.sort((a, b) => {
          return new Date(b.checkInTime) - new Date(a.checkInTime);
        });

        setBookings(sortedBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Unable to load bookings. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6200ea']} />
      }
    >
      <Text style={styles.title}>Your Bookings</Text>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingContainer}>
            <Text style={styles.bookingTitle}>Booking ID: {booking.id}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Parking: {booking.spotName}</Text>
              <Text style={styles.detailText}>Vehicle: {booking.carType}</Text>
              <Text style={styles.detailText}>Number Plate: {booking.numberPlate}</Text>
              <Text style={styles.detailText}>Check-In: {new Date(booking.checkInTime).toLocaleTimeString()}</Text>
              <Text style={styles.detailText}>Check-Out: {new Date(booking.checkOutTime).toLocaleTimeString()}</Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <QRCode
                value={booking.qrCodeValue} // Use the saved QR code value
                size={200}
              />
              <Text style={styles.qrText}>Scan this QR code for verification</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noBookingText}>No bookings found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4ecff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ea',
  },
  bookingContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea',
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  qrText: {
    fontSize: 16,
    marginTop: 10,
    color: '#6200ea',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingScreen;