export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#222',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#0a7ea4',
    icon: '#fff',
  },
} as const;

export type Theme = keyof typeof Colors;
