import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert 
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0.00);
  const [amount, setAmount] = useState('');
  const [walletHistory, setWalletHistory] = useState([]);

  // Fetch stored balance and history
  useEffect(() => {
    const fetchData = async () => {
      const storedBalance = await AsyncStorage.getItem('walletBalance');
      const storedHistory = await AsyncStorage.getItem('walletHistory');
      
      if (storedBalance) setBalance(parseFloat(storedBalance));
      if (storedHistory) setWalletHistory(JSON.parse(storedHistory));
    };
    fetchData();
  }, []);

  // Function to handle Razorpay payment
  const handlePayment = async () => {
    const enteredAmount = parseFloat(amount);
    if (isNaN(enteredAmount) || enteredAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    const options = {
      description: 'Wallet Top-Up',
      currency: 'INR',
      amount: enteredAmount * 100,
      key: 'your_razorpay_api_key', 
      name: 'Parking App',
      prefill: {
        email: 'vigneshvane200@gmail.com',
        contact: '9999999999',
        name: 'Vignesh',
      },
      theme: { color: '#6A0DAD' },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        Alert.alert('Payment Successful', `Transaction ID: ${data.razorpay_payment_id}`);

        const newBalance = balance + enteredAmount;
        const newTransaction = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          type: 'Credit',
          amount: `₹${enteredAmount.toFixed(2)}`,
          note: 'Wallet Top-Up',
        };

        const updatedHistory = [newTransaction, ...walletHistory];

        // Store data in AsyncStorage
        await AsyncStorage.setItem('walletBalance', newBalance.toString());
        await AsyncStorage.setItem('walletHistory', JSON.stringify(updatedHistory));

        setBalance(newBalance);
        setWalletHistory(updatedHistory);
        setAmount('');
      })
      .catch((error) => {
        Alert.alert('Payment Failed', error.description);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add To Wallet</Text>

      <Image source={require('../assets/images/credit_cards.png')} style={styles.walletImage} />

      <Text style={styles.balanceText}>Balance: ₹{balance.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="₹ Enter Amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Make Payment</Text>
      </TouchableOpacity>

      <Text style={styles.historyHeader}>Wallet History</Text>
      <FlatList
        data={walletHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyType}>{item.type}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>
            <Text style={styles.historyNote}>{item.note}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 20 },
  headerText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  walletImage: { width: '100%', height: 100, resizeMode: 'contain', alignSelf: 'center' },
  balanceText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#888', borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: '#FFF' },
  paymentButton: { backgroundColor: '#6A0DAD', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  paymentButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  historyHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  historyItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  historyDate: { fontSize: 14, fontWeight: 'bold' },
  historyType: { fontSize: 14, color: 'green' },
  historyAmount: { fontSize: 16, fontWeight: 'bold', color: '#6A0DAD' },
  historyNote: { fontSize: 12, color: '#888' },
});

export default WalletScreen;
