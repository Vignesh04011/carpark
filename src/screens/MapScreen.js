import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const centerLocation = {
    latitude: 18.820721,
    longitude: 73.2710681,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // Parking Spots (Manually set availability)
  const parkingSpots = [
    { id: 1, latitude: 18.8211, longitude: 73.2705, booked: false }, // Available
    { id: 2, latitude: 18.8205, longitude: 73.2720, booked: true },  // Booked
    { id: 3, latitude: 18.8199, longitude: 73.2715, booked: false }, // Available
    { id: 4, latitude: 18.8220, longitude: 73.2708, booked: true },  // Booked
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={centerLocation}>
        {/* Render Parking Spots */}
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
          >
            <Image
              source={
                spot.booked
                  ? require('../assets/icons/parking-lot1.png')  // Booked Spot Icon
                  : require('../assets/icons/parking-lot.png') // Available Spot Icon
              }
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

export default MapScreen;
