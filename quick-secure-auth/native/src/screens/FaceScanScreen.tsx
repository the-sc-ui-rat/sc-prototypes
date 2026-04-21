import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export type FallbackMethod = 'qr' | 'nfc' | 'rfid' | 'password';

export interface ScanUser {
  name: string;
  initials: string;
  org: string;
}

interface Props {
  fallbacks: FallbackMethod[];
  user: ScanUser;
  onAuthenticated: () => void;
  onFallback: (method: FallbackMethod) => void;
}

const LABELS: Record<FallbackMethod, string> = {
  qr: 'QR Code',
  nfc: 'Tap NFC tag',
  rfid: 'Tap RFID tag',
  password: 'Username and password',
};

export function FaceScanScreen({ fallbacks, user, onAuthenticated, onFallback }: Props) {
  const { width } = useWindowDimensions();
  const hMargin = width < 600 ? 12 : 20;
  const [permission, requestPermission] = useCameraPermissions();
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardY = useSharedValue(120);
  const cardOpacity = useSharedValue(0);
  const fallbackOpacity = useSharedValue(1);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleTap = () => {
    if (confirming) return;
    setConfirming(true);

    fallbackOpacity.value = withTiming(0, { duration: 200 });
    cardY.value = withSpring(0, { damping: 22, stiffness: 220 });
    cardOpacity.value = withTiming(1, { duration: 300 });

    timerRef.current = setTimeout(onAuthenticated, 2500);
  };

  const fallbackStyle = useAnimatedStyle(() => ({
    opacity: fallbackOpacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardY.value }],
    opacity: cardOpacity.value,
  }));

  const bracketColor = confirming ? '#1eae7e' : 'rgba(255,255,255,0.9)';
  const rowFallbacks = fallbacks.slice(0, 2);
  const extraFallback = fallbacks[2] as FallbackMethod | undefined;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>SafetyCulture</Text>
        <View style={styles.logoUnderline} />
      </View>

      {/* Camera liveness zone */}
      <Pressable style={[styles.livenessZone, { marginHorizontal: hMargin }]} onPress={handleTap}>
        {permission?.granted ? (
          <CameraView style={StyleSheet.absoluteFill} facing="front" />
        ) : (
          <View style={styles.cameraFallback} />
        )}
        <View style={[styles.bracket, styles.bracketTL, { borderColor: bracketColor }]} />
        <View style={[styles.bracket, styles.bracketTR, { borderColor: bracketColor }]} />
        <View style={[styles.bracket, styles.bracketBL, { borderColor: bracketColor }]} />
        <View style={[styles.bracket, styles.bracketBR, { borderColor: bracketColor }]} />
        {!confirming && (
          <Text style={styles.tapHint}>Tap to simulate facial recognition</Text>
        )}
      </Pressable>

      {/* Bottom section — fallbacks fade out, confirm card slides in */}
      <View style={[styles.bottomSection, { paddingHorizontal: hMargin + 4 }]}>
        {confirming ? (
          <Animated.View style={[styles.confirmCard, cardStyle]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userPipe}>  |  </Text>
              <Text style={styles.userOrg}>{user.org}</Text>
            </View>
          </Animated.View>
        ) : (
          <Animated.View style={[styles.fallbackSection, fallbackStyle]}>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign in with</Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.fallbackButtons}>
              <View style={styles.buttonRow}>
                {rowFallbacks.map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={styles.fallbackBtn}
                    onPress={() => onFallback(method)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.fallbackBtnText}>{LABELS[method]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {extraFallback && (
                <TouchableOpacity
                  style={styles.fallbackTextBtn}
                  onPress={() => onFallback(extraFallback)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.fallbackTextLink}>{LABELS[extraFallback]}</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const BRACKET_SIZE = 32;
const BRACKET_THICKNESS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 8,
  },
  logo: {
    fontSize: 22,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  logoUnderline: {
    marginTop: 3,
    width: 32,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#6559ff',
  },
  livenessZone: {
    flex: 1,
    marginVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cameraFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2c2c2e',
  },
  bracket: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
  },
  bracketTL: {
    top: 0, left: 0,
    borderTopWidth: BRACKET_THICKNESS,
    borderLeftWidth: BRACKET_THICKNESS,
    borderTopLeftRadius: 4,
  },
  bracketTR: {
    top: 0, right: 0,
    borderTopWidth: BRACKET_THICKNESS,
    borderRightWidth: BRACKET_THICKNESS,
    borderTopRightRadius: 4,
  },
  bracketBL: {
    bottom: 0, left: 0,
    borderBottomWidth: BRACKET_THICKNESS,
    borderLeftWidth: BRACKET_THICKNESS,
    borderBottomLeftRadius: 4,
  },
  bracketBR: {
    bottom: 0, right: 0,
    borderBottomWidth: BRACKET_THICKNESS,
    borderRightWidth: BRACKET_THICKNESS,
    borderBottomRightRadius: 4,
  },
  tapHint: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },

  // Bottom section
  bottomSection: {
    paddingBottom: 36,
    minHeight: 110,
    justifyContent: 'flex-end',
  },

  // Fallbacks
  fallbackSection: {
    gap: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  fallbackButtons: { gap: 8 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  fallbackBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  fallbackBtnText: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: '#4740d4',
    textAlign: 'center',
  },
  fallbackTextBtn: { alignItems: 'center', paddingVertical: 4 },
  fallbackTextLink: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#7b74ff',
  },

  // Confirm card
  confirmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    backgroundColor: '#e8fcf5',
    borderWidth: 2,
    borderColor: '#1eae7e',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.6 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6559ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: '#1f2533',
  },
  userPipe: {
    fontSize: 18,
    fontFamily: 'NotoSans_400Regular',
    color: '#1f2533',
  },
  userOrg: {
    fontSize: 18,
    fontFamily: 'NotoSans_400Regular',
    color: '#1f2533',
  },
});
