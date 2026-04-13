/**
 * SCButton — SafetyCulture design system button
 *
 * Variants: primary | secondary | tertiary
 * States:   default · hover · pressed · focused · disabled · loading
 *
 * SC StyledButton size="medium":
 *   height: 40px · borderRadius: var(--radius-small, 8px) · font: Label/Medium 14/20/500
 *
 * Touch target: extended to 44pt via hitSlop (SC non-negotiable).
 */

import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, typography, component } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface Props {
  label: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  width?: DimensionValue;
}

export default function SCButton({
  label,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  width = '100%',
}: Props) {
  const isDisabled = disabled || loading;
  const [hovered,  setHovered]  = useState(false);
  const [isFocused, setFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 2,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        hitSlop={{ top: 2, bottom: 2 }}
        style={({ pressed }) => [
          styles.base,

          // ── Variant: primary — accent fill ──────────────────────────────
          variant === 'primary' && [
            styles.primary,
            hovered && !pressed && styles.primaryHover,
            pressed && styles.primaryPressed,
          ],

          // ── Variant: secondary — surface bg, accent border ───────────────
          variant === 'secondary' && [
            styles.secondary,
            hovered && !pressed && styles.secondaryHover,
            pressed && styles.secondaryPressed,
          ],

          // ── Variant: tertiary — no bg, no border, text only ──────────────
          variant === 'tertiary' && [
            styles.tertiary,
            hovered && !pressed && styles.tertiaryHover,
            pressed && styles.tertiaryPressed,
          ],

          // ── Focused: 2px accent ring (tracked via onFocus/onBlur) ─────────
          isFocused && styles.focused,

          // ── Disabled: 45% opacity across all variants ─────────────────────
          isDisabled && styles.disabled,
        ]}
      >
        {({ pressed }) => (
          <View style={[
            styles.inner,
            // Tertiary has less horizontal padding (text-only button)
            variant === 'tertiary' && styles.innerTertiary,
          ]}>
            {loading ? (
              // ── Loading: spinner replaces label ────────────────────────────
              <ActivityIndicator
                size="small"
                color={variant === 'primary' ? colors.onAccent : colors.accentText}
              />
            ) : (
              // ── Label ───────────────────────────────────────────────────────
              <Text style={[
                styles.label,
                variant === 'primary'  && styles.primaryLabel,
                variant === 'secondary' && styles.secondaryLabel,
                variant === 'tertiary'  && styles.tertiaryLabel,
              ]}>
                {label}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

// Inline spacing references (avoids circular import — spacing token not imported here)
const spacing_md = 16;
const spacing_sm = 8;

const styles = StyleSheet.create({

  // ── Base (all variants) ─────────────────────────────────────────────────────
  base: {
    height: component.buttonHeightMedium,  // 40px — StyledButton size="medium"
    borderRadius: radius.sm,               // var(--radius-small, 8px)
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing_md,
  },
  innerTertiary: {
    paddingHorizontal: spacing_sm,
  },

  // ── Primary ─────────────────────────────────────────────────────────────────
  primary: {
    backgroundColor: colors.accent,        // --accent/background-->-default
  },
  primaryHover: {
    backgroundColor: colors.accentHover,   // --accent/background-->-hover
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed, // --accent/background-->-pressed
  },
  primaryLabel: {
    color: colors.onAccent,               // #ffffff
  },

  // ── Secondary ───────────────────────────────────────────────────────────────
  secondary: {
    backgroundColor: colors.surface,       // Surface/Background->Default: #ffffff
    borderWidth: 1,
    borderColor: colors.accentBorder,      // --accent/border-->-default: #564be7
  },
  secondaryHover: {
    backgroundColor: colors.accentBgWeakest, // --accent/background-->-weakest: #ecedfe
  },
  secondaryPressed: {
    backgroundColor: colors.accentBgWeaker,  // --accent/background-->-weaker: #e0e4ff
  },
  secondaryLabel: {
    color: colors.accentText,              // --accent/text-->-default: #4740d4
  },

  // ── Tertiary ────────────────────────────────────────────────────────────────
  tertiary: {
    backgroundColor: 'transparent',
  },
  tertiaryHover: {
    backgroundColor: colors.accentBgWeakest,
  },
  tertiaryPressed: {
    backgroundColor: colors.accentBgWeaker,
  },
  tertiaryLabel: {
    color: colors.accentText,
  },

  // ── Focused ─────────────────────────────────────────────────────────────────
  focused: {
    borderWidth: 2,
    borderColor: colors.accent,
  },

  // ── Disabled ────────────────────────────────────────────────────────────────
  disabled: {
    opacity: 0.45,
  },

  // ── Label: Label/Medium — 14px / 20lh / 500 weight ─────────────────────────
  label: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.sm,
    letterSpacing: typography.letterSpacing.normal,
  },
});
