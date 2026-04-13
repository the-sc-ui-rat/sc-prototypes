/**
 * WelcomeScreen — Flow 1, Screen 1
 * Figma node: 870:7672  |  Frame: 834×1194px
 *
 * Entry point for personal device / first-use auth.
 * Shows SC illustration + tagline + "Sign up for free" / "Log in" CTAs.
 *
 * Layout:
 *   Figma positions MainContent starting at y=332.5 in a 1194px frame = 27.8% from top.
 *   We replicate this with paddingTop: '28%' + flex-start so the content block starts
 *   at the same proportional offset on any screen height (iPad or phone).
 *   Illustration + CTAs stay grouped — no space-between stretching.
 */

import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFonts, NotoSans_700Bold } from '@expo-google-fonts/noto-sans';
import { colors, spacing } from '../tokens';
import SCButton from '../components/SCButton';

const illustration = require('../assets/illustration.png');

const { width: SCREEN_W } = Dimensions.get('window');

// Figma: MainContent width=560px (node 1006:4769). Scale to screen width.
const CONTENT_W   = Math.min(SCREEN_W - spacing.xl * 2, 560);
const ILLUS_SCALE = CONTENT_W / 560;
const ILLUS_SIZE  = Math.round(324 * ILLUS_SCALE);

// Figma: 229px gap between Title-image and CTAs (within 560px column). Scale proportionally.
const CTA_GAP = Math.round(229 * ILLUS_SCALE);

interface Props {
  onLogin: () => void;
  onSignUp?: () => void;
}

export default function WelcomeScreen({ onLogin, onSignUp }: Props) {
  const [fontsLoaded] = useFonts({ NotoSans_700Bold });

  if (!fontsLoaded) return <View style={styles.screen} />;

  return (
    <SafeAreaView style={styles.screen}>

      {/*
        Figma: MainContent starts at y=332.5 in a 1194px frame = 27.8% from top.
        paddingTop: '28%' replicates this proportional offset across all screen heights.
        justifyContent: flex-start keeps the content grouped as a unit (no stretching).
      */}
      <View style={styles.content}>

        {/* Title-image block: tagline above, illustration below */}
        <View style={styles.titleImage}>
          <Text style={styles.tagline}>
            {'Create checklists.\nConduct inspections.\nGenerate and share reports.'}
          </Text>

          <Image
            source={illustration}
            style={{ width: ILLUS_SIZE, height: ILLUS_SIZE }}
            resizeMode="contain"
            accessibilityLabel="Two SafetyCulture workers in high-vis gear"
          />
        </View>

        {/* CTAs — 229px gap (scaled) below illustration block */}
        <View style={[styles.ctas, { marginTop: CTA_GAP }]}>
          <SCButton
            label="Sign up for free"
            variant="primary"
            onPress={onSignUp}
            accessibilityLabel="Sign up for free"
          />
          <SCButton
            label="Log in"
            variant="secondary"
            onPress={onLogin}
            accessibilityLabel="Log in"
          />
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.base,
  },
  // Figma: MainContent y=332.5 / frame height 1194 = 27.8% from top.
  // paddingTop: '28%' replicates this on any device height.
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingTop: '28%',
    paddingBottom: spacing.xl,
    maxWidth: 560,  // Figma: MainContent width=560 (node 1006:4769)
    width: '100%',
    alignSelf: 'center',
  },
  titleImage: {
    alignItems: 'center',
    gap: spacing.md,   // Figma: gap-[16px] between tagline and illustration
  },
  // Figma: Headline/Large — Noto Sans Bold, 34px, lh 40, ls -1px, #1f2533, center
  tagline: {
    fontFamily: 'NotoSans_700Bold',
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1,
    color: colors.textSurface,
    textAlign: 'center',
  },
  ctas: {
    width: '100%',
    gap: 12,   // Figma: var(--space-3, 12px) between buttons
  },
});
