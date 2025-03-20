import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library

const MAX_SELECTABLE_SLOTS = 5;

const SlotSelectionScreen = ({ route }) => {
  const { spot } = route.params;
  const navigation = useNavigation();
  const [slots, setSlots] = useState(
    Array.from({ length: spot.spaces || 20 }, (_, index) => ({
      id: index + 1,
      reserved: false,
      selected: false,
    }))
  );
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  const reservedSlotsRef = useRef(new Set());

  useEffect(() => {
    const loadReservedSlots = async () => {
      try {
        const bookings = await AsyncStorage.getItem('bookings');
        if (bookings) {
          const parsedBookings = JSON.parse(bookings);
          const now = new Date();

          const activeBookings = parsedBookings.filter((booking) => {
            const checkOutTime = new Date(booking.checkOutTime);
            return checkOutTime > now;
          });

          const reservedSlots = new Set(
            activeBookings
              .filter((booking) => booking.spotId === spot.id)
              .flatMap((booking) => booking.selectedSlots)
          );

          reservedSlotsRef.current = reservedSlots;

          setSlots((prevSlots) =>
            prevSlots.map((slot) => ({
              ...slot,
              reserved: reservedSlots.has(slot.id),
            }))
          );
        }
      } catch (error) {
        console.error('Error loading reserved slots:', error);
        Alert.alert('Error', 'Failed to load slot availability.');
      } finally {
        setLoading(false);
      }
    };

    loadReservedSlots();
  }, [spot.id]);

  const handleSlotSelection = (id) => {
    const selectedSlotsCount = slots.filter((slot) => slot.selected).length;
    const targetSlot = slots.find((slot) => slot.id === id);

    if (selectedSlotsCount >= MAX_SELECTABLE_SLOTS && !targetSlot.selected) {
      Alert.alert(`Limit Reached`, `You can select up to ${MAX_SELECTABLE_SLOTS} slots.`);
      return;
    }

    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, selected: !slot.selected } : slot
      )
    );
  };

  const handleConfirmSelection = async () => {
    const selectedSlots = slots.filter((slot) => slot.selected).map((slot) => slot.id);

    if (selectedSlots.length === 0) {
      Alert.alert('No Slots Selected', 'Please select at least one slot.');
      return;
    }

    setConfirming(true);

    try {
      await AsyncStorage.setItem(`selectedSlots_${spot.id}`, JSON.stringify(selectedSlots));
      navigation.navigate('ConfirmBooking', { selectedSlots, spot });
    } catch (error) {
      console.error('Error saving slots:', error);
      Alert.alert('Error', 'Failed to save your selection. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Split slots into two columns dynamically
  const chunkedSlots = [];
  for (let i = 0; i < slots.length; i += Math.ceil(slots.length / 2)) {
    chunkedSlots.push(slots.slice(i, i + Math.ceil(slots.length / 2)));
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back" size={24} color="#6200ea" />
      </TouchableOpacity>

      <Text style={styles.title}>Select Slots for {spot.name}</Text>

      {/* Slot Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.availableSlot]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.reservedSlot]} />
          <Text style={styles.legendText}>Reserved</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.selectedSlot]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
      </View>

      <Text style={styles.slotLimitText}>Maximum {MAX_SELECTABLE_SLOTS} slots per booking.</Text>

      {/* Slots Grid */}
      <View style={styles.slotsContainer}>
        {chunkedSlots.map((column, columnIndex) => (
          <View key={columnIndex} style={styles.column}>
            {column.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slot,
                  slot.reserved 
                    ? styles.reservedSlot 
                    : slot.selected 
                    ? styles.selectedSlot 
                    : styles.availableSlot,
                ]}
                onPress={() => !slot.reserved && handleSlotSelection(slot.id)}
                disabled={slot.reserved}
                accessibilityLabel={`Slot ${slot.id} (${slot.reserved ? 'Reserved' : 'Available'})`}
              >
                <Text style={[
                  styles.slotText,
                  slot.reserved && styles.reservedSlotText
                ]}>
                  {slot.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.confirmButton, confirming && styles.disabledButton]}
        onPress={handleConfirmSelection}
        disabled={confirming}
      >
        {confirming ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirm Selection</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Define the styles object
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  slot: {
    width: Dimensions.get('window').width * 0.4, // Responsive width
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  availableSlot: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  reservedSlot: {
    backgroundColor: 'red', // Booked slots are red
    opacity: 0.8,
  },
  selectedSlot: {
    backgroundColor: '#ffeb3b', // Selected slots are yellow
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservedSlotText: {
    color: 'white', // Text color for reserved slots
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
  slotLimitText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#6200ea',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});

export default SlotSelectionScreen;