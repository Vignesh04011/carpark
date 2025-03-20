import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PromotionsBanner from '../components/PromotionsBanner';
import LinearGradient from 'react-native-linear-gradient';

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
    return `${hrs.toString().padStart(2, '0')}hr : ${mins.toString().padStart(2, '0')}min`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#6200ea', '#3700b3']}
        style={styles.headerContainer}
      >
        <Text style={styles.headerText}>CarPark</Text>
      </LinearGradient>

      {/* Promotions & Offers */}
      <PromotionsBanner />

      {/* Active Parking Session */}
      {recentBooking && (
        <View style={styles.activeSessionCard}>
          <Image source={require('../assets/icons/parking-area.png')} style={styles.parkingIcon} />
          <View style={styles.details}>
            <Text style={styles.sessionHeader}>Active Parking Session</Text>
            <Text style={styles.text}><Text style={styles.bold}>📍 Parking Area:</Text> {recentBooking.name}</Text>
            <Text style={styles.text}><Text style={styles.bold}>🚘 Vehicle:</Text> {recentBooking.vehicle}</Text>
            <Text style={styles.text}><Text style={styles.bold}>⏰ Check-in:</Text> {recentBooking.checkInTime}</Text>
            <Text style={styles.text}><Text style={styles.bold}>🕒 Check-out:</Text> {recentBooking.checkOutTime}</Text>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            {/* Time Remaining */}
            <View style={styles.timeRemainingContainer}>
              <Text style={styles.timeRemainingText}>
                ⏳ Time Remaining: {timeLeft > 0 ? formatTime(timeLeft) : 'Session Expired'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Subscription Button with Gradient */}
      <TouchableOpacity 
        style={styles.subscriptionButton} 
        onPress={() => navigation.navigate('Subscription')}>
        <LinearGradient
          colors={['#6200ea', '#3700b3']}
          style={styles.gradientButton}
        >
          <Text style={styles.subscriptionText}>Subscribe Now</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* EV Station Button with Gradient */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EVStation')}
        >
          <LinearGradient
            colors={['#4A90E2', '#1E90FF']}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>EV Station</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    paddingTop: 10,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activeSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 15,
    marginTop:15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  parkingIcon: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  sessionHeader: {
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
  timeRemainingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  timeRemainingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  subscriptionButton: {
    margin: 40,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  subscriptionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  button: {
    width: '60%',
    borderRadius: 45,
    overflow: 'hidden',
    elevation: 10,
    marginBottom: 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;