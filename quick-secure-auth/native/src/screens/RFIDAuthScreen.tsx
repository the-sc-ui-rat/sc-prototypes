import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export function RFIDAuthScreen({ onComplete, onBack }: Props) {
  const lineOp = useSharedValue(0.2);

  useEffect(() => {
    lineOp.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) }),
        withTiming(0.2, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  const line1Style = useAnimatedStyle(() => ({ opacity: lineOp.value * 0.5 }));
  const line2Style = useAnimatedStyle(() => ({ opacity: lineOp.value * 0.75 }));
  const line3Style = useAnimatedStyle(() => ({ opacity: lineOp.value }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.centreArea}>
        <View style={styles.card}>
          <Pressable onPress={onComplete} style={styles.iconArea}>
            <Animated.View style={[styles.signalLine, { width: 50 }, line1Style]} />
            <Animated.View style={[styles.signalLine, { width: 80 }, line2Style]} />
            <Animated.View style={[styles.signalLine, { width: 110 }, line3Style]} />
            <View style={styles.rfidTag}>
              <View style={styles.rfidChip} />
              <View style={styles.rfidAntenna} />
              <Text style={styles.rfidLabel}>RFID</Text>
            </View>
            <Animated.View style={[styles.signalLine, { width: 110 }, line3Style]} />
            <Animated.View style={[styles.signalLine, { width: 80 }, line2Style]} />
            <Animated.View style={[styles.signalLine, { width: 50 }, line1Style]} />
          </Pressable>

          <Text style={styles.heading}>Bring your RFID tag within 10cm of the reader</Text>
          <Text style={styles.subtext}>Hold the tag flat and steady near the reader module</Text>
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
  iconArea: {
    alignItems: 'center',
    marginBottom: 36,
    gap: 8,
  },
  signalLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: T.accent,
  },
  rfidTag: {
    width: 160,
    height: 100,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: T.accent,
    backgroundColor: 'rgba(101,89,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  rfidChip: {
    width: 36,
    height: 26,
    borderRadius: 4,
    backgroundColor: T.accent,
    opacity: 0.6,
  },
  rfidAntenna: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: T.accent,
    opacity: 0.25,
  },
  rfidLabel: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontSize: 10,
    fontFamily: 'NotoSans_700Bold',
    color: T.accent,
    opacity: 0.5,
    letterSpacing: 1,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: 300,
  },
  subtext: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
    maxWidth: 280,
  },
});
