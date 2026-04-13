import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { T } from '../tokens';

type AuthMethod = 'face' | 'nfc' | 'rfid' | 'qr';

interface Props {
  method: AuthMethod;
  onTryAgain: () => void;
  onDifferentMethod: () => void;
}

const { width } = Dimensions.get('window');

const subText: Record<AuthMethod, string> = {
  face: 'Make sure your face is well-lit and centred in the frame',
  nfc: 'Badge not recognised. Try again or contact your admin',
  rfid: 'Tag not read. Hold it closer to the reader',
  qr: 'QR code could not be verified. Try refreshing the code',
};

export function AuthFailedScreen({ method, onTryAgain, onDifferentMethod }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.errorCircle}>
          <Text style={styles.errorX}>✕</Text>
        </View>

        <Text style={styles.heading}>Couldn't verify your identity</Text>
        <Text style={styles.subtext}>{subText[method]}</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={onTryAgain}>
          <Text style={styles.primaryBtnText}>Try again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={onDifferentMethod}>
          <Text style={styles.secondaryBtnText}>Use a different method</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryBtn}>
          <Text style={styles.tertiaryBtnText}>Contact your admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: T.surface,
    borderRadius: 28,
    padding: 48,
    alignItems: 'center',
    width: Math.min(width - 80, 440),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 8,
  },
  errorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(204,51,64,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2.5,
    borderColor: T.negative,
  },
  errorX: {
    fontSize: 30,
    color: T.negative,
    fontFamily: 'NotoSans_700Bold',
    lineHeight: 34,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 300,
    lineHeight: 22,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: T.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: T.border,
    marginBottom: 12,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textDefault,
  },
  tertiaryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tertiaryBtnText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: T.accentText,
    textDecorationLine: 'underline',
  },
});
