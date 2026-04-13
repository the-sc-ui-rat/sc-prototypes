import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import FaceScanScreen from './screens/FaceScanScreen';
import HomeScreen from './screens/HomeScreen';

// Flow 1 (personal device): welcome → login → faceScan → home
// Fallbacks from faceScan: → qrScan | → passwordLogin (reuse LoginScreen)
type Screen = 'welcome' | 'login' | 'faceScan' | 'home' | 'qrScan' | 'passwordLogin';

const darkScreens: Screen[] = ['faceScan'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');

  return (
    <>
      <StatusBar style={darkScreens.includes(screen) ? 'light' : 'dark'} />

      {screen === 'welcome' && (
        <WelcomeScreen
          onLogin={() => setScreen('login')}
          onSignUp={() => setScreen('login')}
        />
      )}

      {screen === 'login' && (
        <LoginScreen
          onContinue={() => setScreen('faceScan')}
        />
      )}

      {screen === 'faceScan' && (
        <FaceScanScreen
          onSuccess={() => setScreen('home')}
          onFallbackQR={() => setScreen('qrScan')}
          onFallbackPassword={() => setScreen('passwordLogin')}
          onNFC={() => {/* NFC not yet implemented */}}
        />
      )}

      {screen === 'passwordLogin' && (
        <LoginScreen onContinue={() => setScreen('faceScan')} />
      )}

      {screen === 'qrScan' && (
        <LoginScreen onContinue={() => setScreen('faceScan')} />
      )}

      {screen === 'home' && (
        <HomeScreen />
      )}
    </>
  );
}
