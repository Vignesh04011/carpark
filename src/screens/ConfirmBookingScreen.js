import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmBookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedSlots, spot } = route.params;

  const [carType, setCarType] = useState('SUV'); // Default car type
  const [numberPlate, setNumberPlate] = useState('');

  // Initialize check-in and check-out times with the current time
  const now = new Date();
  const [checkInTime, setCheckInTime] = useState({
    hours: now.getHours(),
    minutes: now.getMinutes(),
  });
  const [checkOutTime, setCheckOutTime] = useState({
    hours: now.getHours() + 1, // Default check-out time is 1 hour after check-in
    minutes: now.getMinutes(),
  });

  const handleConfirmBooking = async () => {
    if (!carType || !numberPlate) {
      alert('Please fill in all fields.');
      return;
    }

    // Convert check-in and check-out times to Date objects
    const checkInDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      checkInTime.hours,
      checkInTime.minutes
    );
    const checkOutDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      checkOutTime.hours,
      checkOutTime.minutes
    );

    if (checkOutDate <= checkInDate) {
      alert('Check-out time must be after check-in time.');
      return;
    }

    const bookingDetails = {
      spotId: spot.id,
      selectedSlots,
      carType,
      numberPlate, // No uppercase enforcement
      checkInTime: checkInDate.toISOString(),
      checkOutTime: checkOutDate.toISOString(),
    };

    try {
      // Save booking details to AsyncStorage
      const existingBookings = await AsyncStorage.getItem('bookings');
      const updatedBookings = existingBookings ? JSON.parse(existingBookings) : [];
      updatedBookings.push(bookingDetails);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Navigate back to the map or another screen
      navigation.navigate("MainTabs", { screen: "Map" });
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const renderTimePicker = (time, setTime, title) => (
    <View style={styles.timePickerContainer}>
      <Text style={styles.timePickerTitle}>{title}</Text>
      <View style={styles.timePicker}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setTime({ ...time, hours: (time.hours + 1) % 24 })}
        >
          <Text style={styles.timeButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.timeText}>
          {time.hours.toString().padStart(2, '0')}:
          {time.minutes.toString().padStart(2, '0')}
        </Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setTime({ ...time, hours: (time.hours - 1 + 24) % 24 })}
        >
          <Text style={styles.timeButtonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timePicker}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setTime({ ...time, minutes: (time.minutes + 1) % 60 })}
        >
          <Text style={styles.timeButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.timeText}>
          {time.hours.toString().padStart(2, '0')}:
          {time.minutes.toString().padStart(2, '0')}
        </Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setTime({ ...time, minutes: (time.minutes - 1 + 60) % 60 })}
        >
          <Text style={styles.timeButtonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Picker.Item label="Hatchback" value="Hatchback" />0
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
        onChangeText={(text) => {
          console.log('Number Plate Input:', text); // Debugging
          setNumberPlate(text); // No uppercase enforcement
        }}
        maxLength={10} // Optional: Limit the number of characters
      />

      {/* Time Pickers */}
      {renderTimePicker(checkInTime, setCheckInTime, 'Check-In Time')}
      {renderTimePicker(checkOutTime, setCheckOutTime, 'Check-Out Time')}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  timePickerContainer: {
    marginBottom: 20,
  },
  timePickerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  timeButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  timeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmBookingScreen;