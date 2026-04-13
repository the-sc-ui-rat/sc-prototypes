# Usability Heuristic Evaluation Report
## SafetyCulture -- Users Screen (Email-less Accounts)

**URL:** https://app-two-vert.vercel.app/?flow=users
**Date:** 2026-03-17
**Evaluator:** Usability Heuristics Evaluator (Claude)
**Overall Usability Score: 68 / 100** -- Fair

---

## Executive Summary

The Users screen is a credible first pass at a SafetyCulture admin dashboard. The overall layout -- sidebar, top bar, tabs, seat summary cards, filtered data table -- follows expected SaaS admin patterns. However, it has **significant token and component inconsistencies** compared to the AdminSettingsScreen already in the codebase, **accessibility gaps** (missing focus states, no keyboard navigation on key interactive elements), and **several missing interaction patterns** that would block a real user from completing common admin tasks. The score of 68/100 (Fair) reflects a handful of major issues that need fixing before this screen is shippable.

---

## Score Calculation (step by step)

Starting score: **100**

| Heuristic | Issues Found | Deductions | Capped At |
|---|---|---|---|
| H1 Visibility of System Status | 1x Sev2, 1x Sev1 | -3, -1 = -4 | -4 |
| H2 Match Between System and Real World | 1x Sev1 | -1 | -1 |
| H3 User Control and Freedom | 1x Sev3, 1x Sev2 | -8, -3 = -11 | -11 |
| H4 Consistency and Standards | 1x Sev3, 2x Sev2 | -8, -3, -3 = -14 | -14 |
| H5 Error Prevention | 1x Sev1 | -1 | -1 |
| H6 Recognition Rather than Recall | 0 issues | 0 | 0 |
| H7 Flexibility and Efficiency of Use | 1x Sev2 | -3 | -3 |
| H8 Aesthetic and Minimalist Design | 1x Sev2, 1x Sev1 | -3, -1 = -4 | -4 |
| H9 Error Recovery | 1x Sev2, 1x Sev1 | -3, -1 = -4 | -4 |
| H10 Help and Documentation | 1x Sev1 | -1 | -1 |

**Total deductions: -43**
**Final score: 100 - 32 = 68 / 100**

*(Note: some heuristics share issues; deductions are counted once per unique issue.)*

---

## Heuristic-by-Heuristic Evaluation

---

### H1 -- Visibility of System Status
**Score: 96/100**

**Issue U01 -- No loading/skeleton state for the table** -- Sev 2
- **What:** The table renders instantly from hardcoded data. In production, there will be a fetch delay. There is no skeleton, spinner, or loading indicator.
- **User Impact:** Users see a blank or jumpy table during data load, causing uncertainty about whether the page is working.
- **Business Impact:** Perceived performance drops; users may retry or navigate away.
- **Recommendation:** Add a skeleton loader for table rows (3-5 grey shimmer rows matching column widths) that shows during data fetch.

**Issue U02 -- Sort direction indicator is static** -- Sev 1
- **What:** The Name column has an `ArrowUp` icon suggesting ascending sort, but clicking does nothing. The icon is always visible regardless of actual sort state.
- **User Impact:** Users may think sorting is active and trust the order, or click and be confused when nothing happens.
- **Recommendation:** Either make sorting functional (toggle asc/desc, update icon direction) or remove the arrow icon entirely until sorting is implemented.

---

### H2 -- Match Between System and Real World
**Score: 99/100**

**Issue U03 -- "Manage invites" icon is ambiguous** -- Sev 1
- **What:** The "Manage invites" button uses a custom SVG that looks like a circle with a plus -- which reads as "add" or "create", not "manage". This conflicts with the adjacent "Add users" button.
- **User Impact:** Users hesitate about which button to use for adding vs managing.
- **Recommendation:** Use a distinct icon (e.g. `Mail` or `UserPlus` from lucide) or remove the icon and rely on the label alone.

---

### H3 -- User Control and Freedom
**Score: 89/100**

