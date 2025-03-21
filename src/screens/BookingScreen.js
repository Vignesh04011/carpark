import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
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

        // Save the latest booking to AsyncStorage
        if (sortedBookings.length > 0) {
          await AsyncStorage.setItem('latestBooking', JSON.stringify(sortedBookings[0]));
        }
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

  const handleNewBooking = async () => {
    const newBooking = {
      id: `booking-${Math.random().toString(36).substr(2, 9)}`, // Generate a unique ID
      spotName: 'Apartment Parking',
      carType: 'SUV',
      numberPlate: 'MH03BH5467',
      checkInTime: new Date().toISOString(),
      checkOutTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
      qrCodeValue: JSON.stringify({ bookingId: `booking-${Math.random().toString(36).substr(2, 9)}` }), // Store JSON data in QR code
    };

    try {
      const updatedBookings = [newBooking, ...bookings];
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);

      // Save the latest booking to AsyncStorage
      await AsyncStorage.setItem('latestBooking', JSON.stringify(newBooking));
      Alert.alert('Success', 'New booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    }
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
              <Text style={styles.detailText}>Check-In: {new Date(booking.checkInTime).toLocaleString()}</Text>
              <Text style={styles.detailText}>Check-Out: {new Date(booking.checkOutTime).toLocaleString()}</Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <QRCode
                value={booking.qrCodeValue} // Use the saved JSON QR code value
                size={200}
              />
              <Text style={styles.qrText}>Scan this QR code for verification</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noBookingText}>No bookings found.</Text>
      )}

      {/* Button to create a new booking */}
      <TouchableOpacity style={styles.newBookingButton} onPress={handleNewBooking}>
        <Text style={styles.newBookingButtonText}>Create New Booking</Text>
      </TouchableOpacity>
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
  newBookingButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newBookingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
