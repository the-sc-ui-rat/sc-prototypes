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
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
}

function Dot({ delay }: { delay: number }) {
  const size = useSharedValue(6);

  useEffect(() => {
    size.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(12, { duration: 300 }),
          withTiming(6, { duration: 300 }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
    backgroundColor: T.accent,
  }));

  return <Animated.View style={dotStyle} />;
}

export function AuthenticatingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SafetyCulture</Text>
      <View style={styles.underline} />

      <View style={styles.dotsRow}>
        <Dot delay={0} />
        <Dot delay={200} />
        <Dot delay={400} />
      </View>

      <Text style={styles.label}>Signing you in…</Text>
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
  logo: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    letterSpacing: -0.5,
  },
  underline: {
    marginTop: 4,
    width: 44,
    height: 3,
    borderRadius: 2,
    backgroundColor: T.accent,
    marginBottom: 48,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
  },
});