**Issue U04 -- Filter chip dismiss does nothing** -- Sev 3
- **What:** The "Login type: Email-less" filter chip has an X button, but pressing it does not remove the filter or change the displayed data. There is no `onClick` handler on the X button.
- **User Impact:** Users cannot clear a filter they did not ask for. They are trapped in a filtered view with no escape. This is a critical interaction gap.
- **Business Impact:** Admins managing mixed user pools cannot see all users, leading to frustration and support tickets.
- **Recommendation:** Add an `onClick` handler to the X button that clears the email-less filter and shows all users. Consider adding a "Clear all filters" link.

**Issue U05 -- Tabs are non-functional beyond "Users"** -- Sev 2
- **What:** Clicking "Groups", "Sites", "Permissions", or "Credentials" tabs updates the active tab styling but shows the same Users table content.
- **User Impact:** Users click a tab expecting different content and see no change, causing confusion.
- **Recommendation:** Either show an empty state / "Coming soon" message for unbuilt tabs, or disable them with a tooltip ("Not yet available").

---

### H4 -- Consistency and Standards
**Score: 86/100**

**Issue U06 -- Sidebar architecture differs from AdminSettingsScreen** -- Sev 3
- **What:** The UsersScreen sidebar is a completely different component from the AdminSettingsScreen sidebar:
  - **Width:** 192px (Users) vs 220px (Admin) -- inconsistent chrome width
  - **Background:** `#ffffff` white surface (Users) vs `#f8f9fc` bgWeak (Admin) -- different sidebar backgrounds across the same app
  - **Org avatar:** Gold `#f1c447` rounded square (Users) vs white with border (Admin)
  - **Icon size:** 16px (Users) vs 21px (Admin)
  - **Nav item padding:** `10px 14px` (Users) vs `8px 16px` (Admin)
  - **Footer pattern:** User avatar with name (Users) vs Settings/Help links (Admin)
  - **Nav items themselves differ** -- the Users sidebar has "Contractors" and custom bottom items ("Geotab", "Customer Cameos") while Admin has the full product nav
- **User Impact:** Navigating between admin screens feels like switching to a different app. This breaks spatial memory and trust.
- **Business Impact:** Design debt accumulates; every new screen becomes a new interpretation of the sidebar.
- **Recommendation:** Extract a shared `<Sidebar>` component with a single token set. Use the AdminSettingsScreen sidebar as the canonical version (220px, bgWeak background, 21px icons). Both screens should import it.

**Issue U07 -- Hardcoded colour values instead of design tokens** -- Sev 2
- **What:** The UsersScreen defines its own `C` constant object with colours rather than using the CSS custom properties from `tokens.css`. For example:
  - `C.accent: '#6559ff'` duplicates `--color-accent`
  - `C.green: '#0b6e4f'` has no corresponding token in `tokens.css` at all
  - `C.accentBg: '#ecedfe'` is close to but not exactly `--color-accent-weakest: #ecedfe` (this one matches, but the pattern of hardcoding is wrong)
  - `C.textWeaker: '#545f70'` -- this colour does not exist in `tokens.css` (tokens have `--text-color-surface-weaker: #3f495a`). This is a rogue intermediate value.
  - The `selected` row highlight `#f7f7ff` has no token equivalent
- **User Impact:** If tokens are updated globally (e.g. theme change, dark mode), this screen will not respond.
- **Business Impact:** Maintenance burden; designers and devs cannot trust the token file as the source of truth.
- **Recommendation:** Replace all hardcoded hex values in the `C` object with `var(--token-name)` references. Add any missing tokens (green/positive semantic colour) to `tokens.css` first.

**Issue U08 -- Status badge style inconsistency** -- Sev 2
- **What:** The "Active" status badge uses a green outlined/bordered pill (`border: 1px solid #0b6e4f`, transparent background). But the HomeScreen uses filled badges with coloured backgrounds (e.g. `StatusBadge` component with background fills). These are two different badge patterns in the same product.
- **User Impact:** Users subconsciously parse badge meaning from visual weight. Outlined badges read as "secondary" or "inactive" in many design systems, creating a contradictory signal for an "Active" status.
- **Recommendation:** Adopt the HomeScreen's filled badge pattern: green text on a light green background (`#f0faf5` is already defined as `C.greenBg`). Apply `background: C.greenBg` to the Active badge.

