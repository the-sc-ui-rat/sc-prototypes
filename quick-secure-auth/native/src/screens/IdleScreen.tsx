import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { T } from '../tokens';
import { WorkersIllustration } from './WorkersIllustration';

interface Props {
  onFaceScan: () => void;
  onQRScan: () => void;
  onPassword: () => void;
  onNFC: () => void;
  onRFID: () => void;
}

const CONTENT_MAX = 560;

function FaceIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="2" />
      <Circle cx="12" cy="9.5" r="2.5" stroke="#ffffff" strokeWidth="2" />
      <Path d="M6 19c1-3 3-4.5 6-4.5s5 1.5 6 4.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function QRIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <Rect x="14" y="14" width="2.5" height="2.5" rx="0.5" fill={color} />
      <Rect x="18.5" y="14" width="2.5" height="2.5" rx="0.5" fill={color} />
      <Rect x="14" y="18.5" width="2.5" height="2.5" rx="0.5" fill={color} />
      <Rect x="18.5" y="18.5" width="2.5" height="2.5" rx="0.5" fill={color} />
    </Svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Circle cx="12" cy="16" r="1.5" fill={color} />
    </Svg>
  );
}

function NFCIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="1.5" fill={color} />
      <Path d="M9.17 9.17a4 4 0 0 0 0 5.66" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M14.83 9.17a4 4 0 0 1 0 5.66" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M6.34 6.34a8 8 0 0 0 0 11.32" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M17.66 6.34a8 8 0 0 1 0 11.32" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function RFIDIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="6" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <Rect x="5" y="10" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5" />
      <Path d="M15 10.5a2.5 2.5 0 0 1 0 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M17.5 8.5a5.5 5.5 0 0 1 0 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IdleScreen({ onFaceScan, onQRScan, onPassword, onNFC, onRFID }: Props) {
  const { width } = useWindowDimensions();
  const hPad = Math.max(24, (width - CONTENT_MAX) / 2);
  const usableWidth = width - hPad * 2;
  const illustrationSize = Math.min(324, Math.round(usableWidth * 0.578));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: T.bg }}
      contentContainerStyle={[styles.container, { paddingHorizontal: hPad }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topGroup}>
        <View style={styles.titleImage}>
          <Text style={styles.headline}>
            {'Create checklists.\nConduct inspections\nGenerate and share reports.'}
          </Text>
          <WorkersIllustration size={illustrationSize} />
        </View>
        <Text style={styles.selectLabel}>Select your login method</Text>
      </View>

      <View style={styles.ctas}>
        <AuthButton isPrimary onPress={onFaceScan} icon={<FaceIcon />} label="Facial Recognition" />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <AuthButton onPress={onQRScan} icon={<QRIcon color={T.accentText} />} label="QR Code" />
        <AuthButton onPress={onPassword} icon={<LockIcon color={T.accentText} />} label="Username and password" />
        <AuthButton onPress={onNFC} icon={<NFCIcon color={T.accentText} />} label="NFC tag" />
        <AuthButton onPress={onRFID} icon={<RFIDIcon color={T.accentText} />} label="RFID badge" />
      </View>
    </ScrollView>
  );
}

function AuthButton({
  isPrimary,
  onPress,
  icon,
  label,
}: {
  isPrimary?: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, isPrimary ? styles.primaryBtn : styles.secondaryBtn]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.btnIcon}>{icon}</View>
      <Text style={[styles.btnText, isPrimary ? styles.primaryBtnText : styles.secondaryBtnText]}>
        {label}
      </Text>
      <View style={styles.btnIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: T.bg,
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 48,
    gap: 32,
  },
  topGroup: {
    alignItems: 'center',
    gap: 40,
  },
  titleImage: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  headline: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -1,
  },
  selectLabel: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textDefault,
    textAlign: 'center',
  },
  ctas: {
    gap: 8,
  },
  btn: {
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: T.accent,
  },
  secondaryBtn: {
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: '#dbe0eb',
  },
  btnIcon: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
  },
  primaryBtnText: { color: '#ffffff' },
  secondaryBtnText: { color: T.accentText },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#dbe0eb' },
  dividerText: { fontSize: 16, fontFamily: 'NotoSans_400Regular', color: T.textWeaker },
});
