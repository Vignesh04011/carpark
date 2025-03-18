import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const parkingIcon = require('../assets/icons/parking.png');
const walletIcon = require('../assets/icons/wallet.png');
const carIcon = require('../assets/icons/car.png');
const clockIcon = require('../assets/icons/clock.png');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Vignesh');
  const services = [
    { id: '1', name: 'NearByParkings', displayName: 'NearBy Parkings', icon: parkingIcon },
    { id: '2', name: 'Wallet', displayName: 'Wallet', icon: walletIcon },
    { id: '3', name: 'MyVehicles', displayName: 'My Vehicles', icon: carIcon },
  ];

  const [timeLeft, setTimeLeft] = useState(4 * 3600);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>Active Parking Session <Text style={styles.activeBadge}>active</Text></Text>
        <Text style={styles.welcomeText}>Welcome {'\n'}<Text style={styles.bold}>{userName}</Text></Text>
        <Text style={styles.uniqueId}>Unique ID:</Text>
        
        <View style={styles.timerRow}>
          <Image source={clockIcon} style={styles.timerIcon} />
          <Text style={styles.timerText}>{timeLeft > 0 ? formatTime(timeLeft) : 'Session Expired'}</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Full Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.servicesHeader}>Services</Text>
      <FlatList
        data={services}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate(item.name)}
            accessibilityLabel={`Navigate to ${item.displayName}`}
          >
            <Image source={item.icon} style={styles.serviceIcon} accessibilityLabel={`${item.displayName} icon`} />
            <Text style={styles.serviceText}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
  sessionCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 12,
  },
  welcomeText: {
    fontSize: 14,
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  uniqueId: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  timerIcon: {
    width: 25,
    height: 25,
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  detailsButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  detailsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  servicesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    alignItems: 'center',
    width: '33%',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  serviceIcon: {
    width: 50,
    height: 50,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
