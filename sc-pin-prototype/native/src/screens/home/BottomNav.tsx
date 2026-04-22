import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

const NAV_ICONS = {
  home:        'https://www.figma.com/api/mcp/asset/cca7e8f7-314d-47f2-8c45-3b0644431dc3',
  inspections: 'https://www.figma.com/api/mcp/asset/f08ee9aa-27e1-427f-8b1f-a88864bf12e2',
  actions:     'https://www.figma.com/api/mcp/asset/43a1a620-e1f8-4381-bd02-d04d05609325',
  training:    'https://www.figma.com/api/mcp/asset/ee0d10f0-700e-499c-b49b-c5ff592e7ae0',
  more:        'https://www.figma.com/api/mcp/asset/99a906cb-5af1-461e-916c-23747dfb27a2',
};

const NAV_ITEMS: { label: string; key: keyof typeof NAV_ICONS; active: boolean }[] = [
  { label: 'Home',        key: 'home',        active: true },
  { label: 'Inspections', key: 'inspections', active: false },
  { label: 'Actions',     key: 'actions',     active: false },
  { label: 'Training',    key: 'training',    active: false },
  { label: 'More',        key: 'more',        active: false },
];

export function BottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={styles.row}>
        {NAV_ITEMS.map(({ label, key, active }) => (
          <View key={label} style={styles.item}>
            <Image
              source={{ uri: NAV_ICONS[key] }}
              style={[styles.icon, { tintColor: active ? '#4740d4' : '#545f70' }]}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
          </View>
        ))}
      </View>
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
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingHorizontal: 8,
  },
  item: { flex: 1, alignItems: 'center', gap: 4 },
  icon: { width: 24, height: 24 },
  label: { fontSize: 11, fontFamily: 'NotoSans_400Regular', color: '#545f70' },
  labelActive: { fontFamily: 'NotoSans_700Bold', color: '#4740d4' },
});
