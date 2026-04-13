/**
 * ConfirmationScreen — Flow 1, Screen 4
 * Figma node: 1035:6952
 *
 * Simulated camera bg + dark gradient overlay.
 * SC wordmark (white) at top.
 * Confirmation card slides up from bottom, auto-advances after 2.5s.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing, radius, typography, component } from '../tokens';

const { height: SCREEN_H } = Dimensions.get('window');

// Mocked confirmed user — production: comes from Oloid face match response
const CONFIRMED_USER = {
  name:     'Jane Smith',
  email:    'jane.smith@tolka.org',
  initials: 'JS',
};

interface Props {
  onComplete: () => void;
}

export default function ConfirmationScreen({ onComplete }: Props) {
  const slideAnim = useRef(new Animated.Value(SCREEN_H * 0.4)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.safeArea}>

        {/* Simulated camera — dark fill (camera is mocked per project decisions) */}
        <View style={styles.cameraLayer} />
        {/* Figma: gradient from transparent ~66% → rgba(0,0,0,0.8) ~85% */}
        <View style={styles.gradientOverlay} />

        {/* SC wordmark — light variant on dark camera bg */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>SafetyCulture</Text>
        </View>

        {/* Confirmation card — slides up from bottom */}
        <Animated.View
          style={[styles.cardWrap, { transform: [{ translateY: slideAnim }] }]}
        >
          {/*
            Figma: Confirmation-card
              bg:     --positive/background-->-weakest (#e8fcf5)
              border: 2px --positive/background-->-hover (#1eae7e)
              radius: var(--radius-large, 16px)
              shadow: Shadow/Default/xSmall
          */}
          <View style={styles.card}>

            {/* Avatar — Figma: xlarge, shows user photo; prototype uses initials */}
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>{CONFIRMED_USER.initials}</Text>
            </View>

            <View style={styles.userInfo}>
              {/* Figma: Title/Medium — Noto Sans SemiBold 18/24 */}
              <Text style={styles.welcomeText}>
                Welcome back {CONFIRMED_USER.name}
              </Text>
              {/* Figma: Label/Small — Noto Sans Medium 12/16, Surface/Text->Weaker */}
              <Text style={styles.emailText}>{CONFIRMED_USER.email}</Text>
            </View>

          </View>
        </Animated.View>

      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cameraBg,
  },
  safeArea: {
    flex: 1,
  },
  cameraLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.cameraBg,
  },
  gradientOverlay: {
    position:  'absolute',
    bottom:    0,
    left:      0,
    right:     0,
    height:    '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  wordmark: {
    fontSize:      typography.size.xl,
    fontWeight:    typography.weight.bold,
    lineHeight:    typography.lineHeight.xl,
    letterSpacing: typography.letterSpacing.snug,
    color:         colors.onAccent,   // white on dark camera bg
  },

  // ── Card ────────────────────────────────────────────────────────────────────
  cardWrap: {
    position: 'absolute',
    bottom:   spacing.xl,
    left:     spacing.lg,
    right:    spacing.lg,
  },
  card: {
    backgroundColor: colors.positiveBg,     // --positive/background-->-weakest
    borderWidth:     2,
    borderColor:     colors.positiveBorder,  // --positive/background-->-hover
    borderRadius:    radius.lg,              // var(--radius-large, 16px)
    paddingVertical:    20,                  // Figma: var(--space-5, 20px)
    paddingHorizontal:  spacing.md,          // Figma: var(--space-3, 12px) → closest = md
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    // Shadow/Default/xSmall
    shadowColor:   colors.shadow,
    shadowOffset:  { width: 0, height: 1.6 },
    shadowOpacity: 0.09,
    shadowRadius:  6,
    elevation: 3,
  },

  // ── Avatar ──────────────────────────────────────────────────────────────────
  avatar: {
    width:        component.avatarLg,  // 48px — xlarge avatar
    height:       component.avatarLg,
    borderRadius: component.avatarLg / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarInitials: {
    color:      colors.onAccent,
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.bold,
  },

  // ── User info ───────────────────────────────────────────────────────────────
  userInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  // Figma: Title/Medium — Noto Sans SemiBold 18/24
  welcomeText: {
    fontSize:   typography.size.title,
    fontWeight: typography.weight.semibold,
    lineHeight: typography.lineHeight.title,
    color:      colors.textSurface,
  },
  // Figma: Label/Small — Noto Sans Medium 12/16, Surface/Text->Weaker
  emailText: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.xs,
    color:      colors.textSurfaceWeaker,
  },
});
