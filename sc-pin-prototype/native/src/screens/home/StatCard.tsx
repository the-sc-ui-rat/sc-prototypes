import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Polyline, Line } from 'react-native-svg';

function GraduationCap({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 12v5c3.33 2.67 8.67 2.67 12 0v-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function Cube({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="22.08" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

type IconType = 'training' | 'issues';

interface Props {
  label: string;
  count: number;
  icon: IconType;
}

const ICON_COLOR = '#6559ff';

export function StatCard({ label, count, icon }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.top}>
        <View style={styles.iconWrap}>
          {icon === 'training' ? <GraduationCap color={ICON_COLOR} /> : <Cube color={ICON_COLOR} />}
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 12,
    padding: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ecedfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { fontSize: 22, color: '#bfc6d4', lineHeight: 24 },
  count: { fontSize: 28, fontFamily: 'NotoSans_700Bold', color: '#1f2533', lineHeight: 34, marginBottom: 2 },
  label: { fontSize: 12, fontFamily: 'NotoSans_400Regular', color: '#545f70', lineHeight: 16 },
});
