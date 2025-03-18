import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings from AsyncStorage
  const fetchBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Refresh bookings every time screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>

      {bookings.length === 0 ? (
        <Text style={styles.noBookings}>No bookings found</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <Text style={styles.title}>Parking: {item?.name || 'N/A'}</Text>
              <Text>Vehicle: {item?.vehicle || 'N/A'}</Text>
              <Text>Check-in: {item?.checkInTime || 'N/A'}</Text>
              <Text>Check-out: {item?.checkOutTime || 'N/A'}</Text>
              <Text>Amount Paid: ₹{item?.price || 'N/A'}</Text>

              {/* QR Code with better styling */}
              <View style={styles.qrContainer}>
                <QRCode value={JSON.stringify(item)} size={120} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4ecff', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#6200ea', marginBottom: 10, textAlign: 'center' },
  noBookings: { fontSize: 18, textAlign: 'center', marginTop: 20 },
  bookingCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  qrContainer: { alignItems: 'center', marginTop: 10 }, // Center QR code
});

export default BookingScreen;
