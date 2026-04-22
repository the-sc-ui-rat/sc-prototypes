import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, useWindowDimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T } from '../tokens';
import { WorkersIllustration } from './WorkersIllustration';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  accentColor: string;
}

interface Props {
  users: StoredUser[];
  onSelectUser: (user: StoredUser) => void;
  onLoginViaEmail: () => void;
}

const CONTENT_MAX = 560;

function SearchIcon() {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={T.textPlaceholder} strokeWidth="2" />
      <Path d="M21 21l-4.35-4.35" stroke={T.textPlaceholder} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function UserCard({ user, onPress }: { user: StoredUser; onPress: () => void }) {
  return (
    <View style={card.wrap}>
      <View style={[card.avatar, { backgroundColor: user.accentColor }]}>
        <Text style={card.initials}>{user.initials}</Text>
      </View>
      <View style={card.info}>
        <Text style={card.name} numberOfLines={1}>{user.name}</Text>
        <Text style={card.email} numberOfLines={1}>{user.email}</Text>
      </View>
      <TouchableOpacity style={card.btn} onPress={onPress} activeOpacity={0.85}>
        <Text style={card.btnText}>Log in as {user.name.split(' ')[0]}</Text>
      </TouchableOpacity>
    </View>
  );
}

const card = StyleSheet.create({
  wrap: {
    width: 176,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  info: {
    width: '100%',
    alignItems: 'center',
    gap: 2,
    minHeight: 64,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    height: 32,
    backgroundColor: T.accent,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  btnText: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
});

export function SwitchUserScreen({ users, onSelectUser, onLoginViaEmail }: Props) {
  const { width } = useWindowDimensions();
  const hPad = Math.max(24, (width - CONTENT_MAX) / 2);
  const illustrationSize = Math.min(220, Math.round((width - hPad * 2) * 0.45));
  const [query, setQuery] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.container, { paddingHorizontal: hPad }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topGroup}>
        <Text style={styles.title}>Switch user</Text>
        <WorkersIllustration size={illustrationSize} />
        <Text style={styles.subtitle}>
          Users who have logged into this device will appear here
        </Text>
      </View>

      <View style={styles.listGroup}>
        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchIcon}><SearchIcon /></View>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search for a name"
            placeholderTextColor={T.textPlaceholder}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* User cards — horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {filtered.map(user => (
            <UserCard key={user.id} user={user} onPress={() => onSelectUser(user)} />
          ))}
        </ScrollView>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Log in via email */}
        <TouchableOpacity style={styles.secondaryBtn} onPress={onLoginViaEmail} activeOpacity={0.85}>
          <Text style={styles.secondaryBtnText}>Log in via username or email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} activeOpacity={0.7}>
          <Text style={styles.linkText}>Forgot username?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.bg },
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 48,
    gap: 40,
  },
  topGroup: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
    lineHeight: 24,
  },
  listGroup: {
    gap: 12,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchIcon: { flexShrink: 0 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textDefault,
  },
  cardsRow: {
    gap: 8,
    paddingVertical: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#dbe0eb' },
  dividerText: { fontSize: 16, fontFamily: 'NotoSans_400Regular', color: T.textWeaker },
  secondaryBtn: {
    height: 48,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: 16, fontFamily: 'NotoSans_700Bold', color: T.accentText },
  linkBtn: { alignItems: 'center', paddingVertical: 4 },
  linkText: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: T.accent },
});
