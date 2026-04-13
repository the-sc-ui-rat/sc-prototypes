import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';

import { T } from './src/tokens';
import { KioskScreen } from './src/screens/KioskScreen';
import { FaceAuthScreen } from './src/screens/FaceAuthScreen';
import { NFCAuthScreen } from './src/screens/NFCAuthScreen';
import { RFIDAuthScreen } from './src/screens/RFIDAuthScreen';
import { QRAuthScreen } from './src/screens/QRAuthScreen';
import { AuthenticatingScreen } from './src/screens/AuthenticatingScreen';
import { IdentityConfirmScreen } from './src/screens/IdentityConfirmScreen';
import { AuthFailedScreen } from './src/screens/AuthFailedScreen';
import { HomeScreen } from './src/screens/HomeScreen';

type Screen =
  | 'kiosk'
  | 'face'
  | 'nfc'
  | 'rfid'
  | 'qr'
  | 'authenticating'
  | 'confirm'
  | 'failed'
  | 'home';

type AuthMethod = 'face' | 'nfc' | 'rfid' | 'qr';

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  const [method, setMethod] = useState<AuthMethod>('face');
  const [screen, setScreen] = useState<Screen>('kiosk');

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: T.bg }} />;
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleKioskTap = () => {
    const dest: Record<AuthMethod, Screen> = {
      face: 'face',
      nfc: 'nfc',
      rfid: 'rfid',
      qr: 'qr',
    };
    setScreen(dest[method]);
  };

  const handleMethodChange = (m: AuthMethod) => {
    setMethod(m);
    setScreen('kiosk');
  };

  const handleAuthComplete = () => setScreen('authenticating');
  const handleAuthenticatingComplete = () => setScreen('confirm');
  const handleConfirmComplete = () => setScreen('home');
  const handleNotYou = () => setScreen('kiosk');
  const handleFastSwitch = () => setScreen('kiosk');
  const handleTryAgain = () => setScreen('kiosk');
  const handleDifferentMethod = () => setScreen('kiosk');
  const handleBack = () => setScreen('kiosk');

  // ── Screen renderer ───────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case 'kiosk':
        return (
          <KioskScreen
            method={method}
            onMethodChange={handleMethodChange}
            onTap={handleKioskTap}
          />
        );
      case 'face':
        return <FaceAuthScreen onComplete={handleAuthComplete} onBack={handleBack} />;
      case 'nfc':
        return <NFCAuthScreen onComplete={handleAuthComplete} onBack={handleBack} />;
      case 'rfid':
        return <RFIDAuthScreen onComplete={handleAuthComplete} onBack={handleBack} />;
      case 'qr':
        return <QRAuthScreen onComplete={handleAuthComplete} onBack={handleBack} />;
      case 'authenticating':
        return <AuthenticatingScreen onComplete={handleAuthenticatingComplete} />;
      case 'confirm':
        return (
          <IdentityConfirmScreen
            onComplete={handleConfirmComplete}
            onNotYou={handleNotYou}
          />
        );
      case 'failed':
        return (
          <AuthFailedScreen
            method={method}
            onTryAgain={handleTryAgain}
            onDifferentMethod={handleDifferentMethod}
          />
        );
      case 'home':
        return <HomeScreen onFastSwitch={handleFastSwitch} />;
    }
  };

  // ── Dev bar ───────────────────────────────────────────────────────────────
  const DevBar = () => (
    <View style={styles.devBar}>
      <Text style={styles.devLabel}>DEV</Text>
      {(['face', 'nfc', 'rfid', 'qr'] as AuthMethod[]).map((m) => (
        <TouchableOpacity
          key={m}
          onPress={() => handleMethodChange(m)}
          style={[styles.devBtn, method === m && styles.devBtnActive]}
        >
          <Text style={[styles.devBtnText, method === m && styles.devBtnTextActive]}>
            {m.toUpperCase()}
            {method === m ? ' ✓' : ''}
          </Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.devScreenLabel}>  /{screen}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeTop}>
        <DevBar />
      </SafeAreaView>
      <View style={styles.screenArea}>{renderScreen()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: T.bg,
  },
  safeTop: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  devBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  devLabel: {
    fontSize: 10,
    fontFamily: 'NotoSans_700Bold',
    color: 'rgba(0,0,0,0.3)',
    letterSpacing: 0.8,
    marginRight: 4,
  },
  devBtn: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  devBtnActive: {
    backgroundColor: 'rgba(101,89,255,0.12)',
  },
  devBtnText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'NotoSans_400Regular',
  },
  devBtnTextActive: {
    color: T.accent,
    fontFamily: 'NotoSans_700Bold',
  },
  devScreenLabel: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.25)',
    fontFamily: 'NotoSans_400Regular',
    marginLeft: 4,
  },
  screenArea: {
    flex: 1,
  },
});
