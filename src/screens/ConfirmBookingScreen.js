import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const ConfirmBookingScreen = ({ route, navigation }) => {
  const { spot } = route.params;
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [qrData, setQrData] = useState('');

  const vehicles = ['Car', 'Bike', 'SUV', 'Truck'];

  const handleBooking = async () => {
    if (!selectedVehicle) {
      Alert.alert("Select a vehicle", "Please choose a vehicle before confirming.");
      return;
    }

    try {
      const bookingDetails = {
        id: Date.now(),
        name: spot.name,
        address: spot.address,
        price: spot.price,
        checkInTime: checkInTime.toLocaleTimeString(),
        checkOutTime: checkOutTime.toLocaleTimeString(),
        vehicle: selectedVehicle,
      };

      let storedBookings = await AsyncStorage.getItem('bookings');
      storedBookings = storedBookings ? JSON.parse(storedBookings) : [];

      // ✅ Add new booking at the beginning
      storedBookings = [bookingDetails, ...storedBookings];

      await AsyncStorage.setItem('bookings', JSON.stringify(storedBookings));

      // ✅ Update active parking session with the latest booking
      await AsyncStorage.setItem('activeParkingSession', JSON.stringify(bookingDetails));

      setQrData(JSON.stringify(bookingDetails)); // Generate QR Code
      Alert.alert("Success", "Booking confirmed!");
      navigation.navigate('Bookings'); // Navigate to Booking History Screen
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Booking failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Parking Slot</Text>
      <Image source={require('../assets/images/confirm_booking.jpg')} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.detail}><Text style={styles.bold}>Parking Area:</Text> {spot.name}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Available Slots:</Text> {spot.spaces}</Text>

        {/* Vehicle Picker */}
        <Text style={styles.detail}><Text style={styles.bold}>Choose Vehicle:</Text></Text>
        <Picker
          selectedValue={selectedVehicle}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
        >
          <Picker.Item label="Select Vehicle" value="" />
          {vehicles.map((vehicle, index) => (
            <Picker.Item key={index} label={vehicle} value={vehicle} />
          ))}
        </Picker>

        {/* Check-in Time Picker */}
        <Text style={styles.detail}><Text style={styles.bold}>Check-in Time:</Text></Text>
        <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={styles.timeButton}>
          <Text style={styles.timeText}>{checkInTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showCheckInPicker && (
          <DateTimePicker
            value={checkInTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(event, selectedTime) => {
              setShowCheckInPicker(false);
              if (selectedTime) setCheckInTime(selectedTime);
            }}
          />
        )}

        {/* Check-out Time Picker */}
        <Text style={styles.detail}><Text style={styles.bold}>Check-out Time:</Text></Text>
        <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={styles.timeButton}>
          <Text style={styles.timeText}>{checkOutTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showCheckOutPicker && (
          <DateTimePicker
            value={checkOutTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(event, selectedTime) => {
              setShowCheckOutPicker(false);
              if (selectedTime) setCheckOutTime(selectedTime);
            }}
          />
        )}

        <Text style={styles.detail}>
          <Text style={styles.bold}>Amount Paid:</Text> ₹{spot.price} per hour
        </Text>
      </View>

      {qrData ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrData} size={150} />
          <Text>Scan this QR code at the entry</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4ecff', alignItems: 'center', paddingTop: 20 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#6200ea', marginBottom: 10 },
  image: { width: 250, height: 150, resizeMode: 'contain', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, width: '90%', shadowColor: '#000', shadowOpacity: 0.2, elevation: 5 },
  detail: { fontSize: 16, marginVertical: 5 },
  bold: { fontWeight: 'bold' },
  picker: { height: 50, width: '100%', backgroundColor: '#f2f2f2', borderRadius: 5, marginBottom: 10 },
  timeButton: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 5 },
  timeText: { fontSize: 16 },
  button: { backgroundColor: '#6200ea', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, width: '90%' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  qrContainer: { alignItems: 'center', marginTop: 20 }
});

export default ConfirmBookingScreen;
