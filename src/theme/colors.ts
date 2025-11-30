/**
 * App Color Palette
 * Based on the design guide and UI requirements
 */

export const colors = {
  // Primary Colors
  primary: '#2E2739', // Dark indigo/purple - Main background
  primaryLight: '#564CA3', // Deep purple - Accent/VIP

  // Background Colors
  background: '#F6F6FA', // Light gray/off-white - Light background
  backgroundSecondary: '#DBDBDF', // Light gray - Secondary background/divider

  // Text Colors
  textPrimary: '#2E2739', // Dark text on light background
  textSecondary: '#827D88', // Medium gray - Secondary text
  textLight: '#F6F6FA', // Light text on dark background

  // Accent Colors
  accentBlue: '#61C3F2', // Light blue - Primary action/CTA
  accentTeal: '#15D2BC', // Vibrant teal - Accent
  accentPink: '#E26CA5', // Bright pink - Accent
  accentGold: '#CD9D0F', // Gold/mustard yellow - VIP/Highlight

  // Seat Selection Colors
  seatSelected: '#CD9D0F', // Gold - Selected seats
  seatAvailable: '#61C3F2', // Light blue - Regular seats
  seatVIP: '#564CA3', // Deep purple - VIP seats
  seatUnavailable: '#827D88', // Medium gray - Not available

  // Status Colors
  success: '#15D2BC', // Teal
  error: '#E26CA5', // Pink
  warning: '#CD9D0F', // Gold

  // Border & Divider
  border: '#DBDBDF', // Light gray
  divider: '#DBDBDF', // Light gray

  // Overlay
  overlay: 'rgba(46, 39, 57, 0.8)', // Primary with opacity
} as const;

// Export individual color groups for easier access
export const primaryColors = {
  dark: colors.primary,
  light: colors.primaryLight,
} as const;

export const backgroundColors = {
  light: colors.background,
  secondary: colors.backgroundSecondary,
  dark: colors.primary,
} as const;

export const textColors = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  light: colors.textLight,
} as const;

export const accentColors = {
  blue: colors.accentBlue,
  teal: colors.accentTeal,
  pink: colors.accentPink,
  gold: colors.accentGold,
} as const;

export const seatColors = {
  selected: colors.seatSelected,
  available: colors.seatAvailable,
  vip: colors.seatVIP,
  unavailable: colors.seatUnavailable,
} as const;

// Type export for TypeScript
export type ColorName = keyof typeof colors;

