import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

interface Props {
  onComplete: () => void;
}

function Dot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0.3, { duration: 300 }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.dot, style]} />;
}

export function AuthenticatingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SafetyCulture</Text>
      <View style={styles.underline} />
      <View style={styles.dotsRow}>
        <Dot delay={0} />
        <Dot delay={180} />
        <Dot delay={360} />
      </View>
      <Text style={styles.label}>Signing you in…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9edf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: '#1f2533',
    letterSpacing: -0.3,
  },
  underline: {
    marginTop: 4,
    width: 36,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#6559ff',
    marginBottom: 48,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6559ff',
  },
  label: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(31,37,51,0.45)',
  },
});
