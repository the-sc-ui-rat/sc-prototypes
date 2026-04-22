import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export interface ScanUser {
  name: string;
  initials: string;
  org: string;
}

interface Props {
  user: ScanUser;
  onAuthenticated: () => void;
  onBack: () => void;
}


export function FaceScanScreen({ user, onAuthenticated, onBack }: Props) {
  const { width } = useWindowDimensions();
  const hMargin = width < 600 ? 12 : 20;
  const [permission, requestPermission] = useCameraPermissions();
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardY = useSharedValue(120);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleTap = () => {
    if (confirming) return;
    setConfirming(true);

    cardY.value = withSpring(0, { damping: 22, stiffness: 220 });
    cardOpacity.value = withTiming(1, { duration: 300 });

    timerRef.current = setTimeout(onAuthenticated, 2500);
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardY.value }],
    opacity: cardOpacity.value,
  }));

  const bracketColor = confirming ? '#1eae7e' : 'rgba(255,255,255,0.9)';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Facial Recognition</Text>
        <View style={styles.backBtn} />
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

      {/* Confirm card floats over the camera zone */}
      {confirming && (
        <Animated.View style={[styles.confirmCard, cardStyle, { marginHorizontal: hMargin + 4 }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPipe}>  |  </Text>
            <Text style={styles.userOrg}>{user.org}</Text>
          </View>
        </Animated.View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, minWidth: 60 },
  backArrow: { fontSize: 28, color: '#ffffff', lineHeight: 32, marginTop: -2 },
  backText: { fontSize: 16, fontFamily: 'NotoSans_400Regular', color: '#ffffff' },
  title: { fontSize: 17, fontFamily: 'NotoSans_700Bold', color: '#ffffff', letterSpacing: -0.2 },
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
    borderTopLeftRadius: 16,
  },
  bracketTR: {
    top: 0, right: 0,
    borderTopWidth: BRACKET_THICKNESS,
    borderRightWidth: BRACKET_THICKNESS,
    borderTopRightRadius: 16,
  },
  bracketBL: {
    bottom: 0, left: 0,
    borderBottomWidth: BRACKET_THICKNESS,
    borderLeftWidth: BRACKET_THICKNESS,
    borderBottomLeftRadius: 16,
  },
  bracketBR: {
    bottom: 0, right: 0,
    borderBottomWidth: BRACKET_THICKNESS,
    borderRightWidth: BRACKET_THICKNESS,
    borderBottomRightRadius: 16,
  },
  tapHint: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },

  // Confirm card — absolutely positioned, floats over camera
  confirmCard: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
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
