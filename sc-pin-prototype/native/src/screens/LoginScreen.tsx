import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { T } from '../tokens';

interface Props {
  onAuthenticated: () => void;
}

const SC_LOGO = 'https://www.figma.com/api/mcp/asset/b9b4a2f7-faa5-4f0f-b900-859223c80123';

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#545f70" strokeWidth="2" />
        <Circle cx="12" cy="12" r="3" stroke="#545f70" strokeWidth="2" />
      </Svg>
    );
  }
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#545f70" strokeWidth="2" strokeLinecap="round" />
      <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#545f70" strokeWidth="2" strokeLinecap="round" />
      <Line x1="1" y1="1" x2="23" y2="23" stroke="#545f70" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function LoginScreen({ onAuthenticated }: Props) {
  const [step, setStep] = useState<'username' | 'password'>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {step === 'password' && (
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep('username')} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: SC_LOGO }} style={styles.logo} resizeMode="contain" />

        <View style={styles.card}>
          <Text style={styles.title}>Log in</Text>

          {step === 'username' ? (
            <>
              <View style={styles.field}>
                <Text style={styles.label}>Email or username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={() => { if (username.trim()) setStep('password'); }}
                  placeholderTextColor="#BFC6D4"
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, !username.trim() && styles.primaryBtnDisabled]}
                onPress={() => { if (username.trim()) setStep('password'); }}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkBtn} activeOpacity={0.7}>
                <Text style={styles.linkText}>Forgot username?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>
                Signing in as <Text style={styles.subtitleBold}>{username}</Text>
              </Text>

              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.input, styles.inputFlex]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={onAuthenticated}
                    placeholderTextColor="#BFC6D4"
                  />
                  <TouchableOpacity
                    style={styles.inputAction}
                    onPress={() => setShowPassword(v => !v)}
                    activeOpacity={0.7}
                  >
                    <EyeIcon visible={showPassword} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={onAuthenticated}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkBtn} activeOpacity={0.7}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  backBtn: { position: 'absolute', top: 52, left: 32, zIndex: 10 },
  backBtnText: { fontSize: 15, color: T.accentText, fontFamily: 'NotoSans_400Regular' },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 32,
  },
  logo: {
    width: 137,
    height: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
    gap: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: '#1f2533',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#3f495a',
    lineHeight: 20,
    marginTop: -8,
  },
  subtitleBold: { fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
  field: { gap: 6 },
  label: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: '#1f2533' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#BFC6D4',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#1f2533',
    backgroundColor: '#ffffff',
  },
  inputFlex: { flex: 1, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  inputAction: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#BFC6D4',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  primaryBtn: {
    height: 40,
    backgroundColor: T.accent,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { fontSize: 14, fontFamily: 'NotoSans_700Bold', color: '#ffffff' },
  linkBtn: { alignItems: 'center', paddingVertical: 4 },
  linkText: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: T.accent },
});
