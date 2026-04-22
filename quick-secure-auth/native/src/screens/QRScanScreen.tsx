import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path, Line } from 'react-native-svg';

interface Props {
  onScanned: () => void;
  onBack: () => void;
}

const BRACKET_SIZE = 32;
const BRACKET_THICKNESS = 3;

function LightbulbIcon({ color }: { color: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21h6M12 3a6 6 0 0 1 4.243 10.243C15.28 14.206 15 15.1 15 16v1H9v-1c0-.9-.28-1.794-1.243-2.757A6 6 0 0 1 12 3z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
      />
      <Line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function QRScanScreen({ onScanned, onBack }: Props) {
  const { width } = useWindowDimensions();
  const hMargin = width < 600 ? 12 : 20;
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const bracketScale = useSharedValue(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleTap = () => {
    if (scanned) return;
    setScanned(true);
    bracketScale.value = withSequence(
      withSpring(1.03, { damping: 6 }),
      withSpring(1, { damping: 10 }),
    );
    timerRef.current = setTimeout(onScanned, 900);
  };

  const bracketStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bracketScale.value }],
  }));

  const bc = scanned ? '#1eae7e' : 'rgba(255,255,255,0.9)';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan QR code</Text>
        <View style={styles.backBtn} />
      </View>

      {/* Camera zone — matches face scan layout */}
      <Animated.View style={[styles.cameraZone, bracketStyle, { marginHorizontal: hMargin }]}>
        {permission?.granted ? (
          <CameraView style={StyleSheet.absoluteFill} facing="back" enableTorch={torchOn} onPress={handleTap} />
        ) : (
          <View style={styles.cameraFallback} />
        )}

        {/* Tap zone overlay */}
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleTap} activeOpacity={1} />

        {/* Brackets */}
        <View style={[styles.bracket, styles.bracketTL, { borderColor: bc }]} />
        <View style={[styles.bracket, styles.bracketTR, { borderColor: bc }]} />
        <View style={[styles.bracket, styles.bracketBL, { borderColor: bc }]} />
        <View style={[styles.bracket, styles.bracketBR, { borderColor: bc }]} />

        {/* Instruction */}
        <Text style={styles.hint}>
          {scanned ? 'QR code detected' : 'Scan QR code within the frame'}
        </Text>
      </Animated.View>

      {/* Bottom actions */}
      <View style={[styles.bottomSection, { paddingHorizontal: hMargin + 4 }]}>
        <TouchableOpacity
          style={[styles.torchBtn, torchOn && styles.torchBtnOn]}
          onPress={() => setTorchOn(t => !t)}
          activeOpacity={0.8}
        >
          <LightbulbIcon color={torchOn ? '#6559ff' : 'rgba(255,255,255,0.8)'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.manualBtn} activeOpacity={0.7}>
          <Text style={styles.manualText}>Enter code manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },

  // Header
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

  // Camera zone — same flex layout as FaceScanScreen.livenessZone
  cameraZone: {
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

  // Brackets
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

  hint: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },

  // Bottom
  bottomSection: {
    paddingBottom: 36,
    alignItems: 'center',
    gap: 16,
  },
  torchBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  torchBtnOn: {
    backgroundColor: 'rgba(101,89,255,0.2)',
    borderColor: '#6559ff',
  },
  manualBtn: { paddingVertical: 6 },
  manualText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.55)',
  },
});
