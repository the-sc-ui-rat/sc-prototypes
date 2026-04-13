/**
 * FaceScanScreen — Flow 1, Screen 3
 * Figma node: 1002:7508  |  Frame: 834×1194px
 *
 * Live front-camera feed behind:
 *   • SC light logo — top-centre (node 1019:5968)
 *   • Secondary auth dock — QR Code | Username/Password | NFC (node 1021:5989)
 *
 * Mock engine:
 *   • Tap anywhere on camera area → triggers mock Oloid call → recognized → onSuccess
 *   • Long-press camera area → forces 'failed' state (facilitator override)
 *   • On failure: "Try again" button appears above dock
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors, spacing, typography, component, radius } from '../tokens';
import SCButton from '../components/SCButton';
import { mockFaceAuth, OloidUser } from '../services/oloidMock';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ── Liveness detection frame — Figma node 1066:10594 ──────────────────────────
// Source frame: 834×1194px. Box bounds: left=101, top=184, right=733, bottom=953
// Corner brackets: 80px arm length, 2pt stroke, white
const FIGMA_W    = 834;
const FIGMA_H    = 1194;
const BOX_LEFT   = spacing.xl;                   // matches secondary-auth paddingHorizontal
const BOX_TOP    = SCREEN_H * (184 / FIGMA_H);
const BOX_RIGHT  = spacing.xl;                   // matches secondary-auth paddingHorizontal
const BOX_BOTTOM = SCREEN_H * ((FIGMA_H - 953) / FIGMA_H);
const ARM        = SCREEN_W * (80 / FIGMA_W);   // corner arm length, proportional
const STROKE     = 2;                             // visual stroke width (pt)
const BRACKET_COLOR = 'rgba(255,255,255,0.9)';

// ── Figma: logo node 1019:5968, y=92 in 1194pt frame ─────────────────────────
const LOGO_TOP = Math.round(SCREEN_H * (92 / 1194));
const LOGO_W   = 160;
const LS       = LOGO_W / 369;

// Tri-colour underline bars (Figma node 1019:5969)
const BARS: { left: number; width: number; height: number; color: string }[] = [
  { left: Math.round(172 * LS), width: Math.round(64 * LS), height: 3.5, color: '#6559FF' },
  { left: Math.round(230 * LS), width: Math.round(70 * LS), height: 2.9, color: '#00D1FF' },
  { left: Math.round(295 * LS), width: Math.round(69 * LS), height: 2.3, color: '#FFD700' },
];

function SCLogoLight() {
  return (
    <View style={{ width: LOGO_W, height: 28 }}>
      <Text style={logoStyles.wordmark}>SafetyCulture</Text>
      {BARS.map((bar, i) => (
        <View
          key={i}
          style={[logoStyles.bar, {
            left:            bar.left,
            width:           bar.width,
            height:          bar.height,
            backgroundColor: bar.color,
          }]}
        />
      ))}
    </View>
  );
}

// ── Liveness detection corner brackets ────────────────────────────────────────
// 4 L-shaped brackets at corners of the detection box (Figma node 1066:10594)
function LivenessFrame({ color = BRACKET_COLOR }: { color?: string }) {
  const h = { width: ARM,    height: STROKE, backgroundColor: color } as const;
  const v = { width: STROKE, height: ARM,    backgroundColor: color } as const;
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left:   BOX_LEFT,
        top:    BOX_TOP,
        right:  BOX_RIGHT,
        bottom: BOX_BOTTOM,
      }}
    >
      {/* Top-left */}
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <View style={h} />
        <View style={[v, { position: 'absolute', top: 0, left: 0 }]} />
      </View>
      {/* Top-right */}
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <View style={[h, { alignSelf: 'flex-end' }]} />
        <View style={[v, { position: 'absolute', top: 0, right: 0 }]} />
      </View>
      {/* Bottom-left */}
      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <View style={[h, { position: 'absolute', bottom: 0, left: 0 }]} />
        <View style={[v, { position: 'absolute', bottom: 0, left: 0 }]} />
      </View>
      {/* Bottom-right */}
      <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <View style={[h, { position: 'absolute', bottom: 0, right: 0 }]} />
        <View style={[v, { position: 'absolute', bottom: 0, right: 0 }]} />
      </View>
    </View>
  );
}


