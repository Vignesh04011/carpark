import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0.00);
  const [amount, setAmount] = useState('');
  const [walletHistory, setWalletHistory] = useState([]);

  // Fetch wallet balance and history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('walletBalance');
        const storedHistory = await AsyncStorage.getItem('walletHistory');
        
        if (storedBalance) {
          setBalance(parseFloat(storedBalance));
          console.log('Fetched Wallet Balance:', storedBalance); // Debugging
        }
        if (storedHistory) {
          setWalletHistory(JSON.parse(storedHistory));
          console.log('Fetched Wallet History:', storedHistory); // Debugging
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        Alert.alert('Error', 'Failed to fetch wallet data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleFakeTransaction = async () => {
    const enteredAmount = parseFloat(amount);
    if (isNaN(enteredAmount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid number.');
      return;
    }
    if (enteredAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter an amount greater than 0.');
      return;
    }

    const newBalance = balance + enteredAmount;
    const newTransaction = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      type: 'Credit',
      amount: `₹${enteredAmount.toFixed(2)}`,
      note: 'Fake Wallet Top-Up',
    };

    const updatedHistory = [newTransaction, ...walletHistory.slice(0, 49)]; // Limit history to 50 entries

    try {
      await AsyncStorage.setItem('walletBalance', newBalance.toString());
      await AsyncStorage.setItem('walletHistory', JSON.stringify(updatedHistory)); // Fixed typo here

      setBalance(newBalance);
      setWalletHistory(updatedHistory);
      setAmount(''); // Clear input field
      Alert.alert('Transaction Successful', `₹${enteredAmount.toFixed(2)} added to your wallet.`);

      console.log('Updated Wallet Balance:', newBalance); // Debugging
      console.log('Updated Wallet History:', updatedHistory); // Debugging
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Error', 'Failed to save transaction. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Wallet Image */}
      <Image source={require('../assets/images/credit_cards.png')} style={styles.walletImage} />

      {/* Wallet Balance Card */}
      <LinearGradient colors={['#6A0DAD', '#8A2BE2']} style={styles.walletCard}>
        <Text style={styles.walletTitle}>Wallet Balance</Text>
        <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
      </LinearGradient>

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="₹ Enter Amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Fake Payment Button */}
      <TouchableOpacity style={styles.paymentButton} onPress={handleFakeTransaction}>
        <Text style={styles.paymentButtonText}>Add Money</Text>
      </TouchableOpacity>

      {/* Wallet History */}
      <Text style={styles.historyHeader}>Transaction History</Text>
      <FlatList
        data={walletHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>
            <Text style={styles.historyNote}>{item.note}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },

  // Wallet Image
  walletImage: { 
    width: '100%', 
    height: 180, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginBottom: 10 
  },

  // Wallet Card
  walletCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  walletTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  balanceText: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginTop: 5 },

  // Input Field
  input: { 
    borderWidth: 1, 
    borderColor: '#CCC', 
    borderRadius: 10, 
    padding: 12, 
    fontSize: 16, 
    backgroundColor: '#FFF' 
  },

  // Payment Button
  paymentButton: { 
    backgroundColor: '#6A0DAD', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 15, 
    elevation: 5 
  },
  paymentButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  // History Section
  historyHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  historyItem: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 3 
  },
  historyDate: { fontSize: 14, fontWeight: 'bold' },
  historyAmount: { fontSize: 16, fontWeight: 'bold', color: '#6A0DAD' },
  historyNote: { fontSize: 12, color: '#888' },
});

export default WalletScreen;