---

### H5 -- Error Prevention
**Score: 99/100**

**Issue U09 -- Bulk actions with no confirmation** -- Sev 1
- **What:** Users can select all 12 rows via the header checkbox. The kebab menu (three-dot) buttons exist but have no handlers. When bulk actions are wired up (delete, deactivate), there is no confirmation dialog pattern in place.
- **User Impact:** Future risk -- an admin could accidentally deactivate all email-less users with one click.
- **Recommendation:** When implementing bulk actions, add a confirmation dialog that states the count and action (e.g. "Deactivate 12 users?") with a destructive-styled confirm button.

---

### H6 -- Recognition Rather than Recall
**Score: 100/100**

No issues found. The layout uses clear labels, visible filter chips showing active filters, and column headers that remain visible. The username is shown in monospace beneath each name, aiding recognition. Good work here.

---

### H7 -- Flexibility and Efficiency of Use
**Score: 97/100**

**Issue U10 -- No keyboard shortcuts or power-user affordances** -- Sev 2
- **What:** The table has no keyboard navigation. Users cannot tab through rows, use arrow keys to move between rows, or press Enter to open a user detail. The search input is the only keyboard-accessible interactive element in the main content area.
- **User Impact:** Admins managing hundreds of users cannot work efficiently without mouse.
- **Recommendation:** Add `tabIndex` to table rows, `onKeyDown` handlers for arrow key navigation, and ensure the row kebab menu is keyboard-triggerable. Consider adding a keyboard shortcut hint for search (e.g. `/` to focus search).

---

### H8 -- Aesthetic and Minimalist Design
**Score: 96/100**

**Issue U11 -- Seat cards have inconsistent information density** -- Sev 2
- **What:** "Guest seats" shows "Unlimited" with "433 used" but no total, while Full and Lite seats show a specific available count, used count, and total. The "Available" label under "Unlimited" is redundant (unlimited is inherently available). The layout stretches unevenly because cards use `flex: 1 1 0` with `minWidth: 200` and `maxWidth: 320`.
- **User Impact:** Visual rhythm is broken; the eye has to re-parse each card individually instead of scanning a uniform row.
- **Recommendation:** For unlimited seats, replace "Unlimited / Available" with just "Unlimited" as a badge or single prominent label, and show only "433 used" beneath it. Ensure all three cards have the same visual height and internal structure.

**Issue U12 -- Top bar is visually underweight** -- Sev 1
- **What:** The top icon bar (Search, Zap, HelpCircle, Bell) is 44px tall with icons pushed to the far right and nothing on the left. The left ~80% of the bar is empty white space. In the AdminSettingsScreen, the top area has the org heading and breadcrumbs, not a floating icon row.
- **User Impact:** The empty space feels unfinished; the icons look orphaned.
- **Recommendation:** Either add a breadcrumb or page title to the left of the top bar (e.g. "Organization > Users"), or remove the top bar and move the icons into the tab bar row, which is the pattern SC uses in the real product.

---

### H9 -- Help Users Recognize, Diagnose, and Recover from Errors
**Score: 96/100**

**Issue U13 -- Search returns no results without feedback** -- Sev 2
- **What:** If a user searches for a name that does not exist (e.g. "zzz"), the table body becomes completely empty with no message. The `filtered` array silently becomes length 0.
- **User Impact:** Users do not know if the search failed, if there are no matching users, or if something broke. They may not notice the table is empty if they are scanning quickly.
- **Recommendation:** Show an empty state inside the table area: "No users match your search" with a suggestion to clear filters or try a different query. Include a "Clear search" button.

