/**
 * HomeScreen — Flow 1, Screen 5
 * Figma node: 1035:9841
 *
 * Southern Logistics org home.
 * Header → Stat cards → In-progress horizontal scroll → Agenda accordion → Bottom nav.
 */

import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radius, typography, component, layout } from '../tokens';

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, count, icon }: { label: string; count: number; icon: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.statCard, pressed && styles.pressed]}>
      <View style={styles.statCardInner}>
        <Text style={styles.statIcon}>{icon}</Text>
        <View style={styles.statText}>
          <Text style={styles.statCount}>{count}</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function InspectionCard({ title, template, updatedAgo }: {
  title: string; template: string; updatedAgo: string;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.inspectionCard, pressed && styles.pressed]}>
      {/* Figma: Overline/Small — 10px/700/ls+1 */}
      <Text style={styles.typeLabel}>INSPECTION</Text>
      <Text style={styles.inspectionTitle} numberOfLines={3}>{title}</Text>
      <Text style={styles.inspectionMeta}>{template}</Text>
      <Text style={styles.inspectionMeta}>Updated {updatedAgo}</Text>
    </Pressable>
  );
}

function AgendaBadge({ label, variant }: { label: string; variant: 'accent' | 'warning' | 'neutral' }) {
  const bg   = variant === 'accent' ? colors.accentBgWeakest
             : variant === 'warning' ? colors.warningBgWeakest
             : colors.neutralBg;
  const text = variant === 'accent' ? colors.accentText
             : variant === 'warning' ? colors.warningText
             : colors.textSurfaceWeaker;
  return (
    <View style={[styles.agendaItemBadge, { backgroundColor: bg }]}>
      <Text style={[styles.agendaItemBadgeText, { color: text }]}>{label}</Text>
    </View>
  );
}

function AgendaItem({ type, title, due, site, badge, badgeVariant }: {
  type: string; title: string; due: string; site: string;
  badge: string; badgeVariant: 'accent' | 'warning' | 'neutral';
}) {
  return (
    <View style={styles.agendaItem}>
      <Text style={styles.typeLabel}>{type}</Text>
      <Text style={styles.agendaItemTitle}>{title}</Text>
      <View style={styles.agendaItemMeta}>
        <Text style={styles.agendaItemMetaText}>{due}  {site}</Text>
        <AgendaBadge label={badge} variant={badgeVariant} />
      </View>
    </View>
  );
}

function AgendaRow({ label, count, icon, iconColor, expanded, children, onToggle }: {
  label: string; count: number; icon: string; iconColor: string;
  expanded?: boolean; children?: React.ReactNode; onToggle?: () => void;
}) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.agendaHeader, pressed && styles.pressed]}
        onPress={onToggle}
      >
        <View style={styles.agendaHeaderLeft}>
          <Text style={[styles.agendaIcon, { color: iconColor }]}>{icon}</Text>
          <Text style={styles.agendaLabel}>{label}</Text>
          <View style={styles.countPill}>
            <Text style={styles.countPillText}>{count}</Text>
          </View>
        </View>
        <Text style={styles.chevron}>{expanded ? '∧' : '∨'}</Text>
      </Pressable>
      {expanded && children}
    </View>
  );
}

