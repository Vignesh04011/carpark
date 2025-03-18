import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation();

  // Default map center
  const centerLocation = {
    latitude: 18.820721,
    longitude: 73.2710681,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // Parking spots data
  const parkingSpots = [
    { id: 1, latitude: 18.8211, longitude: 73.2705, booked: true, name: "Parking A", address: "Sector 44A, Chembur, Mumbai", spaces: 0, price: 80, rating: 4.5, image: require('../assets/images/ParkingA.png') },
    { id: 2, latitude: 18.8205, longitude: 73.2720, booked: false, name: "Parking B", address: "Main Street, Khalapur", spaces: 50, price: 100, rating: 3.8, image: require('../assets/images/ParkingB.png') },
    { id: 3, latitude: 18.8199, longitude: 73.2715, booked: false, name: "Parking C", address: "Market Road, Khalapur", spaces: 20, price: 70, rating: 4.2, image: require('../assets/images/ParkingA.png') },
    { id: 4, latitude: 18.8220, longitude: 73.2708, booked: true, name: "Parking D", address: "Near Mall, Khalapur", spaces: 0, price: 90, rating: 3.5, image: require('../assets/images/ParkingB.png') },
  ];

  // Fetch wishlisted items from AsyncStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      const storedWishlist = await AsyncStorage.getItem('WishlistedParking');
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    };
    fetchWishlist();
  }, []);

  // Handle marker press
  const handleMarkerPress = (spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  // Handle booking slot
  const handleBookSlot = () => {
    setModalVisible(false);
    if (selectedSpot) {
      navigation.navigate('ConfirmBooking', { spot: selectedSpot });
    }
  };

  // Toggle wishlist
  const toggleWishlist = async (spot) => {
    let updatedWishlist;
    if (wishlist.some((item) => item.id === spot.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== spot.id);
    } else {
      updatedWishlist = [...wishlist, spot];
    }

    setWishlist(updatedWishlist);
    await AsyncStorage.setItem('WishlistedParking', JSON.stringify(updatedWishlist));
  };

  // Check if a spot is wishlisted
  const isWishlisted = (spot) => wishlist.some((item) => item.id === spot.id);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={centerLocation}>
        {parkingSpots.map((spot) => (
          <Marker key={spot.id} coordinate={{ latitude: spot.latitude, longitude: spot.longitude }} onPress={() => handleMarkerPress(spot)}>
            <Image source={spot.booked ? require('../assets/icons/parking-lot1.png') : require('../assets/icons/parking-lot.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </Marker>
        ))}
      </MapView>

      {/* Modal for Parking Spot Details */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            {selectedSpot && (
              <>
                <Image source={selectedSpot.image} style={styles.parkingImage} />
                <Text style={styles.title}>{selectedSpot.name}</Text>
                <Text style={styles.address}>{selectedSpot.address}</Text>
                <Text style={styles.detail}>Spaces Available: {selectedSpot.spaces}</Text>
                <Text style={styles.detail}>Charges Per Hour: ₹{selectedSpot.price}</Text>
                <Text style={styles.detail}>Rating: ⭐ {selectedSpot.rating}</Text>

                <View style={styles.buttonContainer}>
                  {/* Book Slot Button (Disabled if fully booked) */}
                  <TouchableOpacity
                    style={[styles.bookButton, selectedSpot.booked && styles.disabledButton]}
                    onPress={handleBookSlot}
                    disabled={selectedSpot.booked}
                  >
                    <Text style={styles.bookText}>{selectedSpot.booked ? "Fully Booked" : "Book the Slot"}</Text>
                  </TouchableOpacity>

                  {/* Wishlist Button */}
                  <TouchableOpacity onPress={() => toggleWishlist(selectedSpot)} style={styles.wishlistButton}>
                    <Image source={isWishlisted(selectedSpot) ? require('../assets/icons/heart-filled.png') : require('../assets/icons/heart-outline.png')} style={styles.heartIcon} />
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
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
});

export default MapScreen;
