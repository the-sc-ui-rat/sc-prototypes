/**
 * LoginScreen — Flow 1, Screen 2
 * Figma node: 1006:4853
 *
 * SC wordmark top-center, login card vertically centered.
 * Email or username field → Continue (primary) → face scan.
 * "Forgot username?" → tertiary link button.
 */

import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, spacing, radius, typography, component, layout } from '../tokens';
import SCButton from '../components/SCButton';

// Figma: MainContent gap between Logo and Card = 400px in a 1194pt tall frame.
// Scale proportionally so the card sits at ~53% down the screen on any device.
const { height: SCREEN_H } = Dimensions.get('window');
const LOGO_CARD_GAP = Math.round(SCREEN_H * (400 / 1194));

interface Props {
  onContinue: (username: string) => void;
  onForgotUsername?: () => void;
}

export default function LoginScreen({ onContinue, onForgotUsername }: Props) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* SC full logo — Figma: SafetyCulture-Fulllogo-Dark-RGB 1, 137×24px container */}
          <View style={styles.logoWrap}>
            <View style={styles.logoClip}>
              <Image
                source={require('../assets/sc-logo-dark.png')}
                style={styles.logoImg}
                resizeMode="stretch"
                accessibilityLabel="SafetyCulture"
              />
            </View>
          </View>

          {/* Login card — Figma: white card, radius-small(8), shadow/default/large */}
          <View style={styles.card}>

            {/* Figma: Headline/Small — Noto Sans Bold 24/32, ls -0.5 */}
            <Text style={styles.title}>Log in</Text>

            {/* Email or username field */}
            <View style={styles.field}>
              {/* Figma: Label/Medium — 14/20/500, Surface/Text->Default */}
              <Text style={styles.label}>Email or username</Text>
              <TextInput
                style={[
                  styles.input,
                  focused && styles.inputFocused,
                  value.length > 0 && !focused && styles.inputFilled,
                ]}
                value={value}
                onChangeText={setValue}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder=""
                placeholderTextColor={colors.textPlaceholder}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="username"
                returnKeyType="done"
                onSubmitEditing={() => value.trim() && onContinue(value.trim())}
                accessibilityLabel="Email or username"
              />
            </View>

            {/* Continue — primary SCButton, disabled until field has input */}
            <SCButton
              label="Continue"
              variant="primary"
              onPress={() => onContinue(value.trim())}
              disabled={!value.trim()}
              accessibilityLabel="Continue"
            />

            {/* Forgot username — tertiary SCButton */}
            <SCButton
              label="Forgot username?"
              variant="tertiary"
              onPress={onForgotUsername}
              accessibilityLabel="Forgot username?"
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.base,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 56,          // Figma: MainContent y=56 in 1194pt frame
    paddingBottom: spacing.xl,
  },

  // ── Logo ────────────────────────────────────────────────────────────────────
  // Figma: SafetyCulture-Fulllogo-Dark-RGB 1 — 137×24px display (container clips the PNG)
  // PNG is 4096×1098 (natural ratio 3.73:1). Figma renders the asset at 183×49 and
  // clips to 137×24 via overflow:hidden + absolute offset — replicated below.
  logoWrap: {
    marginBottom: LOGO_CARD_GAP,   // Figma: 400px gap in 1194pt frame → proportional
    alignItems: 'center',
  },
  // Figma clip rect: w=137, h=24
  logoClip: {
    width:    137,
    height:   24,
    overflow: 'hidden',
  },
  // Figma image display: w=137*1.3383=183, h=24*2.0496=49, left=-16.89%, top=-54.51%
  // left = -16.89% of container width (137) = -23.1 → -23
  // top  = -54.51% of container height (24)  = -13.1 → -13
  logoImg: {
    position: 'absolute',
    width:    183,
    height:   49,
    left:     -23,
    top:      -13,
  },

  // ── Card ────────────────────────────────────────────────────────────────────
  // Figma: Surface/Background->Default, radius-small(8), Shadow/Default/Large
  card: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingTop:        spacing.lg,    // Figma: pt=24
    paddingBottom:     spacing.xl2,   // Figma: pb=var(--space-10, 40px)
    paddingHorizontal: spacing.md,    // Figma: px=16
    gap: spacing.lg,
    alignItems: 'center',
    // Shadow/Default/Large (primary layer) — iOS only, one shadow per View
    // Figma specifies two layers:
    //   1. 0px 14px 28px rgba(0,0,0,0.16)  ← implemented here
    //   2. 0px 2.4px 8px rgba(0,0,0,0.06)  ← RN limitation: cannot stack shadows
    // Handoff note for Sarina (Compose) and Andrew (SwiftUI):
    //   Compose — use Modifier.shadow() twice or a custom DrawScope layer
    //   SwiftUI — layer two .shadow() modifiers with the above values
    shadowColor:   colors.shadow,
    shadowOffset:  { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius:  28,
    elevation: 8, // Android: approximates combined visual weight of both shadow layers
  },

  // ── Title ───────────────────────────────────────────────────────────────────
  // Figma: Headline/Small — Noto Sans Bold 24/32, ls -0.5, Surface/Text->Default
  title: {
    width:         '100%',
    fontSize:      typography.size.xl,
    fontWeight:    typography.weight.bold,
    lineHeight:    typography.lineHeight.xl,
    letterSpacing: typography.letterSpacing.snug,
    color:         colors.textSurface,
  },

  // ── Field ───────────────────────────────────────────────────────────────────
  field: {
    width: '100%',
    gap: spacing.xs,
  },
  // Figma: Label/Medium — 14/20/500, Surface/Text->Default
  label: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.sm,
    color:      colors.textSurface,
  },
  // Figma: input — Surface/Border->Default border, radius-small(8), height 40
  input: {
    width:       '100%',
    height:      component.inputHeight,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    fontSize:   typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    color:      colors.textSurface,
    backgroundColor: colors.surface,
  },
  inputFocused: {
    borderColor: colors.accent,
  },
  inputFilled: {
    borderColor: colors.accentBorder,
  },
});
