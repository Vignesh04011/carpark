import React, { useState, useEffect } from 'react';
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
  const [walletBalance, setWalletBalance] = useState(0);

  const now = new Date();
  const [checkInTime, setCheckInTime] = useState(now);
  const [checkOutTime, setCheckOutTime] = useState(new Date(now.getTime() + 60 * 60 * 1000)); // 1 hour later

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  // Fetch wallet balance when the component mounts
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const balance = await AsyncStorage.getItem('walletBalance');
        if (balance) {
          setWalletBalance(parseFloat(balance));
        }
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, []);

  const calculateDuration = (start, end) => {
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return Math.ceil(durationInHours); // Round up to the nearest hour
  };

  const calculateCost = (slots, duration) => {
    const costPerSlotPerHour = 50; // ₹50 per slot per hour
    return slots.length * duration * costPerSlotPerHour;
  };

  const validateInputs = () => {
    if (!carType || !numberPlate.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }

    const numberPlateRegex = /^[A-Z0-9]{6,10}$/i;
    if (!numberPlateRegex.test(numberPlate.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid number plate (6-10 alphanumeric characters).');
      return false;
    }

    if (checkOutTime <= checkInTime) {
      Alert.alert('Validation Error', 'Check-out time must be after check-in time.');
      return false;
    }

    return true;
  };

  const deductFromWallet = async (amount) => {
    try {
      if (walletBalance < amount) {
        Alert.alert('Insufficient Balance', 'You do not have enough funds in your wallet.');
        return false;
      }

      const newBalance = walletBalance - amount;
      await AsyncStorage.setItem('walletBalance', newBalance.toString());
      setWalletBalance(newBalance); // Update state with new balance
      return true;
    } catch (error) {
      console.error('Error deducting from wallet:', error);
      Alert.alert('Error', 'An error occurred while deducting funds. Please try again.');
      return false;
    }
  };

  const handleConfirmBooking = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    const bookingId = Math.random().toString(36).substr(2, 9);
    const duration = calculateDuration(checkInTime, checkOutTime);
    const bookingCost = calculateCost(selectedSlots, duration);

    const bookingDetails = {
      id: bookingId,
      spotId: spot.id,
      selectedSlots,
      carType,
      numberPlate: numberPlate.toUpperCase(),
      checkInTime: checkInTime.toISOString(),
      checkOutTime: checkOutTime.toISOString(),
      spotName: spot.name,
      qrCodeValue: bookingId,
      cost: bookingCost,
    };

    try {
      // Save the booking details first
      const existingBookings = await AsyncStorage.getItem('bookings');
      const updatedBookings = existingBookings ? JSON.parse(existingBookings) : [];
      updatedBookings.push(bookingDetails);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Deduct money from the wallet after successful booking
      const deductionSuccess = await deductFromWallet(bookingCost);
      if (deductionSuccess) {
        // Navigate to the booking confirmation screen with QR code
        navigation.navigate('Booking', { bookingDetails });
        Alert.alert('Success', `Booking confirmed! ₹${bookingCost} deducted from your wallet.`);
      }
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

  // Helper function to format time in 24-hour format
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking for {spot.name}</Text>

      {/* Display Wallet Balance */}
      <Text style={styles.walletBalance}>Wallet Balance: ₹{walletBalance.toFixed(2)}</Text>

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
          Check-In Time: {formatTime(checkInTime)}
        </Text>
      </TouchableOpacity>

      {/* Check-Out Time Picker */}
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowCheckOutPicker(true)}
      >
        <Text style={styles.timePickerButtonText}>
          Check-Out Time: {formatTime(checkOutTime)}
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
  walletBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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