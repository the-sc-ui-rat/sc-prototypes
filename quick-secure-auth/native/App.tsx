import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';

import { T } from './src/tokens';
import { IdleScreen } from './src/screens/IdleScreen';
import { IdleAfterAuthScreen, LastUser } from './src/screens/IdleAfterAuthScreen';
import { FaceScanScreen, FallbackMethod, ScanUser } from './src/screens/FaceScanScreen';
import { AuthenticatingScreen } from './src/screens/AuthenticatingScreen';
import { IdentityConfirmScreen, ConfirmedUser } from './src/screens/IdentityConfirmScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { QRScanScreen } from './src/screens/QRScanScreen';
import { PasswordLoginScreen } from './src/screens/PasswordLoginScreen';

// ── Auth config — mirrors the admin prototype default ────────────────────────
const AUTH_CONFIG = {
  primary: 'face' as const,
  fallbacks: ['qr', 'password'] as FallbackMethod[],
  inactivitySeconds: 15,
};

// ── Mock FLW worker ───────────────────────────────────────────────────────────
const MOCK_WORKER: ConfirmedUser & LastUser & ScanUser = {
  name: 'Old Mate',
  email: 'old.mate@safetyculture.io',
  initials: 'OM',
  org: 'Glencore Mining',
};

type Screen = 'idle' | 'idle-after-auth' | 'face-scan' | 'qr-scan' | 'password-login' | 'authenticating' | 'confirm' | 'home';

export default function App() {
  const [fontsLoaded] = useFonts({ NotoSans_400Regular, NotoSans_700Bold });
  const [screen, setScreen] = useState<Screen>('idle');
  const [lastUser, setLastUser] = useState<LastUser | null>(null);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: T.bg }} />;

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goToFaceScan = () => setScreen('face-scan');
  const handleAuthenticated = () => setScreen('authenticating');
  const handleSwitchProfile = () => setScreen('face-scan');

  // ── Screen renderer ─────────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case 'idle':
        return <IdleScreen onLogin={goToFaceScan} />;

      case 'idle-after-auth':
        return (
          <IdleAfterAuthScreen
            lastUser={lastUser!}
            onContinueAsUser={goToFaceScan}
            onLoginAnother={goToFaceScan}
          />
        );

      case 'face-scan':
        return (
          <FaceScanScreen
            fallbacks={AUTH_CONFIG.fallbacks}
            user={MOCK_WORKER}
            onAuthenticated={handleAuthenticated}
            onFallback={(method) => {
            if (method === 'qr') setScreen('qr-scan');
            if (method === 'password') setScreen('password-login');
          }}
          />
        );

      case 'password-login':
        return (
          <PasswordLoginScreen
            onAuthenticated={() => setScreen('authenticating')}
            onBack={() => setScreen('face-scan')}
          />
        );

      case 'qr-scan':
        return (
          <QRScanScreen
            onScanned={() => setScreen('authenticating')}
            onBack={() => setScreen('face-scan')}
          />
        );

      case 'authenticating':
        return <AuthenticatingScreen onComplete={() => { setLastUser(MOCK_WORKER); setScreen('home'); }} />;

      case 'confirm':
        return (
          <IdentityConfirmScreen
            user={MOCK_WORKER}
            onComplete={() => { setLastUser(MOCK_WORKER); setScreen('home'); }}
          />
        );

      case 'home':
        return (
          <HomeScreen
            userName={MOCK_WORKER.name}
            userInitials={MOCK_WORKER.initials}
            onSwitchProfile={handleSwitchProfile}
          />
        );
    }
  };

  // ── Dev bar ─────────────────────────────────────────────────────────────────
  const DEV_SCREENS: { label: string; screen: Screen }[] = [
    { label: 'idle',       screen: 'idle' },
    { label: 'scan',       screen: 'face-scan' },
    { label: 'qr',         screen: 'qr-scan' },
    { label: 'password',   screen: 'password-login' },
    { label: 'authing',    screen: 'authenticating' },
    { label: 'home',       screen: 'home' },
    { label: 'idle+user',  screen: 'idle-after-auth' },
  ];

  const DevBar = () => (
    <View style={styles.devBar}>
      <Text style={styles.devLabel}>DEV</Text>
      {DEV_SCREENS.map(({ label, screen: s }) => (
        <TouchableOpacity
          key={s}
          onPress={() => {
            if (s === 'idle-after-auth') setLastUser(MOCK_WORKER);
            setScreen(s);
          }}
          style={[styles.devBtn, screen === s && styles.devBtnActive]}
        >
          <Text style={[styles.devBtnText, screen === s && styles.devBtnTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
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
  root: { flex: 1, backgroundColor: T.bg },
  safeTop: { backgroundColor: 'rgba(0,0,0,0.06)' },
  devBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  devLabel: {
    fontSize: 9,
    fontFamily: 'NotoSans_700Bold',
    color: 'rgba(0,0,0,0.3)',
    letterSpacing: 0.8,
    marginRight: 2,
  },
  devBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  devBtnActive: { backgroundColor: 'rgba(101,89,255,0.14)' },
  devBtnText: { fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily: 'NotoSans_400Regular' },
  devBtnTextActive: { color: T.accent, fontFamily: 'NotoSans_700Bold' },
  screenArea: { flex: 1 },
});
