import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { T } from '../tokens';

interface Props {
  onComplete: () => void;
  onNotYou: () => void;
}

const { width } = Dimensions.get('window');

export function IdentityConfirmScreen({ onComplete, onNotYou }: Props) {
  const tickScale = useSharedValue(0);
  const tickOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(24);

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 400 });
    cardTranslateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    tickScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 180 }));
    tickOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    progressWidth.value = withDelay(500, withTiming(1, { duration: 2000 }));

    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, []);

  const tickStyle = useAnimatedStyle(() => ({
    transform: [{ scale: tickScale.value }],
    opacity: tickOpacity.value,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as `${number}%`,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>JD</Text>
          </View>
          <Animated.View style={[styles.tickBadge, tickStyle]}>
            <Text style={styles.tickMark}>✓</Text>
          </Animated.View>
        </View>

        <Text style={styles.name}>John Davies</Text>
        <Text style={styles.role}>Underground Operator · Glencore Mining</Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>

        <Text style={styles.enteringText}>Entering SafetyCulture…</Text>

        <TouchableOpacity onPress={onNotYou} style={styles.notYouBtn}>
          <Text style={styles.notYouText}>Not you?</Text>
        </TouchableOpacity>
      </Animated.View>
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
  card: {
    backgroundColor: T.surface,
    borderRadius: 28,
    padding: 48,
    alignItems: 'center',
    width: Math.min(width - 80, 440),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 8,
  },
  avatarWrapper: {
    marginBottom: 28,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 36,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  tickBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: T.surface,
  },
  tickMark: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'NotoSans_700Bold',
    lineHeight: 18,
  },
  name: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    marginBottom: 8,
    textAlign: 'center',
  },
  role: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    marginBottom: 36,
    textAlign: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: T.bg,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: T.accent,
    borderRadius: 2,
  },
  enteringText: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    marginBottom: 24,
  },
  notYouBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  notYouText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: T.accentText,
    textDecorationLine: 'underline',
  },
});
