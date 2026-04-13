import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { T } from '../tokens';

type AuthMethod = 'face' | 'nfc' | 'rfid' | 'qr';

interface Props {
  method: AuthMethod;
  onMethodChange: (m: AuthMethod) => void;
  onTap: () => void;
}

// ── Face illustration ────────────────────────────────────────────────────────
function FaceIllustration({ onTap }: { onTap: () => void }) {
  const scanY = useSharedValue(0);

  useEffect(() => {
    scanY.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, []);

  const scanStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value * 280 }],
  }));

  return (
    <Pressable onPress={onTap} style={styles.illustrationWrapper}>
      <View style={styles.faceOval}>
        <View style={[styles.bracket, styles.bracketTL]} />
        <View style={[styles.bracket, styles.bracketTR]} />
        <View style={[styles.bracket, styles.bracketBL]} />
        <View style={[styles.bracket, styles.bracketBR]} />
        <View style={styles.faceInner}>
          <View style={styles.eyeRow}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.nose} />
          <View style={styles.mouth} />
        </View>
        <Animated.View style={[styles.scanLine, scanStyle]} />
      </View>
      <Text style={styles.tapHint}>Tap to simulate</Text>
    </Pressable>
  );
}

// ── NFC illustration ─────────────────────────────────────────────────────────
function NFCIllustration({ onTap }: { onTap: () => void }) {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  const op1 = useSharedValue(0.7);
  const op2 = useSharedValue(0.5);
  const op3 = useSharedValue(0.3);

  useEffect(() => {
    const dur = 1400;
    scale1.value = withRepeat(withSequence(withTiming(1, { duration: 0 }), withTiming(1.6, { duration: dur })), -1, false);
    op1.value = withRepeat(withSequence(withTiming(0.7, { duration: 0 }), withTiming(0, { duration: dur })), -1, false);
    setTimeout(() => {
      scale2.value = withRepeat(withSequence(withTiming(1, { duration: 0 }), withTiming(1.6, { duration: dur })), -1, false);
      op2.value = withRepeat(withSequence(withTiming(0.7, { duration: 0 }), withTiming(0, { duration: dur })), -1, false);
    }, 400);
    setTimeout(() => {
      scale3.value = withRepeat(withSequence(withTiming(1, { duration: 0 }), withTiming(1.6, { duration: dur })), -1, false);
      op3.value = withRepeat(withSequence(withTiming(0.7, { duration: 0 }), withTiming(0, { duration: dur })), -1, false);
    }, 800);
  }, []);

  const ring1Style = useAnimatedStyle(() => ({ transform: [{ scale: scale1.value }], opacity: op1.value }));
  const ring2Style = useAnimatedStyle(() => ({ transform: [{ scale: scale2.value }], opacity: op2.value }));
  const ring3Style = useAnimatedStyle(() => ({ transform: [{ scale: scale3.value }], opacity: op3.value }));

  return (
    <Pressable onPress={onTap} style={styles.illustrationWrapper}>
      <View style={styles.rippleContainer}>
        <Animated.View style={[styles.rippleRing, { width: 220, height: 220, borderRadius: 110 }, ring3Style]} />
        <Animated.View style={[styles.rippleRing, { width: 170, height: 170, borderRadius: 85 }, ring2Style]} />
        <Animated.View style={[styles.rippleRing, { width: 120, height: 120, borderRadius: 60 }, ring1Style]} />
        <View style={styles.nfcIconCenter}>
          <View style={styles.nfcArc3}>
            <View style={styles.nfcArc2}>
              <View style={styles.nfcArc1}>
                <View style={styles.nfcDot} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.tapHint}>Tap to simulate</Text>
    </Pressable>
  );
}

// ── RFID illustration ────────────────────────────────────────────────────────
function RFIDIllustration({ onTap }: { onTap: () => void }) {
  const lineOpacity = useSharedValue(0.3);

  useEffect(() => {
    lineOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.3, { duration: 600 }),
      ),
      -1,
      false,
    );
  }, []);

  const lineStyle = useAnimatedStyle(() => ({ opacity: lineOpacity.value }));

  return (
    <Pressable onPress={onTap} style={styles.illustrationWrapper}>
      <View style={styles.rfidContainer}>
        {[60, 90, 120].map((w, i) => (
          <Animated.View key={i} style={[styles.rfidSignalLine, { width: w, marginBottom: 8 }, lineStyle]} />
        ))}
        <View style={styles.rfidTag}>
          <View style={styles.rfidChip} />
          <View style={styles.rfidAntenna} />
        </View>
        {[120, 90, 60].map((w, i) => (
          <Animated.View key={`b${i}`} style={[styles.rfidSignalLine, { width: w, marginTop: 8 }, lineStyle]} />
        ))}
      </View>
      <Text style={styles.tapHint}>Tap to simulate</Text>
    </Pressable>
  );
}

