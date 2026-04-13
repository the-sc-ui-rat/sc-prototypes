import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export function FaceAuthScreen({ onComplete, onBack }: Props) {
  const scanY = useSharedValue(0);

  useEffect(() => {
    scanY.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scanStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value * 380 }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.centreArea}>
        <View style={styles.oval}>
          <View style={[styles.bracket, styles.bracketTL]} />
          <View style={[styles.bracket, styles.bracketTR]} />
          <View style={[styles.bracket, styles.bracketBL]} />
          <View style={[styles.bracket, styles.bracketBR]} />
          <Animated.View style={[styles.scanLine, scanStyle]} />
        </View>
        <Text style={styles.holdStill}>Hold still…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'NotoSans_400Regular',
  },
  centreArea: {
    alignItems: 'center',
  },
  oval: {
    width: 320,
    height: 400,
    borderRadius: 160,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
    alignItems: 'center',
  },
  bracket: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#4ade80',
    borderWidth: 3,
  },
  bracketTL: { top: -1, left: -1, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  bracketTR: { top: -1, right: -1, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bracketBL: { bottom: -1, left: -1, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  bracketBR: { bottom: -1, right: -1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(74,222,128,0.7)',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  holdStill: {
    marginTop: 36,
    fontSize: 22,
    fontFamily: 'NotoSans_400Regular',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
