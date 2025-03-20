// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WalletProvider } from './src/context/WalletContext';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <WalletProvider> {/* Wrap the app with WalletProvider */}
        <AppNavigation />
      </WalletProvider>
    </SafeAreaProvider>
  );
};

export default App;