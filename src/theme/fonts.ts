/**
 * App Font Configuration
 * Using Poppins as the primary font family
 */

export const fonts = {
  // Font Family
  primary: 'Poppins',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    title: 32,
    largeTitle: 36,
  },

  // Font Weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Typography presets for common text styles
export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.largeTitle,
    lineHeight: fonts.sizes.largeTitle * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: fonts.sizes.title,
    lineHeight: fonts.sizes.title * fonts.lineHeights.tight,
    fontWeight: fonts.weights.bold,
  },
  h3: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.xxl,
    lineHeight: fonts.sizes.xxl * fonts.lineHeights.normal,
    fontWeight: fonts.weights.semiBold,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.md,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
    fontWeight: fonts.weights.regular,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.sm,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
    fontWeight: fonts.weights.regular,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: fonts.sizes.xs,
    lineHeight: fonts.sizes.xs * fonts.lineHeights.normal,
    fontWeight: fonts.weights.regular,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: fonts.sizes.md,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
    fontWeight: fonts.weights.semiBold,
  },
} as const;


