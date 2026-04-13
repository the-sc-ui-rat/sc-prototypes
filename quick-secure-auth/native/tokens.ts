// SC Design Tokens — Quick Secure Auth
// Source of truth for all colours, spacing, typography, and borders
// Aligned to SC design token naming convention:
//   --{category}/{sub-category}-->{state}

// ─── Colours ──────────────────────────────────────────────────────────────────

export const colors = {

  // ── Accent (primary interactive) ──────────────────────────────────────────
  accent:           '#6559ff', // --accent/background-->-default  (primary btn fill)
  accentBorder:     '#564be7', // --accent/border-->-default      (secondary btn border)
  accentText:       '#4740d4', // --accent/text-->-default        (secondary btn text, links)
  accentHover:      '#5049cc', // --accent/background-->-hover
  accentPressed:    '#4038b3', // --accent/background-->-pressed
  accentBgWeakest:  '#ecedfe', // --accent/background-->-weakest  (secondary hover tint, badges)
  accentBgWeaker:   '#e0e4ff', // --accent/background-->-weaker   (secondary pressed tint)
  onAccent:         '#ffffff', // --accent/text-->-on-default     (text/icon on accent fill)

  // ── Surface (cards, screens) ──────────────────────────────────────────────
  base:             '#e9edf6', // --background-->-default         (screen background)
  surface:          '#ffffff', // --surface/background-->-default (cards, inputs)

  // ── Text hierarchy ────────────────────────────────────────────────────────
  textSurface:      '#1f2533', // --surface/text-->-default
  textSurfaceWeak:  '#3f495a', // --surface/text-->-weak
  textSurfaceWeaker:'#545f70', // --surface/text-->-weaker
  textPlaceholder:  '#bfc6d4', // --surface/text-->-placeholder

  // ── Borders ───────────────────────────────────────────────────────────────
  borderDefault:    '#bfc6d4', // --surface/border-->-default (inputs, form fields)
  borderWeak:       '#dbe0eb', // --surface/border-->-weak    (card borders, dividers)

  // ── Semantic: negative ────────────────────────────────────────────────────
  negative:         '#cc3340', // --negative/background-->-default

  // ── Semantic: positive ────────────────────────────────────────────────────
  positiveBg:       '#e8fcf5', // --positive/background-->-weakest
  positiveBorder:   '#1eae7e', // --positive/background-->-hover
  positiveText:     '#0e6e50', // --positive/text-->-default

  // ── Semantic: warning (badge use) ─────────────────────────────────────────
  warningBgWeakest: '#fffae5', // --warning/background-->-weakest
  warningText:      '#9e4a00', // --warning/text-->-on-weaker

  // ── Semantic: neutral (badge use) ─────────────────────────────────────────
  neutralBg:        '#f1f3f7', // --surface/background-->-weakest

  // ── Shadow ────────────────────────────────────────────────────────────────
  shadow:           '#000000', // standard drop shadow colour

  // ── Dark UI (camera / face scan backgrounds) ──────────────────────────────
  cameraBg:         '#0d0d0d',

} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────
// 4pt base grid

export const spacing = {
  xxs: 2,
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xl2: 40,  // var(--space-10) — sits between xl and xxl on the 4pt grid
  xxl: 48,
} as const;

// ─── Border radius ────────────────────────────────────────────────────────────

export const radius = {
  xs:   4,
  sm:   8,   // --radius-small  (buttons, inputs, small cards)
  md:   12,  // --radius-medium (cards)
  lg:   16,  // --radius-large  (sheets, large cards)
  full: 9999,
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  size: {
    overline: 10, // Overline/Small
    xs:       12, // Label/Small, Body/xSmall
    sm:       14, // Label/Medium, Body/Small
    md:       16, // Label/Large, Body/Default
    title:    18, // Title/Medium
    lg:       20, // Title/Large
    xl:       24, // Headline/Small
    headline: 34, // Headline/Large (WelcomeScreen tagline)
    xxl:      32, // Display (legacy/FaceScan name)
  },
  weight: {
    regular:  '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
  },
  // Line heights paired to sizes (SC type scale)
  lineHeight: {
    overline: 12,
    xs:       16,
    sm:       20,
    md:       24,
    title:    24,
    lg:       28,
    xl:       32,
    headline: 40,
    xxl:      40,
  },
  // Letter spacing for headline styles
  letterSpacing: {
    tight:    -1,
    snug:     -0.5,
    normal:   0,
    wide:     1,
  },
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

export const layout = {
  maxContentWidth: 420,  // Figma: Card-Login width=420 in 834pt frame
  minTouchTarget:  44,
} as const;

// ─── Component tokens ─────────────────────────────────────────────────────────

export const component = {
  // Button
  buttonHeightMedium: 40,
  buttonHeightLarge:  48,

  // Avatar sizes
  avatarSm:  28,
  avatarMd:  32,
  avatarLg:  48,
  avatarXl:  56,

  // Input
  inputHeight: 40,
} as const;
