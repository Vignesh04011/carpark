// WalletContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0.00);
  const [walletHistory, setWalletHistory] = useState([]);

  // Fetch wallet balance and history on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('walletBalance');
        const storedHistory = await AsyncStorage.getItem('walletHistory');
        
        if (storedBalance) setBalance(parseFloat(storedBalance));
        if (storedHistory) setWalletHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to update wallet balance and history
  const updateBalance = async (newBalance, newTransaction) => {
    try {
      await AsyncStorage.setItem('walletBalance', newBalance.toString());
      const updatedHistory = [newTransaction, ...walletHistory.slice(0, 49)]; // Limit history to 50 entries
      await AsyncStorage.setItem('walletHistory', JSON.stringify(updatedHistory));

      setBalance(newBalance);
      setWalletHistory(updatedHistory);
    } catch (error) {
      console.error('Error updating wallet balance:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ balance, walletHistory, updateBalance }}>
      {children}
    </WalletContext.Provider>
  );
};