// ── QR illustration ──────────────────────────────────────────────────────────
function QRIllustration({ onTap }: { onTap: () => void }) {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0],
    [0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,1],
    [1,0,1,1,0,0,1,0,1,1,1,0,1,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,0],
    [1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,0,0,0,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,1,0],
  ];
  const cellSize = 12;

  return (
    <Pressable onPress={onTap} style={styles.illustrationWrapper}>
      <View style={styles.qrFrame}>
        {pattern.map((row, ri) => (
          <View key={ri} style={{ flexDirection: 'row' }}>
            {row.map((cell, ci) => (
              <View
                key={ci}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: cell ? T.textDefault : 'transparent',
                }}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.tapHint}>Tap to simulate scan</Text>
    </Pressable>
  );
}

// ── Main KioskScreen ─────────────────────────────────────────────────────────
export function KioskScreen({ method, onMethodChange, onTap }: Props) {
  const instructionText: Record<AuthMethod, string> = {
    face: 'Look at the camera to sign in',
    nfc: 'Tap your badge to sign in',
    rfid: 'Hold your tag near the reader',
    qr: 'Scan the QR code with your SafetyCulture app',
  };

  return (
    <View style={styles.container}>
      {/* Logo area */}
      <View style={styles.logoArea}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SafetyCulture</Text>
          <View style={styles.logoUnderline} />
        </View>
        <Text style={styles.orgName}>Glencore Mining</Text>
      </View>

      {/* Centre illustration */}
      <View style={styles.centreArea}>
        {method === 'face' && <FaceIllustration onTap={onTap} />}
        {method === 'nfc' && <NFCIllustration onTap={onTap} />}
        {method === 'rfid' && <RFIDIllustration onTap={onTap} />}
        {method === 'qr' && <QRIllustration onTap={onTap} />}
      </View>

      {/* Bottom */}
      <View style={styles.bottomArea}>
        <Text style={styles.instructionText}>{instructionText[method]}</Text>
        <TouchableOpacity style={styles.troubleBtn}>
          <Text style={styles.troubleBtnText}>Having trouble? Use a different method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.bg,
  },
  logoArea: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 26,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    letterSpacing: -0.5,
  },
  logoUnderline: {
    marginTop: 3,
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: T.accent,
  },
  orgName: {
    marginTop: 6,
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    letterSpacing: 0.2,
  },
  centreArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomArea: {
    alignItems: 'center',
    paddingBottom: 48,
    paddingHorizontal: 40,
  },
  instructionText: {
    fontSize: 20,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeak,
    textAlign: 'center',
    marginBottom: 16,
  },
  troubleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  troubleBtnText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: T.accentText,
    textDecorationLine: 'underline',
  },
  tapHint: {
    marginTop: 10,
    fontSize: 12,
    color: T.textPlaceholder,
    fontFamily: 'NotoSans_400Regular',
  },

  // Face
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceOval: {
    width: 220,
    height: 280,
    borderRadius: 110,
    borderWidth: 2.5,
    borderColor: T.accent,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: T.accent,
    borderWidth: 3,
  },
  bracketTL: { top: -1, left: -1, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  bracketTR: { top: -1, right: -1, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bracketBL: { bottom: -1, left: -1, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  bracketBR: { bottom: -1, right: -1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  faceInner: {
    alignItems: 'center',
  },
  eyeRow: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 20,
  },
  eye: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: T.textWeak,
    backgroundColor: 'transparent',
  },
  nose: {
    width: 12,
    height: 16,
    borderBottomWidth: 2.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: T.textWeak,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 16,
  },
  mouth: {
    width: 52,
    height: 20,
    borderBottomWidth: 2.5,
    borderColor: T.textWeak,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(101,89,255,0.6)',
  },

  // NFC
  rippleContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: T.accent,
  },
  nfcIconCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nfcArc3: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  nfcArc2: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  nfcArc1: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  nfcDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: T.accent,
  },

  // RFID
  rfidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rfidSignalLine: {
    height: 3,
    backgroundColor: T.accent,
    borderRadius: 2,
  },
  rfidTag: {
    width: 140,
    height: 88,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: T.accent,
    backgroundColor: 'rgba(101,89,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  rfidChip: {
    width: 32,
    height: 24,
    borderRadius: 4,
    backgroundColor: T.accent,
    opacity: 0.7,
  },
  rfidAntenna: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: T.accent,
    opacity: 0.3,
  },

  // QR
  qrFrame: {
    backgroundColor: T.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
});
