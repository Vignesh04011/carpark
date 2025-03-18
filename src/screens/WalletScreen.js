import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const WalletScreen = () => {
  const [balance, setBalance] = useState(0.00);
  const [amount, setAmount] = useState('');

  const walletHistory = [
    { id: '1', date: '13-Mar-2025', type: 'Credit', amount: '$0.00', note: 'Initial deposit' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Add To Wallet</Text>

      {/* Wallet Image */}
      <Image source={require('../assets/images/credit_cards.png')} style={styles.walletImage} />

      {/* Balance Display */}
      <Text style={styles.balanceText}>Balance: ${balance.toFixed(2)}</Text>

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="$ Enter Amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Make Payment Button */}
      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Make Payment</Text>
      </TouchableOpacity>

      {/* Wallet History Section */}
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
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  walletImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  paymentButton: {
    backgroundColor: '#6A0DAD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyType: {
    fontSize: 14,
    color: 'green',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  historyNote: {
    fontSize: 12,
    color: '#888',
  },
});

export default WalletScreen;
