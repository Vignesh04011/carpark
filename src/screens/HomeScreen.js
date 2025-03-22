import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import PromotionsBanner from '../components/PromotionsBanner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [latestBooking, setLatestBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const buttonScale = new Animated.Value(1);

  const fetchLatestBooking = async () => {
    try {
      const bookingData = await AsyncStorage.getItem('latestBooking');
      if (bookingData) {
        const parsedBooking = JSON.parse(bookingData);
        setLatestBooking(parsedBooking);
      }
    } catch (error) {
      console.error('Error fetching latest booking:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLatestBooking();
    }, [])
  );

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={true}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={['#6200ea', '#3700b3']} style={styles.headerContainer}>
        <Text style={styles.headerText}>CarPark</Text>
      </LinearGradient>

      <PromotionsBanner />

      {latestBooking ? (
        <View style={styles.activeSessionCard}>
          <Text style={styles.sessionHeader}>Active Parking Session</Text>
          <View style={styles.qrContainer}>
            <QRCode value={latestBooking.qrCodeValue} size={200} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Parking Area:</Text> {latestBooking.spotName}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Vehicle:</Text> {latestBooking.carType}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Number Plate:</Text> {latestBooking.numberPlate}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Check-in:</Text> {new Date(latestBooking.checkInTime).toLocaleString()}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Check-out:</Text> {new Date(latestBooking.checkOutTime).toLocaleString()}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noBookingText}>No active parking session.</Text>
      )}

      {/* Buttons with Advanced Styling */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonScrollContainer}
      >
        <GradientButton
          text="Subscribe Now"
          onPress={() => navigation.navigate('Subscription')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          scale={buttonScale}
        />
        <GradientButton
          text="EV Station"
          onPress={() => navigation.navigate('EVStation')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          scale={buttonScale}
        />
        <GradientButton
          text="Enter Vehicle Number"
          onPress={() => navigation.navigate('EnterVehicleScreen')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          scale={buttonScale}
        />
      </ScrollView>
    </ScrollView>
  );
};

const GradientButton = ({ text, onPress, onPressIn, onPressOut, scale }) => (
  <Animated.View style={{ transform: [{ scale }] }}>
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#6200ea', '#3700b3']}
        style={styles.gradientButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activeSessionCard: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  sessionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  qrContainer: {
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  noBookingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonScrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  gradientButton: {
    width: 160,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;