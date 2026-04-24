import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Rect, Polyline, Line } from 'react-native-svg';

const ACTIVE = '#4740d4';
const INACTIVE = '#545f70';

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 22V12h6v10" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function InspectionsIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="8" y1="11" x2="16" y2="11" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <Line x1="8" y1="15" x2="14" y2="15" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

function ActionsIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Polyline points="9,11 12,14 22,4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function TrainingIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 12v5c3 3 9 3 12 0v-5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MoreIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const NAV_ITEMS = [
  { label: 'Home',        Icon: HomeIcon,        active: true },
  { label: 'Inspections', Icon: InspectionsIcon, active: false },
  { label: 'Actions',     Icon: ActionsIcon,     active: false },
  { label: 'Training',    Icon: TrainingIcon,    active: false },
  { label: 'More',        Icon: MoreIcon,        active: false },
];

export function BottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={styles.row}>
        {NAV_ITEMS.map(({ label, Icon, active }) => {
          const color = active ? ACTIVE : INACTIVE;
          return (
            <View key={label} style={styles.item}>
              <Icon color={color} />
              <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
          );
        })}
      </View>
      {Platform.OS === 'ios' && <View style={styles.homeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  border: { height: 1, backgroundColor: '#dbe0eb' },
  row: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 3,
    paddingHorizontal: 8,
  },
  item: { flex: 1, alignItems: 'center', gap: 4 },
  label: { fontSize: 11, fontFamily: 'NotoSans_400Regular' },
  homeIndicator: {
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(29,35,48,0.4)',
    marginBottom: 8,
    marginTop: 4,
  },
});
