import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const centerLocation = {
    latitude: 18.820721,
    longitude: 73.2710681,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const parkingSpots = [
    {
      id: 1,
      latitude: 18.8211,
      longitude: 73.2705,
      booked: true,
      name: "Parking A",
      address: "Sector 44A, Chembur, Mumbai",
      spaces: 0,
      price: 80,
      rating: 4.5,
      image: require('../assets/images/ParkingA.png'),
    },
    {
      id: 2,
      latitude: 18.8205,
      longitude: 73.2720,
      booked: false,
      name: "Parking B",
      address: "Main Street, Khalapur",
      spaces: 50,
      price: 100,
      rating: 3.8,
      image: require('../assets/images/ParkingB.png'),
    },
    {
      id: 3,
      latitude: 18.8199,
      longitude: 73.2715,
      booked: false,
      name: "Parking C",
      address: "Market Road, Khalapur",
      spaces: 20,
      price: 70,
      rating: 4.2,
      image: require('../assets/images/ParkingA.png'),
    },
    {
      id: 4,
      latitude: 18.8220,
      longitude: 73.2708,
      booked: true,
      name: "Parking D",
      address: "Near Mall, Khalapur",
      spaces: 0,
      price: 90,
      rating: 3.5,
      image: require('../assets/images/ParkingB.png'),
    },
  ];

  const handleMarkerPress = (spot) => {
    setSelectedSpot(spot);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={centerLocation}>
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            onPress={() => handleMarkerPress(spot)}
          >
            <Image
              source={
                spot.booked
                  ? require('../assets/icons/parking-lot1.png')  // Sold Out Icon
                  : require('../assets/icons/parking-lot.png')   // Available Icon
              }
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      {/* Modal for Parking Spot Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            {selectedSpot && (
              <>
                <Image source={selectedSpot.image} style={styles.parkingImage} />
                <Text style={styles.title}>{selectedSpot.name}</Text>
                <Text style={styles.address}>{selectedSpot.address}</Text>
                <Text style={styles.detail}>Space Available: {selectedSpot.spaces}</Text>
                <Text style={styles.detail}>Charges Per Hour: ₹{selectedSpot.price}</Text>
                <Text style={styles.detail}>Rating: ⭐ {selectedSpot.rating}</Text>

                {selectedSpot.booked ? (
                  <Text style={styles.soldOutMessage}>⚠️ This parking is fully booked.</Text>
                ) : (
                  <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.bookText}>Book the Slot</Text>
                  </TouchableOpacity>
                )}
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
  soldOutMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  bookText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default MapScreen;
