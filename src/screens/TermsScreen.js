import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TermsAndConditionsScreen = () => {
  return (
    <LinearGradient colors={['#6A0DAD', '#3700B3']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        

        {/* Screen Title */}
        <Text style={styles.title}>Terms and Conditions</Text>

        {/* Terms and Conditions Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By using the Car Parking app, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use the app.
          </Text>

          <Text style={styles.sectionTitle}>2. Use of the App</Text>
          <Text style={styles.text}>
            The Car Parking app is designed to help users find and manage parking spaces in urban areas. You agree to use the app only for lawful purposes and in accordance with these terms.
          </Text>

          <Text style={styles.sectionTitle}>3. QR Code Scanning</Text>
          <Text style={styles.text}>
            The app uses QR codes for check-in and checkout. You are responsible for ensuring that the QR codes are scanned correctly and that your parking sessions are properly recorded.
          </Text>

          <Text style={styles.sectionTitle}>4. Payments</Text>
          <Text style={styles.text}>
            All payments made through the app are final and non-refundable. You agree to pay the applicable fees for parking services as displayed in the app.
          </Text>

          <Text style={styles.sectionTitle}>5. Privacy</Text>
          <Text style={styles.text}>
            Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.
          </Text>

          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <Text style={styles.text}>
            The Car Parking app is provided "as is" without any warranties. We are not liable for any damages arising from the use of the app, including but not limited to loss of data or parking availability issues.
          </Text>

          <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms and conditions at any time. Your continued use of the app after any changes constitutes your acceptance of the new terms.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50, // Circular logo
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
    lineHeight: 20,
  },
});

export default TermsAndConditionsScreen;