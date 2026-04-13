/**
 * IdleLockScreen — Flow 2, Screen 1
 * Figma node: shared-idle
 *
 * Idle / lock state for shared device.
 * Last signed-in user chip, Face ID CTA, secondary auth row.
 */

import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors, spacing, radius, typography, component } from '../tokens';

const { width: SCREEN_W } = Dimensions.get('window');

// Face ID icon rendered in SC accent — corner brackets + face features
function FaceIdIcon({ size = 72, color = colors.accent }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Corner brackets */}
      <Svg
        width={size}
        height={size * (140.81 / 128.631)}
        viewBox="0 0 128.631 140.81"
        style={{ position: 'absolute' }}
      >
        <Path d="M97.8082 2.4052C113.503 2.4052 126.226 15.1283 126.226 30.8231V36.9127"
          stroke={color} strokeWidth={5.5} strokeLinecap="round" fill="none" />
        <Path d="M30.8231 2.4052C15.1283 2.4052 2.4052 15.1283 2.4052 30.8231V36.9127"
          stroke={color} strokeWidth={5.5} strokeLinecap="round" fill="none" />
        <Path d="M30.8231 138.405C15.1283 138.405 2.4052 125.682 2.4052 109.987V103.898"
          stroke={color} strokeWidth={5.5} strokeLinecap="round" fill="none" />
        <Path d="M97.8082 138.405C113.503 138.405 126.226 125.682 126.226 109.987V103.898"
          stroke={color} strokeWidth={5.5} strokeLinecap="round" fill="none" />
      </Svg>

      {/* Face features */}
      <Svg
        width={size * 0.52}
        height={size * 0.52 * (68.2914 / 66.9851)}
        viewBox="0 0 66.9851 68.2914"
        style={{ position: 'absolute' }}
      >
        <Path
          d="M0 4.0597C0 1.81759 1.81759 0 4.0597 0C6.30181 0 8.1194 1.81759 8.1194 4.0597V18.2687C8.1194 20.5108 6.30181 22.3284 4.0597 22.3284C1.81759 22.3284 0 20.5108 0 18.2687V4.0597Z"
          fill={color} />
        <Rect x={58.8657} y={0} width={8.1194} height={22.3284} rx={4.0597} fill={color} />
        <Path
          d="M35.8143 3.04478C35.8143 11.5658 35.8143 14.8223 35.8143 23.3433C35.8143 25.4435 36.2866 33.0842 34.5075 34.5075C33.1547 35.5897 26.048 35.5224 24.3582 35.5224"
          stroke={color} strokeWidth={5} strokeLinecap="round" fill="none" />
        <Path
          d="M12.1791 56.8358C13.8243 58.6306 17.6276 61.3774 22.3515 63.5611C31.0068 67.562 41.1891 66.1715 49.2767 61.1206C51.2962 59.8593 53.2164 58.4254 54.806 56.8358"
          stroke={color} strokeWidth={5} strokeLinecap="round" fill="none" />
      </Svg>
    </View>
  );
}

// Last signed-in user — pulled from session store in production
const LAST_USER = { initials: 'AT', name: 'Austin Turner', signedOutAt: '2h ago' };

function LastUserChip() {
  return (
    <View style={styles.lastUserChip}>
      <View style={styles.lastUserAvatar}>
        <Text style={styles.lastUserInitials}>{LAST_USER.initials}</Text>
      </View>
      <View>
        <Text style={styles.lastUserName}>{LAST_USER.name}</Text>
        <Text style={styles.lastUserTime}>Signed out {LAST_USER.signedOutAt}</Text>
      </View>
    </View>
  );
}

interface Props {
  onStartFaceScan: () => void;
  onQRCode?: () => void;
  onPassword?: () => void;
}

