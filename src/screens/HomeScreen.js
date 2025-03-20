import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PromotionsBanner from '../components/PromotionsBanner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [recentBooking, setRecentBooking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const fetchRecentBooking = async () => {
      const bookingData = await AsyncStorage.getItem('activeParkingSession');
      if (bookingData) {
        const parsedBooking = JSON.parse(bookingData);
        setRecentBooking(parsedBooking);
        calculateTimeLeft(parsedBooking.checkInTime, parsedBooking.checkOutTime);
      }
    };
    fetchRecentBooking();
  }, []);

  const calculateTimeLeft = (checkInTime, checkOutTime) => {
    const now = new Date();
    const totalDuration = new Date(checkOutTime) - new Date(checkInTime);
    const remainingTime = new Date(checkOutTime) - now;

    if (remainingTime > 0) {
      setTimeLeft(Math.floor(remainingTime / 1000));
      setProgress((remainingTime / totalDuration) * 100);
    } else {
      setTimeLeft(0);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (recentBooking) {
      calculateTimeLeft(recentBooking.checkInTime, recentBooking.checkOutTime);
    }
  }, [recentBooking]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Promotions & Offers */}
      <PromotionsBanner />

      {/* Active Parking Session */}
      {recentBooking && (
        <View style={styles.activeSessionCard}>
          <Image source={require('../assets/icons/parking-area.png')} style={styles.parkingIcon} />
          <View style={styles.details}>
            <Text style={styles.header}>Active Parking Session</Text>
            <Text style={styles.text}><Text style={styles.bold}>📍 Parking Area:</Text> {recentBooking.name}</Text>
            <Text style={styles.text}><Text style={styles.bold}>🚘 Vehicle:</Text> {recentBooking.vehicle}</Text>
            <Text style={styles.text}><Text style={styles.bold}>⏰ Check-in:</Text> {recentBooking.checkInTime}</Text>
            <Text style={styles.text}><Text style={styles.bold}>🕒 Check-out:</Text> {recentBooking.checkOutTime}</Text>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            {/* Time Left */}
            <Text style={[styles.timer, timeLeft > 0 ? styles.activeTime : styles.expiredTime]}>
              ⏳ Time Left: {timeLeft > 0 ? formatTime(timeLeft) : 'Session Expired'}
            </Text>
          </View>
        </View>
      )}

      {/* Subscription Button */}
      <TouchableOpacity 
        style={styles.subscriptionButton} 
        onPress={() => navigation.navigate('Subscription')}>
        <Text style={styles.subscriptionText}>Subscribe Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
  },
  activeSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 5,
  },
  parkingIcon: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  activeTime: {
    color: '#FF5733',
  },
  expiredTime: {
    color: 'red',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ea',
  },

  // Subscription Button
  subscriptionButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  subscriptionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
