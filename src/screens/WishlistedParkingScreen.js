import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WishlistedParkingScreen = () => {
  const [wishlistedParking, setWishlistedParking] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWishlistedParking();
  }, []);

  const fetchWishlistedParking = async () => {
    const wishlisted = await AsyncStorage.getItem('WishlistedParking');
    setWishlistedParking(wishlisted ? JSON.parse(wishlisted) : []);
  };

  const bookParking = (parking) => {
    navigation.navigate('ConfirmBooking', { spot: parking });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Wishlisted Parking Areas</Text>
      {wishlistedParking.length === 0 ? (
        <Text>No wishlisted parking areas</Text>
      ) : (
        <FlatList
          data={wishlistedParking}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 15, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.location}</Text>
              <Text>Spaces Available: {item.spaces}</Text>
              <Text>Charges Per Hour: ₹{item.price}</Text>
              
              <TouchableOpacity
                style={{
                  backgroundColor: 'purple',
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                onPress={() => bookParking(item)}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Book this Slot</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WishlistedParkingScreen;
