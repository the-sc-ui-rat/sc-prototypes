import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface ConfirmedUser {
  name: string;
  org: string;
  initials: string;
}

interface Props {
  user: ConfirmedUser;
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

export function IdentityConfirmScreen({ user, onComplete }: Props) {
  const cardY = useSharedValue(160);
  const cardOpacity = useSharedValue(1);

  useEffect(() => {
    // Slide up
    cardY.value = withSpring(0, { damping: 22, stiffness: 160 });
    // Fade out after hold
    cardOpacity.value = withDelay(2000, withTiming(0, { duration: 350 }));

    const timer = setTimeout(onComplete, 2350);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardY.value }],
    opacity: cardOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Liveness brackets — same visual state as FaceScanScreen */}
      <View style={[styles.bracket, styles.bracketTL]} />
      <View style={[styles.bracket, styles.bracketTR]} />
      <View style={[styles.bracket, styles.bracketBL]} />
      <View style={[styles.bracket, styles.bracketBR]} />

      {/* Confirmation card slides up from bottom */}
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.initials}</Text>
          <View style={styles.tickBadge}>
            <Text style={styles.tickMark}>✓</Text>
          </View>
        </View>
        <View style={styles.identity}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.org}>{user.org}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const BRACKET_SIZE = 32;
const BRACKET_THICKNESS = 3;
const BRACKET_COLOR = 'rgba(255,255,255,0.9)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },

  // Reuse same bracket positions as FaceScanScreen
  bracket: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderColor: BRACKET_COLOR,
  },
  bracketTL: { top: 80,  left: 20,  borderTopWidth: BRACKET_THICKNESS, borderLeftWidth: BRACKET_THICKNESS,  borderTopLeftRadius: 4 },
  bracketTR: { top: 80,  right: 20, borderTopWidth: BRACKET_THICKNESS, borderRightWidth: BRACKET_THICKNESS, borderTopRightRadius: 4 },
  bracketBL: { bottom: 180, left: 20,  borderBottomWidth: BRACKET_THICKNESS, borderLeftWidth: BRACKET_THICKNESS,  borderBottomLeftRadius: 4 },
  bracketBR: { bottom: 180, right: 20, borderBottomWidth: BRACKET_THICKNESS, borderRightWidth: BRACKET_THICKNESS, borderBottomRightRadius: 4 },

  // Confirmation card
  card: {
    position: 'absolute',
    bottom: 36,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6559ff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  tickBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  tickMark: {
    fontSize: 11,
    color: '#ffffff',
    fontFamily: 'NotoSans_700Bold',
    lineHeight: 13,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: '#1f2533',
  },
  separator: {
    fontSize: 16,
    color: '#bfc6d4',
    fontFamily: 'NotoSans_400Regular',
  },
  org: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: '#3f495a',
    flex: 1,
  },
});
