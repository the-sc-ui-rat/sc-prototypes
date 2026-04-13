import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

function RippleRing({ delay, size }: { delay: number; size: number }) {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    const start = () => {
      scale.value = withRepeat(
        withSequence(withTiming(0.6, { duration: 0 }), withTiming(1.6, { duration: 1600 })),
        -1,
        false,
      );
      opacity.value = withRepeat(
        withSequence(withTiming(0.8, { duration: 0 }), withTiming(0, { duration: 1600 })),
        -1,
        false,
      );
    };
    const timer = setTimeout(start, delay);
    return () => clearTimeout(timer);
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.rippleRing, { width: size, height: size, borderRadius: size / 2 }, animStyle]}
    />
  );
}

export function NFCAuthScreen({ onComplete, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topArrow}>
        <Text style={styles.arrowText}>↑</Text>
        <Text style={styles.arrowLabel}>NFC reader</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.centreArea}>
        <View style={styles.card}>
          <Pressable onPress={onComplete} style={styles.rippleWrapper}>
            <RippleRing delay={0} size={220} />
            <RippleRing delay={500} size={160} />
            <RippleRing delay={1000} size={100} />
            <View style={styles.nfcIcon}>
              <View style={styles.nfcArc3}>
                <View style={styles.nfcArc2}>
                  <View style={styles.nfcArc1}>
                    <View style={styles.nfcDot} />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
          <Text style={styles.heading}>Hold your badge here</Text>
          <Text style={styles.subtext}>Touch the top of the iPad with your NFC badge</Text>
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
  topArrow: {
    position: 'absolute',
    top: 48,
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 36,
    color: T.accent,
    fontFamily: 'NotoSans_700Bold',
  },
  arrowLabel: {
    fontSize: 13,
    color: T.textWeaker,
    fontFamily: 'NotoSans_400Regular',
    marginTop: 2,
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: 32,
  },
  backBtnText: {
    fontSize: 15,
    color: T.accentText,
    fontFamily: 'NotoSans_400Regular',
  },
  centreArea: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: T.surface,
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 8,
  },
  rippleWrapper: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  rippleRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: T.accent,
  },
  nfcIcon: {
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
  heading: {
    fontSize: 22,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
    maxWidth: 280,
  },
});