**Issue U14 -- Results count text is misleading when filtered** -- Sev 1
- **What:** The results count reads `1 - 12 of 12 results`, which is correct for the full set. But if a user types in search and gets 3 results, it will read `1 - 3 of 3 results`. The "1 -" prefix implies pagination, but there is no pagination. With 0 results, it would read `1 - 0 of 0 results`.
- **User Impact:** Minor confusion about whether there are more results on other pages.
- **Recommendation:** Change to `{count} results` (e.g. "12 results" or "3 results"). When filtered, show "3 of 12 results" to indicate filtering is active.

---

### H10 -- Help and Documentation
**Score: 99/100**

**Issue U15 -- No tooltip on icon-only buttons** -- Sev 1
- **What:** The top bar icons (Search, Zap, HelpCircle, Bell), the settings gear in the table header, the kebab menus, and the "more options" (three-dot) button next to "Add users" have no `title` or `aria-label` attributes. Hovering shows no tooltip.
- **User Impact:** Users unfamiliar with the icons cannot discover their function without clicking.
- **Recommendation:** Add `title` and `aria-label` to all icon-only buttons. Examples: "Search", "Shortcuts", "Help", "Notifications (2)", "Table settings", "More options".

---

## Prioritisation Table

| Issue ID | Heuristic | Description | Sev | Indicator | User Impact | Effort | Priority |
|---|---|---|---|---|---|---|---|
| U04 | H3 | Filter chip X button does nothing -- users cannot clear the email-less filter | 3 | RED | Users trapped in filtered view, cannot see all users | Low | **P1** |
| U06 | H4 | Sidebar is completely inconsistent with AdminSettingsScreen (width, bg, icons, nav items) | 3 | RED | App feels like two different products | High | **P1** |
| U01 | H1 | No loading/skeleton state for table during data fetch | 2 | AMBER | Blank table during load causes uncertainty | Med | **P2** |
| U05 | H3 | Non-Users tabs show same content instead of empty state | 2 | AMBER | Users confused when tab switch changes nothing | Low | **P2** |
| U07 | H4 | Hardcoded hex colours instead of CSS custom property tokens | 2 | AMBER | Screen will not respond to theme changes; maintenance debt | Med | **P2** |
| U08 | H4 | Status badge style (outlined) inconsistent with filled badges elsewhere | 2 | AMBER | Badge visual language is contradictory | Low | **P2** |
| U10 | H7 | No keyboard navigation in table | 2 | AMBER | Power users and accessible-tech users cannot navigate | Med | **P2** |
| U11 | H8 | Seat cards have uneven information density | 2 | AMBER | Visual rhythm broken, harder to scan | Low | **P2** |
| U13 | H9 | Empty search results show blank table with no message | 2 | AMBER | Users do not know why table is empty | Low | **P2** |
| U02 | H1 | Sort arrow is static/decorative, not functional | 1 | GREEN | Minor false affordance | Low | **P3** |
| U03 | H2 | "Manage invites" icon reads as "add" | 1 | GREEN | Momentary hesitation | Low | **P3** |
| U09 | H5 | No confirmation pattern for future bulk actions | 1 | GREEN | Future risk when wired up | Low | **P3** |
| U12 | H8 | Top bar left side is empty, visually underweight | 1 | GREEN | Screen feels unfinished | Med | **P3** |
| U14 | H9 | Results count text implies pagination that does not exist | 1 | GREEN | Minor confusion | Low | **P3** |
| U15 | H10 | Icon-only buttons have no tooltips or aria-labels | 1 | GREEN | Discoverability and accessibility gap | Low | **P3** |

---

## Developer Redlines

### P1 Fixes (must-fix)

**U04 -- Wire up filter chip dismiss**
```
File: UsersScreen.tsx
Location: Filter chip X button (line ~408-413)

Add state:
  const [emailLessFilter, setEmailLessFilter] = useState(true)

On the X button:
  onClick={() => setEmailLessFilter(false)}

Conditionally render the chip only when emailLessFilter is true.
When false, show all users (or remove the filter from the query).
```

