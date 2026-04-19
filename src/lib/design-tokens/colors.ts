export const colors = {
  bg: '#faf8f5',
  surface: '#e9e5dd',
  text: '#1a2e1a',
  textDim: '#4a4a4a',
  accent: '#e66000',
  accentAlt: '#ff8c42',
} as const;

export type ColorKeys = keyof typeof colors;