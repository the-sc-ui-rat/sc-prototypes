import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions,
} from 'react-native';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

interface Props {
  onAuthenticated: () => void;
  onBack: () => void;
}

const ORG_NAME = 'Glencore Mining';
const ORG_ID = '93463472';

function EyeIcon({ visible, color }: { visible: boolean; color: string }) {
  if (visible) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2" />
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      </Svg>
    );
  }
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function CopyIcon({ color }: { color: string }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Rect x="9" y="9" width="13" height="13" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}


export function PasswordLoginScreen({ onAuthenticated, onBack }: Props) {
  const { width } = useWindowDimensions();
  const cardMaxWidth = width >= 768 ? 520 : 400;
  const scrollPad = Math.max(16, (width - cardMaxWidth) / 2);
  const [step, setStep] = useState<'username' | 'password'>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    if (username.trim()) setStep('password');
  };

  const handleBack = () => {
    if (step === 'password') setStep('username');
    else onBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
        <Text style={styles.backBtnText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingHorizontal: scrollPad }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>SafetyCulture</Text>
          <View style={styles.logoLine} />
        </View>

        {/* Card */}
        <View style={[styles.card, { maxWidth: cardMaxWidth }]}>
          {step === 'username' ? (
            <>
              <Text style={styles.title}>Log in</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Email or username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                  placeholderTextColor="rgba(84,95,112,0.4)"
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, !username.trim() && styles.primaryBtnDisabled]}
                onPress={handleContinue}
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
              <Text style={styles.title}>Log in</Text>

              <Text style={styles.subtitle}>
                Log in to <Text style={styles.subtitleBold}>{ORG_NAME}</Text> as{' '}
                <Text style={styles.subtitleBold}>{username}</Text>
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
                    placeholderTextColor="rgba(84,95,112,0.4)"
                  />
                  <TouchableOpacity
                    style={styles.inputAction}
                    onPress={() => setShowPassword(v => !v)}
                    activeOpacity={0.7}
                  >
                    <EyeIcon visible={showPassword} color="#545f70" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Organisation ID</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.input, styles.inputFlex, styles.inputDisabled]}
                    value={ORG_ID}
                    editable={false}
                    placeholderTextColor="rgba(84,95,112,0.4)"
                  />
                  <TouchableOpacity style={styles.inputAction} activeOpacity={0.7}>
                    <CopyIcon color="#545f70" />
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
  root: {
    flex: 1,
    backgroundColor: '#e9edf6',
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: 32,
    zIndex: 10,
  },
  backBtnText: {
    fontSize: 15,
    color: '#4740d4',
    fontFamily: 'NotoSans_400Regular',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },

  // Logo
  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logo: { fontSize: 22, fontFamily: 'NotoSans_700Bold', color: '#1f2533', letterSpacing: -0.3 },
  logoLine: { marginTop: 4, width: 32, height: 2.5, borderRadius: 2, backgroundColor: '#6559ff' },

  // Card
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    gap: 20,
  },

  title: { fontSize: 24, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },

  // Subtitle
  subtitle: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: '#3f495a', lineHeight: 20, marginTop: -8 },
  subtitleBold: { fontFamily: 'NotoSans_700Bold', color: '#1f2533' },

  // Fields
  field: { gap: 6 },
  label: { fontSize: 14, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: '#1f2533',
    backgroundColor: '#ffffff',
  },
  inputFlex: { flex: 1, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  inputDisabled: { backgroundColor: '#f2f3f7', color: '#545f70' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  inputAction: {
    height: 44,
    width: 44,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#dbe0eb',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  // Buttons
  primaryBtn: {
    height: 48,
    backgroundColor: '#6559ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { fontSize: 16, fontFamily: 'NotoSans_700Bold', color: '#ffffff' },
  linkBtn: { alignItems: 'center', paddingVertical: 4 },
  linkText: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: '#6559ff' },
});
