import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';

import { T } from './src/tokens';
import { IdleScreen } from './src/screens/IdleScreen';
import { IdleAfterAuthScreen, LastUser } from './src/screens/IdleAfterAuthScreen';
import { FaceScanScreen, ScanUser } from './src/screens/FaceScanScreen';
import { AuthenticatingScreen } from './src/screens/AuthenticatingScreen';
import { IdentityConfirmScreen, ConfirmedUser } from './src/screens/IdentityConfirmScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TransitionToHome } from './src/screens/TransitionToHome';
import { QRScanScreen } from './src/screens/QRScanScreen';
import { PasswordLoginScreen } from './src/screens/PasswordLoginScreen';
import { NFCAuthScreen } from './src/screens/NFCAuthScreen';
import { RFIDAuthScreen } from './src/screens/RFIDAuthScreen';

// ── Mock FLW workers ──────────────────────────────────────────────────────────
const OLD_MATE: ConfirmedUser & LastUser & ScanUser = {
  name: 'Old Mate',
  email: 'old.mate@safetyculture.io',
  initials: 'OM',
  org: 'Glencore Mining',
};

const NEW_MATE: ConfirmedUser & LastUser & ScanUser = {
  name: 'New Mate',
  email: 'new.mate@safetyculture.io',
  initials: 'NM',
  org: 'Glencore Mining',
};

type Screen = 'idle' | 'idle-after-auth' | 'face-scan' | 'qr-scan' | 'password-login' | 'nfc-auth' | 'rfid-auth' | 'authenticating' | 'transitioning-to-home' | 'confirm' | 'home';

export default function App() {
  const [fontsLoaded] = useFonts({ NotoSans_400Regular, NotoSans_700Bold });
  const [screen, setScreen] = useState<Screen>('idle');
  const [activeUser, setActiveUser] = useState<ConfirmedUser & LastUser & ScanUser>(OLD_MATE);
  const [lastUser, setLastUser] = useState<LastUser | null>(null);
  const [avatarCenter, setAvatarCenter] = useState<{ x: number; y: number } | null>(null);
  const [screenOffsetY, setScreenOffsetY] = useState(0);
  const screenAreaRef = useRef<View>(null);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: T.bg }} />;

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goToFaceScan = () => setScreen('face-scan');
  const handleAuthenticated = () => setScreen('authenticating');
  const handleSwitchProfile = () => {
    setActiveUser(u => u === OLD_MATE ? NEW_MATE : OLD_MATE);
    setScreen('idle');
  };

  // ── Screen renderer ─────────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case 'idle':
        return (
          <IdleScreen
            onFaceScan={() => setScreen('face-scan')}
            onQRScan={() => setScreen('qr-scan')}
            onPassword={() => setScreen('password-login')}
            onNFC={() => setScreen('nfc-auth')}
            onRFID={() => setScreen('rfid-auth')}
          />
        );

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
            user={activeUser}
            onAuthenticated={handleAuthenticated}
            onBack={() => setScreen('idle')}
          />
        );

      case 'password-login':
        return (
          <PasswordLoginScreen
            onAuthenticated={() => setScreen('authenticating')}
            onBack={() => setScreen('idle')}
          />
        );

      case 'qr-scan':
        return (
          <QRScanScreen
            onScanned={() => setScreen('authenticating')}
            onBack={() => setScreen('idle')}
          />
        );

      case 'nfc-auth':
        return (
          <NFCAuthScreen
            onComplete={() => setScreen('authenticating')}
            onBack={() => setScreen('idle')}
          />
        );

      case 'rfid-auth':
        return (
          <RFIDAuthScreen
            onComplete={() => setScreen('authenticating')}
            onBack={() => setScreen('idle')}
          />
        );

      case 'authenticating':
        return (
          <AuthenticatingScreen
            userName={activeUser.name}
            userInitials={activeUser.initials}
            onComplete={(center) => {
              setLastUser(activeUser);
              setAvatarCenter(center);
              setScreen('transitioning-to-home');
            }}
          />
        );

      case 'transitioning-to-home':
        return avatarCenter ? (
          <TransitionToHome
            avatarCenter={avatarCenter}
            screenOffsetY={screenOffsetY}
            userName={activeUser.name}
            userInitials={activeUser.initials}
            onSwitchProfile={handleSwitchProfile}
            onComplete={() => setScreen('home')}
          />
        ) : null;

      case 'confirm':
        return (
          <IdentityConfirmScreen
            user={activeUser}
            onComplete={() => { setLastUser(activeUser); setScreen('home'); }}
          />
        );

      case 'home':
        return (
          <HomeScreen
            userName={activeUser.name}
            userInitials={activeUser.initials}
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
    { label: 'nfc',        screen: 'nfc-auth' },
    { label: 'rfid',       screen: 'rfid-auth' },
    { label: 'authing',    screen: 'authenticating' },
    { label: 'home',       screen: 'home' },
  ];

  const DevBar = () => (
    <View style={styles.devBar}>
      <Text style={styles.devLabel}>DEV</Text>
      {DEV_SCREENS.map(({ label, screen: s }) => (
        <TouchableOpacity
          key={s}
          onPress={() => {
            if (s === 'idle-after-auth') setLastUser(activeUser);
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
      <View
        ref={screenAreaRef}
        style={styles.screenArea}
        onLayout={() => screenAreaRef.current?.measureInWindow((_, y) => setScreenOffsetY(y))}
      >
        {renderScreen()}
      </View>
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
