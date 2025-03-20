import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const ConfirmBookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedSlots, spot } = route.params;

  const [carType, setCarType] = useState('SUV');
  const [numberPlate, setNumberPlate] = useState('');
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const [checkInTime, setCheckInTime] = useState(now);
  const [checkOutTime, setCheckOutTime] = useState(new Date(now.getTime() + 60 * 60 * 1000)); // 1 hour later

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const handleConfirmBooking = async () => {
    if (!carType || !numberPlate) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
  
    const numberPlateRegex = /^[A-Z0-9]{6,10}$/i;
    if (!numberPlateRegex.test(numberPlate)) {
      Alert.alert('Validation Error', 'Please enter a valid number plate (6-10 alphanumeric characters).');
      return;
    }
  
    if (checkOutTime <= checkInTime) {
      Alert.alert('Validation Error', 'Check-out time must be after check-in time.');
      return;
    }
  
    setLoading(true);
  
    // Generate a unique ID for the booking
    const bookingId = Math.random().toString(36).substr(2, 9);
  
    const bookingDetails = {
      id: bookingId,
      spotId: spot.id,
      selectedSlots,
      carType,
      numberPlate: numberPlate.toUpperCase(),
      checkInTime: checkInTime.toISOString(),
      checkOutTime: checkOutTime.toISOString(),
      spotName: spot.name,
      qrCodeValue: bookingId, // Use booking ID as QR code value
    };
  
    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      const updatedBookings = existingBookings ? JSON.parse(existingBookings) : [];
      updatedBookings.push(bookingDetails);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
  
      // Navigate to BookingScreen to show all bookings
      navigation.navigate('Booking');
    } catch (error) {
      console.error('Error saving booking:', error);
      Alert.alert('Error', 'An error occurred while saving your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onCheckInTimeChange = (event, selectedDate) => {
    setShowCheckInPicker(false);
    if (selectedDate) {
      setCheckInTime(selectedDate);
    }
  };

  const onCheckOutTimeChange = (event, selectedDate) => {
    setShowCheckOutPicker(false);
    if (selectedDate) {
      setCheckOutTime(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking for {spot.name}</Text>

      {/* Car Type Dropdown */}
      <View style={styles.input}>
        <Picker
          selectedValue={carType}
          onValueChange={(itemValue) => setCarType(itemValue)}
        >
          <Picker.Item label="SUV" value="SUV" />
          <Picker.Item label="Sedan" value="Sedan" />
          <Picker.Item label="Hatchback" value="Hatchback" />
          <Picker.Item label="Crossover" value="Crossover" />
          <Picker.Item label="Coupe" value="Coupe" />
          <Picker.Item label="Convertible" value="Convertible" />
          <Picker.Item label="Pickup Truck" value="Pickup Truck" />
          <Picker.Item label="Jeep" value="Jeep" />
          <Picker.Item label="Minivan" value="Minivan" />
          <Picker.Item label="Station Wagon" value="Station Wagon" />
        </Picker>
      </View>

      {/* Number Plate Input */}
      <TextInput
        style={styles.input}
        placeholder="Number Plate"
        value={numberPlate}
        onChangeText={(text) => setNumberPlate(text)}
        maxLength={10}
        autoCapitalize="characters"
      />

      {/* Check-In Time Picker */}
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowCheckInPicker(true)}
      >
        <Text style={styles.timePickerButtonText}>
          Check-In Time: {checkInTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {/* Check-Out Time Picker */}
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowCheckOutPicker(true)}
      >
        <Text style={styles.timePickerButtonText}>
          Check-Out Time: {checkOutTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {/* Time Pickers */}
      {showCheckInPicker && (
        <DateTimePicker
          value={checkInTime}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onCheckInTimeChange}
        />
      )}
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOutTime}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onCheckOutTimeChange}
        />
      )}

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.confirmButton, loading && styles.disabledButton]}
        onPress={handleConfirmBooking}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        )}
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ea',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  timePickerButtonText: {
    fontSize: 16,
    color: '#6200ea',
  },
  confirmButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmBookingScreen;