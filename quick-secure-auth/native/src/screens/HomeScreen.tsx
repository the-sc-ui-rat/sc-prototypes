import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Image, useWindowDimensions,
} from 'react-native';
import { StatCard } from './home/StatCard';
import { AgendaRow } from './home/AgendaRow';
import { BottomNav } from './home/BottomNav';

interface Props {
  userName: string;
  userInitials: string;
  onSwitchProfile: () => void;
  onPillDotMeasured?: (x: number, y: number, w: number, h: number) => void;
}

const ORG = { name: 'Glencore Mining', initials: 'GM' };

const INSPECTIONS = [
  {
    id: '1',
    title: '00101 / Old Mate / 5 Oct 2023 / Asset 5682 / Sydney Cafe',
    template: 'F10 Food Safety Instructions',
    updated: 'Updated 12 days ago',
  },
  {
    id: '2',
    title: '0079 / Old Mate / 4 Oct 2023 / Site Sydney 03 / Sydney Cafe',
    template: 'Site Audit',
    updated: 'Updated 13 days ago',
  },
];

const TODAY_ITEMS = [
  { type: 'SCHEDULED INSPECTION', title: 'Food and safety 101', meta: 'Due in 6 hours  ·  Site Name', badge: 'To do',           badgeColor: '#fffae5', badgeTextColor: '#9e4a00' },
  { type: 'INSPECTION',           title: 'Food and safety 101', meta: 'Due in 6 hours  ·  Site Name', badge: 'Pending approval', badgeColor: '#f2f3f7', badgeTextColor: '#545f70' },
  { type: 'ACTION',               title: 'Tidy up bottom floor cables', meta: 'Dec 21  ·  High  ·  Site Name', badge: 'To Do',   badgeColor: '#fffae5', badgeTextColor: '#9e4a00' },
];

function InspectionCard({ title, template, updated, width: screenWidth }: (typeof INSPECTIONS)[0] & { width: number }) {
  return (
    <View style={[card.wrap, { width: Math.min(280, screenWidth * 0.72) }]}>
      <Text style={card.type}>INSPECTION</Text>
      <Text style={card.title} numberOfLines={3}>{title}</Text>
      <Text style={card.template} numberOfLines={1}>{template}</Text>
      <Text style={card.meta}>◷  {updated}</Text>
    </View>
  );
}

const card = StyleSheet.create({
  wrap: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 12,
    padding: 16,
  },
  type: { fontSize: 10, fontFamily: 'NotoSans_700Bold', color: '#4740d4', letterSpacing: 1, marginBottom: 6 },
  title: { fontSize: 15, fontFamily: 'NotoSans_400Regular', color: '#1f2533', lineHeight: 22, marginBottom: 4 },
  template: { fontSize: 12, fontFamily: 'NotoSans_400Regular', color: '#545f70', marginBottom: 12 },
  meta: { fontSize: 12, fontFamily: 'NotoSans_400Regular', color: '#545f70' },
});

function OrgHeader({
  userInitials,
  onSwitchProfile,
  onPillDotMeasured,
}: {
  userInitials: string;
  onSwitchProfile: () => void;
  onPillDotMeasured?: (x: number, y: number, w: number, h: number) => void;
}) {
  const pillDotRef = useRef<View>(null);

  useEffect(() => {
    if (!onPillDotMeasured) return;
    let retryTimer: ReturnType<typeof setTimeout>;
    const measure = () => {
      pillDotRef.current?.measureInWindow((x, y, w, h) => {
        if (w > 0) {
          onPillDotMeasured(x, y, w, h);
        } else {
          retryTimer = setTimeout(measure, 16);
        }
      });
    };
    const timer = setTimeout(measure, 32);
    return () => { clearTimeout(timer); clearTimeout(retryTimer); };
  }, [onPillDotMeasured]);

  return (
    <View style={org.row}>
      <View style={org.left}>
        <View style={org.logo}>
          <Text style={org.logoText}>{ORG.initials}</Text>
        </View>
        <Text style={org.name}>{ORG.name}</Text>
        <Text style={org.chevron}>⌄</Text>
      </View>
      <View style={org.right}>
        <Image source={{ uri: 'https://www.figma.com/api/mcp/asset/4636cd08-d198-4a1d-bcd9-5246face0ae3' }} style={org.bellIcon} />
        <TouchableOpacity style={org.pill} onPress={onSwitchProfile} activeOpacity={0.8}>
          <View ref={pillDotRef} style={org.pillDot}>
            <Text style={org.pillDotText}>{userInitials}</Text>
          </View>
          <Text style={org.pillLabel}>Switch user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const org = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 30, height: 30, borderRadius: 8, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: 12, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
  name: { fontSize: 17, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
  chevron: { fontSize: 14, color: '#545f70' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellIcon: { width: 24, height: 24 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 100,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 10,
  },
  pillDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#6559ff', alignItems: 'center', justifyContent: 'center' },
  pillDotText: { fontSize: 10, fontFamily: 'NotoSans_700Bold', color: '#ffffff' },
  pillLabel: { fontSize: 13, fontFamily: 'NotoSans_700Bold', color: '#1f2533' },
});

export function HomeScreen({ userName, userInitials, onSwitchProfile, onPillDotMeasured }: Props) {
  const { width } = useWindowDimensions();
  const hPad = width < 600 ? 16 : 36;
  return (
    <View style={s.container}>
      <SafeAreaView style={s.header}>
        <OrgHeader userInitials={userInitials} onSwitchProfile={onSwitchProfile} onPillDotMeasured={onPillDotMeasured} />
        <View style={s.headerBorder} />
      </SafeAreaView>

      <ScrollView style={s.scroll} contentContainerStyle={[s.scrollContent, { paddingHorizontal: hPad }]} showsVerticalScrollIndicator={false}>

        {/* Stat cards */}
        <View style={s.statRow}>
          <StatCard label="Training" count={4} icon="training" />
          <StatCard label="Issues" count={3} icon="issues" />
        </View>

        {/* In progress */}
        <View style={s.section}>
          <View style={s.sectionHead}>
            <View style={s.sectionTitleRow}>
              <Text style={s.sectionTitle}>In progress</Text>
              <View style={s.badge}><Text style={s.badgeText}>10</Text></View>
            </View>
            <TouchableOpacity><Text style={s.viewAll}>View all</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[s.hScroll, { paddingRight: hPad }]}>
            {INSPECTIONS.map(item => <InspectionCard key={item.id} {...item} width={width} />)}
          </ScrollView>
        </View>

        {/* Agenda */}
        <View style={s.section}>
          <View style={s.sectionHead}>
            <Text style={s.sectionTitle}>Agenda</Text>
            <TouchableOpacity><Text style={s.viewAll}>View all</Text></TouchableOpacity>
          </View>
          <View style={s.tabs}>
            {['All', 'Inspections', 'Actions'].map((t, i) => (
              <View key={t} style={[s.tab, i === 0 && s.tabActive]}>
                <Text style={[s.tabText, i === 0 && s.tabTextActive]}>{t}</Text>
              </View>
            ))}
          </View>
          <View style={s.agendaList}>
            <AgendaRow label="Overdue"  count={0} variant="negative" />
            <AgendaRow label="Today"    count={3} variant="warning" expanded items={TODAY_ITEMS} />
            <AgendaRow label="Upcoming" count={0} variant="accent" />
            <AgendaRow label="No date"  count={0} variant="neutral" />
          </View>
        </View>

      </ScrollView>

      <BottomNav />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e9edf6' },
  header: { backgroundColor: '#ffffff' },
  headerBorder: { height: 1, backgroundColor: '#dbe0eb' },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 24, paddingBottom: 32, gap: 20 },
  statRow: { flexDirection: 'row', gap: 8 },
  section: { gap: 12 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 18, fontFamily: 'NotoSans_700Bold', color: '#1f2533', lineHeight: 24 },
  badge: { backgroundColor: '#6559ff', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { fontSize: 12, fontFamily: 'NotoSans_700Bold', color: '#ffffff' },
  viewAll: { fontSize: 14, fontFamily: 'NotoSans_400Regular', color: '#4740d4' },
  hScroll: { gap: 8 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    borderWidth: 1,
    borderColor: '#dbe0eb',
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  tabActive: { borderColor: '#6559ff', backgroundColor: '#ecedfe' },
  tabText: { fontSize: 13, fontFamily: 'NotoSans_400Regular', color: '#545f70' },
  tabTextActive: { fontFamily: 'NotoSans_700Bold', color: '#4740d4' },
  agendaList: { gap: 8 },
});
