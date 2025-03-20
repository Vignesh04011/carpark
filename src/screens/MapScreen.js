import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, latitude: 18.8211, longitude: 73.2705, booked: true, name: "Parking A", address: "Sector 44A, Chembur, Mumbai", spaces: 0, price: 80, rating: 4.5, image: require('../assets/images/ParkingA.png') },
    { id: 2, latitude: 18.8205, longitude: 73.2720, booked: false, name: "Corporate Parking", address: "Main Street, Khalapur", spaces: 50, price: 100, rating: 3.8, image: require('../assets/images/ParkingB.png') },
    { id: 3, latitude: 18.8199, longitude: 73.2715, booked: false, name: "Apartment Parking", address: "Market Road, Khalapur", spaces: 20, price: 70, rating: 4.2, image: require('../assets/images/ParkingA.png') },
    { id: 4, latitude: 18.8220, longitude: 73.2708, booked: true, name: "Parking D", address: "Near Mall, Khalapur", spaces: 0, price: 90, rating: 3.5, image: require('../assets/images/ParkingB.png') },
    { id: 5, latitude: 18.8222, longitude: 73.2723, booked: false, name: "Private Parking", address: "Market Road, Khalapur", spaces: 20, price: 70, rating: 4.2, image: require('../assets/images/ParkingA.png') },
  ]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const navigation = useNavigation();

  const centerLocation = {
    latitude: 18.820721,
    longitude: 73.2710681,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const fetchWishlist = useCallback(async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem('WishlistedParking');
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Alert.alert('Error', 'Unable to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const loadReservedSlots = useCallback(async () => {
    try {
      const bookings = await AsyncStorage.getItem('bookings');
      if (bookings) {
        const parsedBookings = JSON.parse(bookings);
        const now = new Date();

        const activeBookings = parsedBookings.filter((booking) => {
          const checkOutTime = new Date(booking.checkOutTime);
          return checkOutTime > now;
        });

        setParkingSpots((prevSpots) =>
          prevSpots.map((spot) => {
            const reservedSlots = activeBookings
              .filter((booking) => booking.spotId === spot.id)
              .flatMap((booking) => booking.selectedSlots);

            return {
              ...spot,
              booked: reservedSlots.length >= spot.spaces,
            };
          })
        );

        await AsyncStorage.setItem('bookings', JSON.stringify(activeBookings));
      }
    } catch (error) {
      console.error('Error loading reserved slots:', error);
      Alert.alert('Error', 'Unable to load reserved slots. Please try again.');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(loadReservedSlots, 60000);
    loadReservedSlots();
    return () => clearInterval(interval);
  }, [loadReservedSlots]);

  const handleMarkerPress = (spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  const handleBookSlot = () => {
    setModalVisible(false);
    if (selectedSpot) {
      navigation.navigate('SlotSelection', { spot: selectedSpot });
    }
  };

  const toggleWishlist = async (spot) => {
    setWishlistLoading(true);
    try {
      let updatedWishlist;
      if (wishlist.some((item) => item.id === spot.id)) {
        updatedWishlist = wishlist.filter((item) => item.id !== spot.id);
      } else {
        updatedWishlist = [...wishlist, spot];
      }

      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('WishlistedParking', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error updating wishlist:', error);
      Alert.alert('Error', 'Unable to update wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };

  const isWishlisted = (spot) => wishlist.some((item) => item.id === spot.id);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={centerLocation}>
        {parkingSpots.map((spot) => (
          <Marker key={spot.id} coordinate={{ latitude: spot.latitude, longitude: spot.longitude }} onPress={() => handleMarkerPress(spot)}>
            <Image
              source={
                isWishlisted(spot)
                  ? require('../assets/icons/default.png') // Use a different icon for wishlisted spots
                  : spot.booked
                  ? require('../assets/icons/parking-lot1.png')
                  : require('../assets/icons/parking-lot.png')
              }
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image source={require('../assets/icons/about.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            {selectedSpot && (
              <>
                <Image source={selectedSpot.image} style={styles.parkingImage} />
                <Text style={styles.title}>{selectedSpot.name}</Text>
                <Text style={styles.address}>{selectedSpot.address}</Text>
                <Text style={styles.detail}>Spaces Available: {selectedSpot.spaces}</Text>
                <Text style={styles.detail}>Charges Per Hour: ₹{selectedSpot.price}</Text>
                <Text style={styles.detail}>Rating: ⭐ {selectedSpot.rating}</Text>

                <View style={styles.buttonContainer}>
                  {selectedSpot.booked ? (
                    <Text style={styles.soldOutText}>Sold Out</Text>
                  ) : (
                    <TouchableOpacity style={styles.bookButton} onPress={handleBookSlot}>
                      <Text style={styles.bookText}>Book the Slot</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => toggleWishlist(selectedSpot)}
                    style={styles.wishlistButton}
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading ? (
                      <ActivityIndicator size="small" color="red" />
                    ) : (
                      <Image
                        source={
                          isWishlisted(selectedSpot)
                            ? require('../assets/icons/heart-filled.png')
                            : require('../assets/icons/heart-outline.png')
                        }
                        style={styles.heartIcon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  parkingImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  address: { fontSize: 14, color: 'gray', marginBottom: 10 },
  detail: { fontSize: 16, marginBottom: 5 },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bookButton: {
    flex: 0.9,
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bookText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  soldOutText: {
    flex: 0.9,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  wishlistButton: {
    flex: 0.1,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 35,
    height: 35,
    tintColor: 'red',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: '#6200ea',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;