import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold } from '@expo-google-fonts/noto-sans';
import { StatusBar } from 'expo-status-bar';
import { T } from './src/tokens';
import { LoginScreen } from './src/screens/LoginScreen';
import { AuthenticatingScreen } from './src/screens/AuthenticatingScreen';
import { TransitionToHome } from './src/screens/TransitionToHome';
import { HomeScreen } from './src/screens/HomeScreen';
import { SwitchUserScreen, StoredUser } from './src/screens/SwitchUserScreen';
import { PinEntryScreen } from './src/screens/PinEntryScreen';

type Screen = 'login' | 'authenticating' | 'transitioning-to-home' | 'home' | 'switch-user' | 'pin-entry';

const STORED_USERS: StoredUser[] = [
  { id: '1',  name: 'Old Mate',       email: 'old.mate@safetyculture.io',      initials: 'OM', accentColor: '#6559ff' },
  { id: '2',  name: 'Josh Rat',       email: 'josh.rat@safetyculture.io',      initials: 'JR', accentColor: '#0ea472' },
  { id: '3',  name: 'Sarah Chen',     email: 's.chen@safetyculture.io',        initials: 'SC', accentColor: '#e05c1a' },
  { id: '4',  name: 'Marcus Webb',    email: 'm.webb@safetyculture.io',        initials: 'MW', accentColor: '#0891b2' },
  { id: '5',  name: 'Priya Nair',     email: 'p.nair@safetyculture.io',        initials: 'PN', accentColor: '#7c3aed' },
  { id: '6',  name: 'Liam Torres',    email: 'l.torres@safetyculture.io',      initials: 'LT', accentColor: '#b45309' },
  { id: '7',  name: 'Anika Müller',   email: 'a.muller@safetyculture.io',      initials: 'AM', accentColor: '#0f766e' },
  { id: '8',  name: 'Daniel Park',    email: 'd.park@safetyculture.io',        initials: 'DP', accentColor: '#be123c' },
  { id: '9',  name: 'Fatima Al-Sayed',email: 'f.alsayed@safetyculture.io',     initials: 'FA', accentColor: '#1d4ed8' },
  { id: '10', name: 'Connor Walsh',   email: 'c.walsh@safetyculture.io',       initials: 'CW', accentColor: '#15803d' },
  { id: '11', name: 'Yuki Tanaka',    email: 'y.tanaka@safetyculture.io',      initials: 'YT', accentColor: '#9333ea' },
  { id: '12', name: 'Brooke Ellis',   email: 'b.ellis@safetyculture.io',       initials: 'BE', accentColor: '#c2410c' },
  { id: '13', name: 'James Okafor',   email: 'j.okafor@safetyculture.io',      initials: 'JO', accentColor: '#0369a1' },
  { id: '14', name: 'Mei Lin',        email: 'm.lin@safetyculture.io',         initials: 'ML', accentColor: '#065f46' },
  { id: '15', name: 'Ryan Patel',     email: 'r.patel@safetyculture.io',       initials: 'RP', accentColor: '#6d28d9' },
  { id: '16', name: 'Isla Mackenzie', email: 'i.mackenzie@safetyculture.io',   initials: 'IM', accentColor: '#b91c1c' },
  { id: '17', name: 'Andre Dupont',   email: 'a.dupont@safetyculture.io',      initials: 'AD', accentColor: '#0c4a6e' },
  { id: '18', name: 'Zoe Williams',   email: 'z.williams@safetyculture.io',    initials: 'ZW', accentColor: '#166534' },
  { id: '19', name: 'Sam Nguyen',     email: 's.nguyen@safetyculture.io',      initials: 'SN', accentColor: '#92400e' },
  { id: '20', name: 'Chloe Tremblay', email: 'c.tremblay@safetyculture.io',    initials: 'CT', accentColor: '#3730a3' },
  { id: '21', name: 'Tariq Hassan',   email: 't.hassan@safetyculture.io',      initials: 'TH', accentColor: '#155e75' },
];

const DEV_TABS: { label: string; screen: Screen }[] = [
  { label: 'login',        screen: 'login' },
  { label: 'authing',      screen: 'authenticating' },
  { label: 'home',         screen: 'home' },
  { label: 'switch-user',  screen: 'switch-user' },
  { label: 'pin',          screen: 'pin-entry' },
];

export default function App() {
  const [fontsLoaded] = useFonts({ NotoSans_400Regular, NotoSans_700Bold });
  const [screen, setScreen] = useState<Screen>('login');
  const [activeUser, setActiveUser] = useState<StoredUser>(STORED_USERS[0]);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  const [avatarCenter, setAvatarCenter] = useState({ x: 0, y: 0 });
  const [screenOffsetY, setScreenOffsetY] = useState(0);
  const screenAreaRef = useRef<View>(null);

  if (!fontsLoaded) return null;

  const handleTransitionComplete = () => setScreen('home');

  const handleSelectUser = (user: StoredUser) => {
    setSelectedUser(user);
    setScreen('pin-entry');
  };

  const handlePinAuthenticated = () => {
    if (selectedUser) setActiveUser(selectedUser);
    setScreen('authenticating');
  };

  const handleLoginAuthenticated = () => setScreen('authenticating');

  const handleAuthComplete = (center: { x: number; y: number }) => {
    setAvatarCenter(center);
    setScreen('transitioning-to-home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen onAuthenticated={handleLoginAuthenticated} />;
      case 'authenticating':
        return (
          <AuthenticatingScreen
            userName={activeUser.name}
            userInitials={activeUser.initials}
            onComplete={handleAuthComplete}
          />
        );
      case 'transitioning-to-home':
        return (
          <TransitionToHome
            avatarCenter={avatarCenter}
            screenOffsetY={screenOffsetY}
            userName={activeUser.name}
            userInitials={activeUser.initials}
            onSwitchProfile={() => setScreen('switch-user')}
            onComplete={handleTransitionComplete}
          />
        );
      case 'home':
        return (
          <HomeScreen
            userName={activeUser.name}
            userInitials={activeUser.initials}
            onSwitchProfile={() => setScreen('switch-user')}
          />
        );
      case 'switch-user':
        return (
          <SwitchUserScreen
            users={STORED_USERS.filter(u => u.id !== activeUser.id)}
            onSelectUser={handleSelectUser}
            onLoginViaEmail={() => setScreen('login')}
          />
        );
      case 'pin-entry':
        return selectedUser ? (
          <PinEntryScreen
            user={selectedUser}
            onAuthenticated={handlePinAuthenticated}
            onBack={() => setScreen('switch-user')}
          />
        ) : null;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.devBar}>
        <View style={styles.devTabRow}>
          {DEV_TABS.map(({ label, screen: s }) => (
            <TouchableOpacity
              key={s}
              style={[styles.devTab, screen === s && styles.devTabActive]}
              onPress={() => setScreen(s)}
            >
              <Text style={[styles.devTabText, screen === s && styles.devTabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
      <View
        ref={screenAreaRef}
        style={styles.screenArea}
        onLayout={() => {
          screenAreaRef.current?.measureInWindow((_, y) => setScreenOffsetY(y));
        }}
      >
        {renderScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  devBar: { backgroundColor: '#1f2533' },
  devTabRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  devTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  devTabActive: { backgroundColor: T.accent },
  devTabText: { fontSize: 11, fontFamily: 'NotoSans_400Regular', color: 'rgba(255,255,255,0.5)' },
  devTabTextActive: { color: '#ffffff', fontFamily: 'NotoSans_700Bold' },
  screenArea: { flex: 1 },
});
