import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, TextInput, useWindowDimensions,
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
    <Pressable
      style={({ pressed }) => [card.wrap, pressed && card.wrapPressed]}
      onPress={onPress}
    >
      <View style={[card.avatar, { backgroundColor: user.accentColor }]}>
        <Text style={card.initials}>{user.initials}</Text>
      </View>
      <View style={card.info}>
        <Text style={card.name} numberOfLines={1}>{user.name}</Text>
        <Text style={card.email} numberOfLines={1}>{user.email}</Text>
      </View>
      <View style={card.btn}>
        <Text style={card.btnText}>Log in as {user.name.split(' ')[0]}</Text>
      </View>
    </Pressable>
  );
}

const card = StyleSheet.create({
  wrap: {
    width: 176,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#BFC6D4',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 16,
  },
  wrapPressed: {
    opacity: 0.75,
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
    color: '#1f2533',
    textAlign: 'center',
    lineHeight: 24,
  },
  email: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#545f70',
    textAlign: 'center',
    lineHeight: 20,
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
  const illustrationSize = Math.min(220, Math.round((width - hPad * 2) * 0.58));
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
      {/* Title */}
      <Text style={styles.title}>Switch user</Text>

      {/* Illustration */}
      <WorkersIllustration size={illustrationSize} />

      {/* Search + cards + caption */}
      <View style={styles.listGroup}>
        <View style={styles.searchWrap}>
          <View style={styles.searchIcon}><SearchIcon /></View>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search for a name"
            placeholderTextColor="#BFC6D4"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {filtered.map(user => (
            <UserCard key={user.id} user={user} onPress={() => onSelectUser(user)} />
          ))}
        </ScrollView>

        <Text style={styles.caption}>
          Select a profile from the people who have logged into this device before
        </Text>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 48,
    gap: 24,
  },
  title: {
    fontSize: 34,
    fontFamily: 'NotoSans_700Bold',
    color: '#1f2533',
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 40,
  },
  listGroup: {
    gap: 12,
    width: '100%',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#BFC6D4',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchIcon: { flexShrink: 0 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: '#1f2533',
  },
  cardsRow: {
    gap: 8,
    paddingVertical: 4,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: '#545f70',
    textAlign: 'center',
    lineHeight: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#BFC6D4' },
  dividerText: { fontSize: 16, fontFamily: 'NotoSans_400Regular', color: '#545f70' },
  secondaryBtn: {
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#BFC6D4',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: 16, fontFamily: 'NotoSans_700Bold', color: T.accentText },
  linkBtn: { alignItems: 'center', paddingVertical: 4 },
  linkText: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: T.accent },
});
