/**
 * FaceIdWidget — ANZ-style Face ID card
 *
 * Fixed dark rounded-square card. Always visible.
 * Idle  : Face ID SVG icon blinks (opacity 1.0→0.45, 900ms sin in-out, loop)
 * Tap   : card micro-compress, icon exits, ellipses enter
 * Scan  : 3 multi-axis rotating ellipses (staggered periods, never sync)
 * Success: ellipses exit → SVG stroke-dashoffset checkmark draws in
 * Return : checkmark fades, icon springs back, idle blink resumes
 *
 * Motion rules (buck-animator spec):
 * - NO Z-only rotation: every ellipse has static rotateX/Y tilt + animated rotateZ
 * - Staggered periods 1900–2600ms, 320ms phase offset per ellipse
 * - Checkmark is SVG stroke-dashoffset draw (not scale pop)
 * - Card micro-compress: scale 1.0→0.97→1.0 on activation
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const GREEN  = '#00ff50';
const CARD_BG = '#0a0a0a';

// Card dimensions
const CARD_SIZE   = 116;
const CARD_RADIUS = 22;

// Face ID frame SVG (from Figma node — viewBox 128.631 × 140.81)
const FRAME_W = 74;
const FRAME_H = Math.round(74 * (140.81 / 128.631)); // ≈ 81

// Face features SVG (viewBox 66.9851 × 68.2914)
const FACE_W = 42;
const FACE_H = Math.round(42 * (68.2914 / 66.9851)); // ≈ 43

// Scanning ellipses — 3 planes, multi-axis tilt, staggered periods
const ELLIPSES = [
  { w: 72, h: 48, r: 36, tiltAxis: 'rotateX', tiltDeg: '35deg', period:  1900, phase:   0 },
  { w: 58, h: 38, r: 29, tiltAxis: 'rotateY', tiltDeg: '28deg', period: -2300, phase: 320 },
  { w: 80, h: 52, r: 40, tiltAxis: 'rotateX', tiltDeg: '52deg', period:  2600, phase: 640 },
];

// Checkmark — two-segment SVG stroke-dashoffset draw
const CK = CARD_SIZE;
const TICK_SMALL_D   = `M ${CK * 0.28} ${CK * 0.52} L ${CK * 0.42} ${CK * 0.66}`;
const TICK_LARGE_D   = `M ${CK * 0.42} ${CK * 0.66} L ${CK * 0.72} ${CK * 0.36}`;
const TICK_SMALL_LEN = 22;
const TICK_LARGE_LEN = 44;

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Phase = 'idle' | 'scanning' | 'success';

interface Props {
  onAuthSuccess?: () => void;
}

export default function FaceIdWidget({ onAuthSuccess }: Props) {
  const [phase, setPhase]           = useState<Phase>('idle');
  const [reduceMotion, setReduceMotion] = useState(false);

  // Card scale (micro-compress on tap)
  const cardScale = useRef(new Animated.Value(1)).current;

  // Face ID icon opacity (blink + exit/entry)
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const iconScale   = useRef(new Animated.Value(1)).current;

  // Ellipses
  const ellipseFade = useRef(new Animated.Value(0)).current;
  const rots        = useRef(ELLIPSES.map(() => new Animated.Value(0))).current;
  const pulses      = useRef(ELLIPSES.map(() => new Animated.Value(0.6))).current;

  // Checkmark
  const tickSmallOffset = useRef(new Animated.Value(TICK_SMALL_LEN)).current;
  const tickLargeOffset = useRef(new Animated.Value(TICK_LARGE_LEN)).current;
  const tickOpacity     = useRef(new Animated.Value(0)).current;

  // Animation loop refs for cleanup
  const blinkRef = useRef<Animated.CompositeAnimation | null>(null);
  const scanRef  = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  const stopScanAnims = useCallback(() => {
    scanRef.current.forEach(a => a.stop());
    scanRef.current = [];
    ELLIPSES.forEach((_, i) => {
      rots[i].stopAnimation();
      pulses[i].stopAnimation();
    });
  }, [rots, pulses]);

  const startBlink = useCallback(() => {
    blinkRef.current?.stop();
    if (reduceMotion) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(iconOpacity, {
          toValue: 0.45,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1.0,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    blinkRef.current = loop;
    loop.start();
  }, [iconOpacity, reduceMotion]);

  const runScan = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('scanning');
    blinkRef.current?.stop();

    // Reset checkmark
    tickSmallOffset.setValue(TICK_SMALL_LEN);
    tickLargeOffset.setValue(TICK_LARGE_LEN);
    tickOpacity.setValue(0);
    ellipseFade.setValue(0);
    rots.forEach(r => r.setValue(0));
    pulses.forEach(p => p.setValue(0.6));

    // 1. Card micro-compress
    Animated.sequence([
      Animated.timing(cardScale, { toValue: 0.97, duration: 80, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(cardScale, { toValue: 1.0,  duration: 100, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // 2. Icon shrinks out
    Animated.parallel([
      Animated.timing(iconOpacity, { toValue: 0, duration: 160, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      Animated.timing(iconScale,   { toValue: 0.8, duration: 160, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => {
      // 3. Ellipses fade in
      Animated.timing(ellipseFade, {
        toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true,
      }).start();

      // 4. Per-ellipse rotation + pulse loops (staggered phase)
      ELLIPSES.forEach((e, i) => {
        const absPeriod = Math.abs(e.period);
        const dir       = e.period > 0 ? 1 : -1;

        const rotLoop = Animated.loop(
          Animated.timing(rots[i], {
            toValue: dir, duration: absPeriod, easing: Easing.linear, useNativeDriver: true,
          })
        );

        const pulseLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(pulses[i], { toValue: 1.0, duration: absPeriod / 2, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.timing(pulses[i], { toValue: 0.6, duration: absPeriod / 2, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          ])
        );

        const combined = Animated.sequence([
          Animated.delay(e.phase),
          Animated.parallel([rotLoop, pulseLoop]),
        ]);
        scanRef.current.push(combined);
        combined.start();
      });

      // 5. After 1800ms scan hold → success
      setTimeout(() => {
        setPhase('success');
        stopScanAnims();

        Animated.timing(ellipseFade, {
          toValue: 0, duration: 220, easing: Easing.in(Easing.ease), useNativeDriver: true,
        }).start(() => {
          // Checkmark draw
          Animated.sequence([
            Animated.timing(tickOpacity, { toValue: 1, duration: 60, useNativeDriver: true }),
            Animated.timing(tickSmallOffset, { toValue: 0, duration: 180, easing: Easing.out(Easing.ease), useNativeDriver: false }),
            Animated.timing(tickLargeOffset, { toValue: 0, duration: 240, easing: Easing.out(Easing.ease), useNativeDriver: false }),
            Animated.delay(600),
            // Checkmark fades out, icon springs back
            Animated.timing(tickOpacity, { toValue: 0, duration: 160, useNativeDriver: true }),
          ]).start(() => {
            // Icon springs back in
            iconScale.setValue(0.8);
            iconOpacity.setValue(0);
            Animated.parallel([
              Animated.spring(iconScale,   { toValue: 1.0, stiffness: 300, damping: 20, useNativeDriver: true }),
              Animated.timing(iconOpacity, { toValue: 1.0, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
            ]).start(() => {
              setPhase('idle');
              startBlink();
              onAuthSuccess?.();
            });
          });
        });
      }, 1800);
    });
  }, [phase, cardScale, iconOpacity, iconScale, ellipseFade, rots, pulses,
      tickSmallOffset, tickLargeOffset, tickOpacity, stopScanAnims, startBlink, onAuthSuccess]);

  // Auto-trigger on mount
  useEffect(() => {
    startBlink();
    const t = setTimeout(runScan, 600);
    return () => {
      clearTimeout(t);
      blinkRef.current?.stop();
      stopScanAnims();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTap = useCallback(() => {
    if (phase === 'idle') runScan();
  }, [phase, runScan]);

  return (
    <TouchableOpacity
      onPress={handleTap}
      activeOpacity={1}
      accessibilityLabel="Sign in with Face ID"
      accessibilityRole="button"
      style={styles.touchable}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>

        {/* Face ID icon — blinks in idle */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.iconContainer,
            { opacity: iconOpacity, transform: [{ scale: iconScale }] },
          ]}
        >
          {/* Corner frame brackets */}
          <Svg
            width={FRAME_W}
            height={FRAME_H}
            viewBox="0 0 128.631 140.81"
            style={styles.frame}
          >
            {/* top-right */}
            <Path
              d="M97.8082 2.4052C113.503 2.4052 126.226 15.1283 126.226 30.8231V36.9127"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
            {/* top-left */}
            <Path
              d="M30.8231 2.4052C15.1283 2.4052 2.4052 15.1283 2.4052 30.8231V36.9127"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
            {/* bottom-left */}
            <Path
              d="M30.8231 138.405C15.1283 138.405 2.4052 125.682 2.4052 109.987V103.898"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
            {/* bottom-right */}
            <Path
              d="M97.8082 138.405C113.503 138.405 126.226 125.682 126.226 109.987V103.898"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
          </Svg>

          {/* Face features — eyes, nose, smile */}
          <Svg
            width={FACE_W}
            height={FACE_H}
            viewBox="0 0 66.9851 68.2914"
            style={styles.face}
          >
            {/* Left eye */}
            <Path
              d="M0 4.0597C0 1.81759 1.81759 0 4.0597 0C6.30181 0 8.1194 1.81759 8.1194 4.0597V18.2687C8.1194 20.5108 6.30181 22.3284 4.0597 22.3284C1.81759 22.3284 0 20.5108 0 18.2687V4.0597Z"
              fill={GREEN}
            />
            {/* Right eye */}
            <Rect x={58.8657} y={0} width={8.1194} height={22.3284} rx={4.0597} fill={GREEN} />
            {/* Nose */}
            <Path
              d="M35.8143 3.04478C35.8143 11.5658 35.8143 14.8223 35.8143 23.3433C35.8143 25.4435 36.2866 33.0842 34.5075 34.5075C33.1547 35.5897 26.048 35.5224 24.3582 35.5224"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
            {/* Smile */}
            <Path
              d="M12.1791 56.8358C13.8243 58.6306 17.6276 61.3774 22.3515 63.5611C31.0068 67.562 41.1891 66.1715 49.2767 61.1206C51.2962 59.8593 53.2164 58.4254 54.806 56.8358"
              stroke={GREEN} strokeWidth={4.8104} strokeLinecap="round" fill="none"
            />
          </Svg>
        </Animated.View>

        {/* Scanning ellipses */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.iconContainer, { opacity: ellipseFade }]}>
          {ELLIPSES.map((e, i) => {
            const rotDeg = rots[i].interpolate({
              inputRange: [-1, 0, 1],
              outputRange: ['-360deg', '0deg', '360deg'],
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.ellipse,
                  {
                    width: e.w,
                    height: e.h,
                    borderRadius: e.r,
                    opacity: pulses[i],
                    transform: [
                      { [e.tiltAxis]: e.tiltDeg } as any,
                      { rotate: rotDeg },
                    ],
                  },
                ]}
              />
            );
          })}
        </Animated.View>

        {/* Checkmark */}
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: tickOpacity }]}>
          <Svg width={CARD_SIZE} height={CARD_SIZE}>
            <AnimatedPath
              d={TICK_SMALL_D}
              stroke={GREEN}
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={TICK_SMALL_LEN}
              strokeDashoffset={tickSmallOffset}
            />
            <AnimatedPath
              d={TICK_LARGE_D}
              stroke={GREEN}
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={TICK_LARGE_LEN}
              strokeDashoffset={tickLargeOffset}
            />
          </Svg>
        </Animated.View>

      </Animated.View>

      <Text style={styles.label}>Face ID</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    gap: 10,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: CARD_RADIUS,
    backgroundColor: CARD_BG,
    overflow: 'hidden',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    position: 'absolute',
  },
  face: {
    position: 'absolute',
  },
  ellipse: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: GREEN,
    backgroundColor: 'transparent',
  },
  label: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    opacity: 0.85,
  },
});
