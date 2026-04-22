import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Polyline, Line, Rect } from 'react-native-svg';

export interface AgendaItem {
  type: string;
  title: string;
  meta: string;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
}

type IconVariant = 'negative' | 'warning' | 'accent' | 'neutral';

interface Props {
  label: string;
  count: number;
  expanded?: boolean;
  items?: AgendaItem[];
  variant: IconVariant;
}

const VARIANT_COLORS: Record<IconVariant, { icon: string; badgeBg: string; badgeText: string }> = {
  negative: { icon: '#cc3340', badgeBg: '#fff0f1', badgeText: '#a8242a' },
  warning:  { icon: '#d97706', badgeBg: '#fffae5', badgeText: '#9e4a00' },
  accent:   { icon: '#6559ff', badgeBg: '#ecedfe', badgeText: '#4740d4' },
  neutral:  { icon: '#bfc6d4', badgeBg: '#f2f3f7', badgeText: '#545f70' },
};

function AlertCircle({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function Clock({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Polyline points="12 6 12 12 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CircleCheck({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="22 4 12 14.01 9 11.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CalendarDates({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function RowIcon({ variant }: { variant: IconVariant }) {
  const color = VARIANT_COLORS[variant].icon;
  if (variant === 'negative') return <AlertCircle color={color} />;
  if (variant === 'warning') return <Clock color={color} />;
  if (variant === 'accent') return <CircleCheck color={color} />;
  return <CalendarDates color={color} />;
}

function ItemRow({ item }: { item: AgendaItem }) {
  return (
    <View style={item$.row}>
      <View style={item$.content}>
        <Text style={item$.type}>{item.type}</Text>
        <Text style={item$.title}>{item.title}</Text>
        <Text style={item$.meta}>{item.meta}</Text>
      </View>
      <View style={[item$.badge, { backgroundColor: item.badgeColor }]}>
        <Text style={[item$.badgeText, { color: item.badgeTextColor }]}>{item.badge}</Text>
      </View>
    </View>
  );
}

const item$ = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#dbe0eb',
    gap: 12,
  },
  content: { flex: 1 },
  type: { fontSize: 10, fontFamily: 'NotoSans_700Bold', color: '#4740d4', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 16, fontFamily: 'NotoSans_400Regular', color: '#1f2533', lineHeight: 22, marginBottom: 4 },
  meta: { fontSize: 12, fontFamily: 'NotoSans_400Regular', color: '#545f70' },
  badge: { borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8, marginTop: 2 },
  badgeText: { fontSize: 12, fontFamily: 'NotoSans_700Bold' },
});

export function AgendaRow({ label, count, expanded, items, variant }: Props) {
  const { badgeBg, badgeText } = VARIANT_COLORS[variant] ?? VARIANT_COLORS.neutral;

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View style={styles.left}>
          <RowIcon variant={variant} />
          <Text style={styles.label}>{label}</Text>
          <View style={[styles.countBadge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.countText, { color: badgeText }]}>{count}</Text>
          </View>
        </View>
        <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
      </View>
      {expanded && items?.map((item, i) => <ItemRow key={i} item={item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { fontSize: 16, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
  countBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  countText: { fontSize: 13, fontFamily: 'NotoSans_700Bold' },
  chevron: { fontSize: 16, color: '#545f70' },
});