function BottomNav() {
  const items = [
    { label: 'Home',        icon: '⌂',  active: true  },
    { label: 'Inspections', icon: '☑',  active: false },
    { label: 'Actions',     icon: '◻',  active: false },
    { label: 'Training',    icon: '🎓', active: false },
    { label: 'More',        icon: '⊞',  active: false },
  ];
  return (
    <View style={styles.bottomNav}>
      <View style={styles.divider} />
      <View style={styles.navItems}>
        {items.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [styles.navItem, pressed && styles.pressed]}
          >
            <Text style={[styles.navIcon, item.active && styles.navActive]}>{item.icon}</Text>
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [agendaOpen, setAgendaOpen] = useState<'today' | null>('today');

  return (
    <SafeAreaView style={styles.screen}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Org avatar */}
          <View style={styles.orgAvatar}>
            <Text style={styles.orgAvatarText}>SL</Text>
          </View>
          {/* Figma: Title/Large — 20px/600, Surface/Text->Default */}
          <Text style={styles.orgName}>Southern Logistics</Text>
          <Text style={styles.orgChevron}>⌄</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable accessibilityLabel="Notifications" style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </Pressable>
          <View style={[styles.avatar, { width: component.avatarSm, height: component.avatarSm, borderRadius: component.avatarSm / 2 }]}>
            <Text style={styles.avatarInitials}>JS</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stat cards ───────────────────────────────────────────────────── */}
        <View style={styles.statRow}>
          <StatCard label="Training" count={4} icon="🎓" />
          <StatCard label="Issues"   count={3} icon="📦" />
        </View>

        {/* ── In progress ──────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.row}>
              <Text style={styles.sectionTitle}>In progress</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>10</Text>
              </View>
            </View>
            <Pressable>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.inspectionScroll}
          >
            <InspectionCard
              title="00101 / Ari Bautista / 5 Oct 2023 / Asset 5682 / Sydney Cafe"
              template="F10 Food Safety Instructions"
              updatedAgo="12 days ago"
            />
            <InspectionCard
              title="0079 / Ari Bautista / 4 Oct 2023 / Site Sydney 03 / Sydney Cafe"
              template="Site Audit"
              updatedAgo="13 days ago"
            />
            <InspectionCard
              title="0079 / Ari Bautista / 4 Oct 2023 / Site Sydney 03 / Sydney Cafe"
              template="Site Audit"
              updatedAgo="13 days ago"
            />
          </ScrollView>
        </View>

        {/* ── Agenda ───────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Agenda</Text>
            <Pressable>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          {/* Filter tabs */}
          <View style={styles.filterTabs}>
            {['All', 'Inspections', 'Actions'].map((tab, i) => (
              <Pressable
                key={tab}
                style={({ pressed }) => [
                  styles.filterTab,
                  i === 0 && styles.filterTabActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.filterTabText, i === 0 && styles.filterTabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Accordion */}
          <View style={styles.agendaList}>
            <AgendaRow label="Overdue" count={0} icon="⊘" iconColor={colors.negative} />
            <View style={styles.divider} />

            <AgendaRow
              label="Today" count={3} icon="⏰" iconColor={colors.warningText}
              expanded={agendaOpen === 'today'}
              onToggle={() => setAgendaOpen(agendaOpen === 'today' ? null : 'today')}
            >
              <AgendaItem type="SCHEDULED INSPECTION" title="Food and safety 101"
                due="Due in 6 hours" site="Site Name" badge="To do" badgeVariant="accent" />
              <AgendaItem type="INSPECTION" title="Food and safety 101"
                due="Due in 6 hours" site="Site Name" badge="Pending approval" badgeVariant="neutral" />
              <AgendaItem type="ACTION" title="Tidy up bottom floor cables"
                due="Dec 21" site="Site Name" badge="To Do" badgeVariant="warning" />
            </AgendaRow>
            <View style={styles.divider} />

            <AgendaRow label="Upcoming" count={0} icon="✓" iconColor={colors.accentText} />
            <View style={styles.divider} />
            <AgendaRow label="No date" count={0} icon="📅" iconColor={colors.textSurfaceWeaker} />
          </View>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Screen ──────────────────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical:   spacing.sm,
    backgroundColor:   colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },
  orgAvatar: {
    width:           30,
    height:          30,
    borderRadius:    radius.xs,
    backgroundColor: colors.neutralBg,
    alignItems:      'center',
    justifyContent:  'center',
  },
  orgAvatarText: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.bold,
    color:      colors.textSurface,
  },
  // Figma: Title/Large — 20px/600, Surface/Text->Default (Org name uses 17px in Figma — closest token is title 18)
  orgName: {
    fontSize:   typography.size.title,
    fontWeight: typography.weight.semibold,
    color:      colors.textSurface,
  },
  orgChevron: {
    fontSize: typography.size.sm,
    color:    colors.textSurface,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.md,
  },
  iconBtn: {
    width:         layout.minTouchTarget,
    height:        layout.minTouchTarget,
    alignItems:    'center',
    justifyContent:'center',
  },
  iconBtnText: { fontSize: typography.size.lg },
  avatar: {
    backgroundColor: colors.accent,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarInitials: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.bold,
    color:      colors.onAccent,
  },

  // ── Scroll ──────────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: colors.base,
  },
  scrollContent: {
    paddingTop:        spacing.lg,
    paddingHorizontal: spacing.xl,
    gap:               spacing.xl,
  },

  // ── Stat cards ──────────────────────────────────────────────────────────────
  statRow: {
    flexDirection: 'row',
    gap:           spacing.sm,
  },
  statCard: {
    flex:            1,
    backgroundColor: colors.surface,
    borderRadius:    radius.md,
    borderWidth:     1,
    borderColor:     colors.borderWeak,
    paddingVertical:    spacing.md,
    paddingHorizontal:  spacing.md,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  statCardInner: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },
  statIcon:  { fontSize: typography.size.title },
  statText:  { gap: spacing.xxs },
  statCount: {
    fontSize:   typography.size.lg,
    fontWeight: typography.weight.bold,
    color:      colors.textSurface,
  },
  statLabel: {
    fontSize: typography.size.xs,
    color:    colors.textSurfaceWeaker,
  },

  // ── Shared ──────────────────────────────────────────────────────────────────
  chevron: {
    fontSize: typography.size.title,
    color:    colors.textSurfaceWeaker,
  },
  divider: {
    height:          1,
    backgroundColor: colors.borderWeak,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },

  // ── Section header ──────────────────────────────────────────────────────────
  section: { gap: spacing.md },
  sectionHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  // Figma: Title/Medium — 18px/600/24lh, Surface/Text->Default
  sectionTitle: {
    fontSize:   typography.size.title,
    fontWeight: typography.weight.semibold,
    lineHeight: typography.lineHeight.title,
    color:      colors.textSurface,
  },
  badge: {
    backgroundColor:  colors.accent,
    borderRadius:     radius.full,
    minWidth:         20,
    height:           20,
    alignItems:       'center',
    justifyContent:   'center',
    paddingHorizontal: spacing.xs + 2,
  },
  badgeText: {
    color:      colors.onAccent,
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.bold,
  },
  viewAll: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    color:      colors.accentText,
  },

  // ── Inspection cards ────────────────────────────────────────────────────────
  inspectionScroll: {
    gap:          spacing.sm,
    paddingRight: spacing.xl,
  },
  inspectionCard: {
    width:           220,
    backgroundColor: colors.surface,
    borderRadius:    radius.md,
    borderWidth:     1,
    borderColor:     colors.borderWeak,
    padding:         spacing.md,
    gap:             spacing.xs,
  },
  // Figma: Overline/Small — 10px/700/ls+1, Accent/Text->Default
  typeLabel: {
    fontSize:      typography.size.overline,
    fontWeight:    typography.weight.bold,
    letterSpacing: typography.letterSpacing.wide,
    color:         colors.accentText,
  },
  inspectionTitle: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.sm,
    color:      colors.textSurface,
  },
  inspectionMeta: {
    fontSize: typography.size.xs,
    color:    colors.textSurfaceWeaker,
  },

  // ── Filter tabs ─────────────────────────────────────────────────────────────
  filterTabs: {
    flexDirection: 'row',
    gap:           spacing.sm,
  },
  filterTab: {
    paddingVertical:   6,
    paddingHorizontal: spacing.md,
    borderRadius:      radius.full,
    borderWidth:       1,
    borderColor:       colors.borderDefault,
    backgroundColor:   colors.surface,
  },
  filterTabActive: {
    backgroundColor: colors.base,
    borderColor:     colors.accentBorder,
  },
  filterTabText: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    color:      colors.textSurfaceWeaker,
  },
  filterTabTextActive: {
    color: colors.accentText,
  },

  // ── Agenda ──────────────────────────────────────────────────────────────────
  agendaList: {
    backgroundColor: colors.surface,
    borderRadius:    radius.md,
    borderWidth:     1,
    borderColor:     colors.borderWeak,
    overflow:        'hidden',
  },
  agendaHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingVertical:    spacing.md,
    paddingHorizontal:  spacing.md,
  },
  agendaHeaderLeft: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },
  agendaIcon:  { fontSize: typography.size.md },
  agendaLabel: {
    fontSize:   typography.size.sm,
    fontWeight: typography.weight.medium,
    color:      colors.textSurface,
  },
  countPill: {
    backgroundColor:  colors.base,
    borderRadius:     radius.full,
    minWidth:         20,
    height:           20,
    alignItems:       'center',
    justifyContent:   'center',
    paddingHorizontal: spacing.xs + 2,
  },
  countPillText: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.medium,
    color:      colors.textSurfaceWeaker,
  },
  agendaItem: {
    paddingHorizontal: spacing.md,
    paddingVertical:   spacing.md,
    borderTopWidth:    1,
    borderTopColor:    colors.borderWeak,
    gap:               spacing.xs,
  },
  agendaItemTitle: {
    fontSize:   typography.size.md,
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.md,
    color:      colors.textSurface,
  },
  agendaItemMeta: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    marginTop:      spacing.xs,
  },
  agendaItemMetaText: {
    fontSize: typography.size.xs,
    color:    colors.textSurfaceWeaker,
  },
  agendaItemBadge: {
    borderRadius:      radius.xs,
    paddingVertical:   spacing.xxs,
    paddingHorizontal: spacing.sm,
  },
  agendaItemBadgeText: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.medium,
  },

  // ── Bottom nav ──────────────────────────────────────────────────────────────
  bottomNav: {
    backgroundColor: colors.surface,
    shadowColor:     colors.shadow,
    shadowOffset:    { width: 0, height: -4 },
    shadowOpacity:   0.08,
    shadowRadius:    12,
    elevation:       8,
  },
  navItems: {
    flexDirection: 'row',
    paddingTop:    spacing.sm,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  navItem: {
    flex:           1,
    alignItems:     'center',
    gap:            spacing.xs,
    paddingVertical: spacing.xs,
  },
  navIcon: {
    fontSize: typography.size.xl,
    color:    colors.textSurfaceWeaker,
  },
  navActive: {
    color: colors.accentText,
  },
  navLabel: {
    fontSize:   typography.size.xs,
    fontWeight: typography.weight.medium,
    color:      colors.textSurfaceWeaker,
  },
  navLabelActive: {
    color: colors.accentText,
  },
});

// Re-export for layout token reference (avoids import cycle)
const { minTouchTarget } = { minTouchTarget: 44 };
