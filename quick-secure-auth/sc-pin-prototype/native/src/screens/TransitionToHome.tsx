import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { HomeScreen } from './HomeScreen';
import { T } from '../tokens';

const DOT_SIZE = 24;
const S = 5;

interface Props {
  avatarCenter: { x: number; y: number };
  screenOffsetY: number;
  userName: string;
  userInitials: string;
  onSwitchProfile: () => void;
  onComplete: () => void;
}

export function TransitionToHome({
  avatarCenter, screenOffsetY, userName, userInitials, onSwitchProfile, onComplete,
}: Props) {
  const { width: sw, height: sh } = useWindowDimensions();

  const startTxSV = useSharedValue(0);
  const startTySV = useSharedValue(0);
  const ctrlBX    = useSharedValue(0);
  const ctrlBY    = useSharedValue(0);
  const endBX     = useSharedValue(0);
  const endBY     = useSharedValue(0);

  const t             = useSharedValue(0);
  const recoilOffset  = useSharedValue(0);
  const avatarScale   = useSharedValue(S);
  const smearX        = useSharedValue(1);
  const smearY        = useSharedValue(1);
  const initialsOpacity = useSharedValue(1);
  const overlayOpacity  = useSharedValue(1);
  const avatarOpacity   = useSharedValue(1);

  const startFlight = useCallback((px: number, py: number, pw: number, ph: number) => {
    if (pw === 0) return;

    const sTx = avatarCenter.x - DOT_SIZE / 2;
    const sTy = avatarCenter.y - screenOffsetY - DOT_SIZE / 2;
    const eTx = px + pw / 2 - DOT_SIZE / 2;
    const eTy = py - screenOffsetY + ph / 2 - DOT_SIZE / 2;

    startTxSV.value = sTx;
    startTySV.value = sTy;

    const midX = (sTx + eTx) / 2;
    const midY = (sTy + 7 + eTy) / 2;
    const dx   = eTx - sTx;
    const dy   = eTy - (sTy + 7);
    const len  = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / len;
    const perpY =  dx / len;
    const dotP  = perpX * (sw / 2 - midX) + perpY * ((sh - screenOffsetY) / 2 - midY);
    const sign  = dotP > 0 ? 1 : -1;

    const offset = Math.min(40, Math.max(14, len * 0.18));
    ctrlBX.value = midX + sign * perpX * offset;
    ctrlBY.value = midY + sign * perpY * offset;
    endBX.value  = eTx;
    endBY.value  = eTy;

    recoilOffset.value = withTiming(7, {
      duration: 80,
      easing: Easing.out(Easing.back(1.2)),
    });

    t.value = withDelay(80,
      withTiming(1, { duration: 380, easing: Easing.bezier(0.32, 0, 0.2, 1.0) }),
    );

    smearX.value = withDelay(251, withSequence(
      withTiming(0.88, { duration: 16 }),
      withTiming(1.0,  { duration: 24, easing: Easing.out(Easing.quad) }),
    ));
    smearY.value = withDelay(251, withSequence(
      withTiming(1.10, { duration: 16 }),
      withTiming(1.0,  { duration: 24, easing: Easing.out(Easing.quad) }),
    ));

    avatarScale.value = withSequence(
      withTiming(S * 0.72, { duration: 140, easing: Easing.in(Easing.cubic) }),
      withTiming(S * 0.28, { duration: 240, easing: Easing.inOut(Easing.cubic) }),
      withTiming(S * 0.22, { duration: 120, easing: Easing.out(Easing.quad) }),
      withSpring(1, { stiffness: 280, damping: 26, mass: 0.6 }),
    );

    initialsOpacity.value = withDelay(250,
      withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) }),
    );

    overlayOpacity.value = withDelay(240,
      withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) }),
    );

    avatarOpacity.value = withDelay(560,
      withTiming(0, { duration: 100, easing: Easing.in(Easing.quad) }, (finished) => {
        if (finished) runOnJS(onComplete)();
      }),
    );
  }, [avatarCenter, screenOffsetY, sw, sh]);

  const avatarStyle = useAnimatedStyle(() => {
    const ti = t.value;
    const mt = 1 - ti;
    const sY = startTySV.value + recoilOffset.value;
    const bx = mt * mt * startTxSV.value + 2 * mt * ti * ctrlBX.value + ti * ti * endBX.value;
    const by = mt * mt * sY              + 2 * mt * ti * ctrlBY.value + ti * ti * endBY.value;

    return {
      transform: [
        { translateX: bx },
        { translateY: by },
        { scale:  avatarScale.value },
        { scaleX: smearX.value },
        { scaleY: smearY.value },
      ],
      opacity: avatarOpacity.value,
    };
  });

  const initialsStyle = useAnimatedStyle(() => ({
    opacity: initialsOpacity.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <HomeScreen
        userName={userName}
        userInitials={userInitials}
        onSwitchProfile={onSwitchProfile}
        onPillDotMeasured={startFlight}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}
        pointerEvents="none"
      />
      <Animated.View style={[styles.avatar, avatarStyle]} pointerEvents="none">
        <Animated.Text style={[styles.initials, initialsStyle]}>
          {userInitials}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: T.bg },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 8,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
});
