import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { T } from '../tokens';
import { WorkersIllustration } from './WorkersIllustration';

export interface LastUser {
  name: string;
  email: string;
  initials: string;
}

interface Props {
  lastUser: LastUser;
  onContinueAsUser: () => void;
  onLoginAnother: () => void;
}

const CONTENT_WIDTH = 560;

export function IdleAfterAuthScreen({ lastUser, onContinueAsUser, onLoginAnother }: Props) {
  const { width } = useWindowDimensions();
  const hPad = Math.max(24, (width - CONTENT_WIDTH) / 2);
  const illustrationSize = Math.min(240, Math.round((width - hPad * 2) * 0.43));

  return (
    <View style={[styles.container, { paddingHorizontal: hPad }]}>
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.titleGroup}>
            <Text style={styles.title}>Log back in</Text>
            <Text style={styles.subtitle}>
              Continue with {lastUser.name} or log in to another account
            </Text>
          </View>
          <WorkersIllustration size={illustrationSize} />
        </View>

        <View style={styles.ctas}>
          <TouchableOpacity style={styles.userCard} onPress={onContinueAsUser} activeOpacity={0.85}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{lastUser.initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{lastUser.name}</Text>
              <Text style={styles.userEmail}>{lastUser.email}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.button} onPress={onLoginAnother} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Log in to another account</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 40,
  },
  top: {
    alignItems: 'center',
    gap: 24,
  },
  titleGroup: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textDefault,
    textAlign: 'center',
  },
  ctas: {
    width: '100%',
    gap: 8,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: T.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
  },
  chevron: {
    fontSize: 22,
    color: T.textPlaceholder,
    fontFamily: 'NotoSans_400Regular',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: T.border,
    borderRadius: 4,
  },
  dividerText: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: T.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
});