type ScanState = 'idle' | 'scanning' | 'recognized' | 'failed';

interface Props {
  onSuccess:           () => void;
  onFallbackQR?:       () => void;
  onFallbackPassword?: () => void;
  onNFC?:              () => void;
}

export default function FaceScanScreen({
  onSuccess,
  onFallbackQR,
  onFallbackPassword,
  onNFC,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [user, setUser]           = useState<OloidUser | null>(null);
  const [scanning, setScanning]   = useState(false);

  const cardAnim = useRef(new Animated.Value(SCREEN_H)).current;

  // Request camera permission on first render
  React.useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const runScan = useCallback(async () => {
    if (scanning || scanState === 'recognized') return;
    setScanning(true);
    setScanState('scanning');

    const result = await mockFaceAuth();

    if (result.success && result.user) {
      setUser(result.user);
      setScanState('recognized');
      Animated.spring(cardAnim, {
        toValue:   0,
        tension:   65,
        friction:  11,
        useNativeDriver: true,
      }).start();
      await delay(2500);
      onSuccess();
    } else {
      setScanState('failed');
    }
    setScanning(false);
  }, [scanning, scanState, cardAnim, onSuccess]);

  const handleRetry = useCallback(() => {
    setUser(null);
    cardAnim.setValue(SCREEN_H);
    setScanState('idle');
  }, [cardAnim]);

  // Long-press → force failure (facilitator override)
  const handleLongPress = useCallback(() => {
    if (scanState === 'recognized' || scanState === 'failed') return;
    setScanState('failed');
    setScanning(false);
  }, [scanState]);

  return (
    <View style={styles.screen}>

      {/* ── Camera layer ────────────────────────────────────────────────────── */}
      {permission?.granted ? (
        <CameraView style={StyleSheet.absoluteFill} facing="front" />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.cameraBg }]} />
      )}

      {/* ── Liveness detection corner brackets ─────────────────────────────── */}
      <LivenessFrame color={scanState === 'recognized' ? colors.positiveBorder : BRACKET_COLOR} />

      {/* ── Tappable camera area — tap to scan, long-press to force fail ─────── */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={runScan}
        onLongPress={handleLongPress}
        delayLongPress={1500}
        accessibilityLabel="Camera area. Tap to scan face."
      />

      {/* ── SC light logo — top-centre ───────────────────────────────────────── */}
      <View style={styles.logoWrap} pointerEvents="none">
        <SCLogoLight />
      </View>

      {/* ── Recognised user card — springs up from bottom ───────────────────── */}
      {scanState === 'recognized' && user && (
        <Animated.View
          style={[styles.confirmCard, { transform: [{ translateY: cardAnim }] }]}
          pointerEvents="none"
        >
          <View style={styles.confirmAvatar}>
            <Text style={styles.confirmAvatarText}>{user.avatarInitials}</Text>
          </View>
          <View style={styles.confirmMeta}>
            <Text style={styles.confirmName}>{user.name}</Text>
            <Text style={styles.confirmRole}>{user.role}</Text>
          </View>
        </Animated.View>
      )}

      {/* ── Failure retry — above dock ───────────────────────────────────────── */}
      {scanState === 'failed' && (
        <View style={styles.retryWrap}>
          <SCButton
            label="Try again"
            variant="primary"
            onPress={handleRetry}
            width={200}
            accessibilityLabel="Try face scan again"
          />
        </View>
      )}

      {/* ── Secondary auth dock — visible on idle only ──────────────────────── */}
      {scanState === 'idle' && (
        <SafeAreaView style={styles.dockSafeArea}>
          <View style={styles.dock}>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign in with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.dockBtnRow}>
              <View style={styles.dockBtnHalf}>
                <SCButton
                  label="QR Code"
                  variant="secondary"
                  onPress={onFallbackQR}
                  accessibilityLabel="Sign in with QR code"
                />
              </View>
              <View style={styles.dockBtnHalf}>
                <SCButton
                  label="Username and password"
                  variant="secondary"
                  onPress={onFallbackPassword}
                  accessibilityLabel="Sign in with username and password"
                />
              </View>
            </View>

            <SCButton
              label="Tap NFC tag at the device"
              variant="tertiary"
              onPress={onNFC}
              accessibilityLabel="Sign in by tapping an NFC tag at the device"
            />

          </View>
        </SafeAreaView>
      )}

      {/* ── Camera permission prompt ─────────────────────────────────────────── */}
      {permission && !permission.granted && (
        <View style={styles.permissionWrap}>
          <Text style={styles.permissionText}>
            Camera access is needed for face sign-in.
          </Text>
          <SCButton
            label="Enable Camera"
            variant="primary"
            onPress={requestPermission}
            width={220}
          />
        </View>
      )}

    </View>
  );
}

