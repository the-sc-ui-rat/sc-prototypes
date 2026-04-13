import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { T } from '../tokens';

interface Props {
  onFastSwitch: () => void;
}

export function HomeScreen({ onFastSwitch }: Props) {
  return (
    <View style={styles.container}>
      {/* Success banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>✓</Text>
        <Text style={styles.bannerText}>You're in, John Davies</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoArea}>
        <Text style={styles.logoText}>SafetyCulture</Text>
        <View style={styles.logoUnderline} />
      </View>

      <Text style={styles.welcomeText}>
        Welcome back. You're signed in to{'\n'}
        <Text style={styles.orgBold}>Glencore Mining</Text>
      </Text>

      {/* Placeholder content cards */}
      <View style={styles.contentRow}>
        {['Inspections', 'Issues', 'Training'].map((item) => (
          <View key={item} style={styles.contentCard}>
            <View style={styles.contentIcon} />
            <Text style={styles.contentLabel}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Fast user switch */}
      <View style={styles.switchSection}>
        <Text style={styles.switchLabel}>Finished? Let the next worker sign in.</Text>
        <TouchableOpacity style={styles.switchBtn} onPress={onFastSwitch}>
          <Text style={styles.switchBtnText}>⇄  Fast user switch</Text>
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
  },
  banner: {
    width: '100%',
    backgroundColor: '#22c55e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  bannerIcon: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'NotoSans_700Bold',
  },
  bannerText: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 26,
    fontFamily: 'NotoSans_700Bold',
    color: T.textDefault,
    letterSpacing: -0.5,
  },
  logoUnderline: {
    marginTop: 3,
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: T.accent,
  },
  welcomeText: {
    fontSize: 17,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 26,
  },
  orgBold: {
    fontFamily: 'NotoSans_700Bold',
    color: T.textWeak,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 64,
  },
  contentCard: {
    width: 120,
    height: 120,
    backgroundColor: T.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  contentIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: T.bg,
  },
  contentLabel: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: T.textWeak,
  },
  switchSection: {
    alignItems: 'center',
    gap: 14,
  },
  switchLabel: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: T.textWeaker,
  },
  switchBtn: {
    backgroundColor: T.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  switchBtnText: {
    fontSize: 17,
    fontFamily: 'NotoSans_700Bold',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
});