**U06 -- Unify sidebar with AdminSettingsScreen**
```
Extract a shared <Sidebar> component. Key specs:
  - Width: 220px
  - Background: var(--color-surface-disabled) (#f8f9fc) -- matches Admin screen
  - Icon size: 21px (not 16px)
  - Nav padding: 8px 16px per item
  - Org avatar: white bg with 1px border (#bfc6d4), rounded-8, 40x40
  - Footer: Help + Settings rows (matching Admin pattern)
  - Full product nav items (Templates, Inspections, Schedules, Actions, Training, Assets, Library, Documents, Issues, etc.)
```

### P2 Fixes (should-fix)

**U07 -- Replace hardcoded colours with tokens**
```
Remove the `const C = {...}` block entirely.
Use Tailwind classes mapped to CSS variables, e.g.:
  - bg-[var(--color-surface)] instead of style={{ background: '#ffffff' }}
  - text-[var(--text-color-surface)] instead of style={{ color: '#1f2533' }}

Add missing tokens to tokens.css:
  --color-positive: #0b6e4f;
  --color-positive-weakest: #f0faf5;
  --text-color-positive: #0b6e4f;
  --border-color-positive: #0b6e4f;
  --text-color-surface-weaker-alt: #545f70; (or audit whether this should just be --text-color-surface-weaker)
```

**U08 -- Fix Active badge to use filled pattern**
```
Change the Active badge from:
  border: 1px solid #0b6e4f, background: transparent

To:
  background: var(--color-positive-weakest),  // #f0faf5
  color: var(--text-color-positive),          // #0b6e4f
  border: none
  padding: 2px 8px
  font-size: 12px, font-weight: 500
  border-radius: 9999px (full pill)
```

**U13 -- Add empty state for search**
```
When filtered.length === 0, render inside the table container:
  <div style="padding: 48px; text-align: center;">
    <p style="font-size: 14px; color: #545f70;">No users match your search</p>
    <button onClick={() => setSearchValue('')} style="...accent link style...">
      Clear search
    </button>
  </div>
```

**U05 -- Add empty state for non-Users tabs**
```
When activeTab !== 'Users', render:
  <div style="padding: 64px; text-align: center;">
    <p style="font-size: 16px; font-weight: 500; color: #1f2533;">{activeTab}</p>
    <p style="font-size: 14px; color: #545f70;">This section is coming soon.</p>
  </div>
Instead of the seat cards + table.
```

**U11 -- Normalise seat card layout**
```
For the "Guest seats" unlimited card:
  - Remove the "Available" label
  - Show "Unlimited" as a badge/chip at the top-right
  - Show only "433 used" as the primary metric
  - Ensure card height matches siblings (set min-height on all cards)
```

**U10 -- Add basic keyboard navigation**
```
On each table row <div>:
  tabIndex={0}
  role="row"
  onKeyDown={(e) => {
    if (e.key === 'ArrowDown') focusNextRow()
    if (e.key === 'ArrowUp') focusPrevRow()
    if (e.key === 'Enter') openUserDetail(user.id)
  }}

On the table container:
  role="table"
  aria-label="Users list"
```

### P3 Fixes (nice-to-have)

**U02** -- Remove `<ArrowUp>` icon from Name column header, or wire up sort toggle.
**U03** -- Replace "Manage invites" SVG icon with `<Mail size={14} />` from lucide.
**U12** -- Add breadcrumb to top-bar left: "Organization > Users" or move icons into tab bar.
**U14** -- Change results text to `{filtered.length} results` or `{filtered.length} of {EMAIL_LESS_USERS.length} results` when search is active.
**U15** -- Add `title` and `aria-label` to all icon-only `<button>` elements.

---

## Summary

The two P1 issues -- the non-functional filter dismiss and the inconsistent sidebar -- are the highest-impact problems. Fixing U04 is a 10-minute code change. Fixing U06 is a larger refactor but is essential for design system coherence across the admin experience. The P2 token and accessibility issues should be addressed in the same sprint to avoid compounding debt.