// ── Utility ────────────────────────────────────────────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Logo styles ────────────────────────────────────────────────────────────────
const logoStyles = StyleSheet.create({
  wordmark: {
    color:         '#ffffff',
    fontSize:      18,
    fontWeight:    '700',
    letterSpacing: -0.5,
    lineHeight:    22,
  },
  bar: {
    position:     'absolute',
    bottom:       0,
    borderRadius: 1.5,
  },
});

// ── Screen styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  screen: {
    flex:            1,
    backgroundColor: colors.cameraBg,
    alignItems:      'center',
    justifyContent:  'center',
  },

  // Figma: node 1019:5968, y=92 in 1194pt frame
  logoWrap: {
    position:   'absolute',
    top:        LOGO_TOP,
    left:       0,
    right:      0,
    alignItems: 'center',
  },

  // ── Recognised user card ──────────────────────────────────────────────────
  confirmCard: {
    position:              'absolute',
    bottom:                0,
    left:                  0,
    right:                 0,
    flexDirection:         'row',
    alignItems:            'center',
    gap:                   spacing.md,
    backgroundColor:       colors.surface,
    borderTopLeftRadius:   radius.lg,
    borderTopRightRadius:  radius.lg,
    paddingHorizontal:     spacing.xl,
    paddingTop:            spacing.lg,
    paddingBottom:         spacing.xxl,
    shadowColor:           colors.shadow,
    shadowOffset:          { width: 0, height: -6 },
    shadowOpacity:         0.18,
    shadowRadius:          20,
    elevation:             16,
  },
  confirmAvatar: {
    width:           component.avatarXl,
    height:          component.avatarXl,
    borderRadius:    component.avatarXl / 2,
    backgroundColor: colors.positiveBorder,
    alignItems:      'center',
    justifyContent:  'center',
  },
  confirmAvatarText: {
    color:      colors.onAccent,
    fontSize:   typography.size.md,
    fontWeight: typography.weight.bold,
  },
  confirmMeta: {
    flex: 1,
    gap:  spacing.xxs,
  },
  confirmName: {
    color:      colors.textSurface,
    fontSize:   typography.size.title,
    fontWeight: typography.weight.bold,
  },
  confirmRole: {
    color:      colors.textSurfaceWeak,
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.regular,
  },

  // ── Failure retry ─────────────────────────────────────────────────────────
  retryWrap: {
    position:   'absolute',
    bottom:     SCREEN_H * 0.24,
    left:       0,
    right:      0,
    alignItems: 'center',
  },

  // ── Secondary auth dock ───────────────────────────────────────────────────
  dockSafeArea: {
    position: 'absolute',
    bottom:   0,
    left:     0,
    right:    0,
  },
  dock: {
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.lg,
    paddingBottom:     spacing.md,
    gap:               spacing.sm,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },
  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dividerText: {
    color:         '#ffffff',
    fontSize:      typography.size.md,
    fontWeight:    typography.weight.medium,
    lineHeight:    typography.lineHeight.md,
    letterSpacing: typography.letterSpacing.normal,
  },
  dockBtnRow: {
    flexDirection: 'row',
    gap:           spacing.sm,
  },
  dockBtnHalf: {
    flex: 1,
  },

  // ── Camera permission prompt ──────────────────────────────────────────────
  permissionWrap: {
    position:          'absolute',
    inset:             0,
    alignItems:        'center',
    justifyContent:    'center',
    gap:               spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor:   'rgba(0,0,0,0.7)',
  },
  permissionText: {
    color:     '#ffffff',
    fontSize:  typography.size.md,
    textAlign: 'center',
    opacity:   0.85,
  },
});
