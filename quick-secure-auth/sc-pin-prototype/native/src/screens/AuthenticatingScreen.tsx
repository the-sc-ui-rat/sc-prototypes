import React, { useEffect, useRef } from 'react';
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
  userName: string;
  userInitials: string;
  onComplete: (avatarCenter: { x: number; y: number }) => void;
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

  return <Animated.View style={[styles.dot, useAnimatedStyle(() => ({ opacity: opacity.value }))]} />;
}

export function AuthenticatingScreen({ userName, userInitials, onComplete }: Props) {
  const avatarRef = useRef<View>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      avatarRef.current?.measureInWindow((x, y, w, h) => {
        onComplete({ x: x + w / 2, y: y + h / 2 });
      });
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoGroup}>
        <Text style={styles.logo}>SafetyCulture</Text>
        <View style={styles.underline} />
      </View>

      <View style={styles.welcomeGroup}>
        <Text style={styles.welcomeText}>Welcome back {userName}</Text>
        <View ref={avatarRef} style={styles.avatar}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>
      </View>

      <View style={styles.spinnerGroup}>
        <View style={styles.dotsRow}>
          <Dot delay={0} />
          <Dot delay={180} />
          <Dot delay={360} />
        </View>
        <Text style={styles.label}>Signing you in...</Text>
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
    gap: 80,
  },
  logoGroup: {
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    letterSpacing: -1,
  },
  underline: {
    width: 36,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: T.accent,
  },
  welcomeGroup: {
    alignItems: 'center',
    gap: 16,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textDefault,
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  spinnerGroup: {
    alignItems: 'center',
    gap: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: T.accent,
  },
  label: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
  },
});