export default function IdleLockScreen({ onStartFaceScan, onQRCode, onPassword }: Props) {
  const isTablet = SCREEN_W >= 600;
  const iconSize = isTablet ? 96 : 72;

  return (
    <SafeAreaView style={styles.screen}>

      {/* Wordmark */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>SafetyCulture</Text>
      </View>

      {/* Last signed-in user */}
      <LastUserChip />

      {/* Main card */}
      <View style={styles.card}>

        <View style={styles.iconWrap}>
          <FaceIdIcon size={iconSize} color={colors.accent} />
        </View>

        <Text style={styles.title}>Sign in with Face ID</Text>
        <Text style={styles.subtitle}>Tap the button below to authenticate</Text>

        {/* Primary CTA — size="large" (48px), accent fill */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && styles.primaryBtnPressed,
          ]}
          onPress={onStartFaceScan}
          accessibilityLabel="Sign in with Face ID"
          accessibilityRole="button"
          hitSlop={{ top: 0, bottom: 0 }}
        >
          <Text style={styles.primaryBtnText}>Sign in with Face ID</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Secondary auth methods — custom pill row (not SCButton — split pill pattern) */}
        <View style={styles.secondaryRow}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && styles.secondaryBtnPressed,
            ]}
            onPress={onQRCode}
            accessibilityLabel="Use QR code"
            accessibilityRole="button"
          >
            <Text style={styles.secondaryBtnText}>QR Code</Text>
          </Pressable>

          <View style={styles.secondaryDivider} />

          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && styles.secondaryBtnPressed,
            ]}
            onPress={onPassword}
            accessibilityLabel="Use username and password"
            accessibilityRole="button"
          >
            <Text style={styles.secondaryBtnText}>Username & Password</Text>
          </Pressable>
        </View>

      </View>

      {/* Device footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Shared device · Workshop Floor</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  wordmark: {
    fontSize:      typography.size.xl,
    fontWeight:    typography.weight.bold,
    color:         colors.textSurface,
    letterSpacing: typography.letterSpacing.snug,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    shadowColor:   colors.shadow,
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius:  12,
    elevation: 3,
  },
  iconWrap: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize:      typography.size.xl,
    fontWeight:    typography.weight.bold,
    color:         colors.textSurface,
    textAlign:     'center',
    letterSpacing: typography.letterSpacing.snug,
  },
  subtitle: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.regular,
    color:      colors.textSurfaceWeaker,
    textAlign:  'center',
    marginBottom: spacing.sm,
  },

  // ── Primary CTA — SC StyledButton size="large" (48px) ───────────────────────
  primaryBtn: {
    width: '100%',
    height: component.buttonHeightLarge,   // 48px — size="large"
    backgroundColor: colors.accent,
    borderRadius: radius.sm,               // var(--radius-small, 8px)
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  primaryBtnPressed: {
    backgroundColor: colors.accentPressed, // --accent/background-->-pressed
  },
  primaryBtnText: {
    color:      colors.onAccent,
    fontSize:   typography.size.md,        // Label/Large — 16/24/600
    fontWeight: typography.weight.semibold,
    lineHeight: typography.lineHeight.md,
  },

  // ── Divider ──────────────────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderWeak,    // --surface/border-->-weak
  },
  dividerText: {
    fontSize:   typography.size.xs,
    color:      colors.textSurfaceWeaker,
    fontWeight: typography.weight.medium,
  },

  // ── Secondary auth row — split pill ──────────────────────────────────────────
  secondaryRow: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderWeak,        // --surface/border-->-weak
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  secondaryBtn: {
    flex: 1,
    height: component.buttonHeightLarge,   // 48px for visual comfort in split pill
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  secondaryBtnPressed: {
    backgroundColor: colors.accentBgWeakest, // --accent/background-->-weakest tint on press
  },
  secondaryDivider: {
    width: 1,
    backgroundColor: colors.borderWeak,
    alignSelf: 'stretch',
  },
  secondaryBtnText: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    color:      colors.textSurface,
    textAlign:  'center',
  },

  // ── Last user chip ───────────────────────────────────────────────────────────
  lastUserChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    shadowColor:   colors.shadow,
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius:  6,
    elevation: 2,
  },
  lastUserAvatar: {
    width:        component.avatarMd,      // 32px
    height:       component.avatarMd,
    borderRadius: component.avatarMd / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastUserInitials: {
    color:      colors.onAccent,
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.bold,
  },
  lastUserName: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.semibold,
    color:      colors.textSurface,
  },
  lastUserTime: {
    fontSize: typography.size.xs,
    color:    colors.textSurfaceWeaker,
  },

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    paddingBottom: spacing.sm,
  },
  footerText: {
    fontSize:  typography.size.xs,
    color:     colors.textSurfaceWeaker,
    textAlign: 'center',
  },
});
