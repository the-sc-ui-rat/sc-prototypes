import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { T } from '../tokens';
import { StoredUser } from './SwitchUserScreen';

interface Props {
  user: StoredUser;
  onAuthenticated: () => void;
  onBack: () => void;
}

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

export function PinEntryScreen({ user, onAuthenticated, onBack }: Props) {
  const { width } = useWindowDimensions();
  const keySize = Math.min(80, (width - 96) / 3);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(onAuthenticated, 400);
      return () => clearTimeout(timer);
    }
  }, [pin]);

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setPin(p => p.slice(0, -1));
    } else if (key !== '' && pin.length < 4) {
      setPin(p => p + key);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.centreGroup}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: user.accentColor }]}>
          <Text style={styles.avatarText}>{user.initials}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.prompt}>Enter your 4-digit PIN</Text>
        </View>

        {/* PIN dots */}
        <View style={styles.dotsRow}>
          {[0,1,2,3].map(i => (
            <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />
          ))}
        </View>

        {/* Number pad */}
        <View style={styles.pad}>
          {KEYS.map((key, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.key,
                { width: keySize, height: keySize, borderRadius: keySize / 2 },
                key === '' && styles.keyEmpty,
              ]}
              onPress={() => handleKey(key)}
              activeOpacity={key === '' ? 1 : 0.7}
              disabled={key === ''}
            >
              <Text style={[styles.keyText, key === '⌫' && styles.keyDelete]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: { position: 'absolute', top: 52, left: 32 },
  backBtnText: { fontSize: 15, color: T.accentText, fontFamily: 'NotoSans_400Regular' },
  centreGroup: {
    alignItems: 'center',
    gap: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  userInfo: { alignItems: 'center', gap: 6 },
  userName: {
    fontSize: 22,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
  },
  prompt: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: T.accent,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: T.accent,
  },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    maxWidth: 320,
  },
  key: {
    backgroundColor: T.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  keyEmpty: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  keyText: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
  },
  keyDelete: {
    fontSize: 20,
    color: T.textWeaker,
  },
});
