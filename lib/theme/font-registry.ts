export interface FontDefinition {
  id: string;
  name: string;
  variable: string;
  category: 'sans-serif' | 'serif';
}

export const fonts: FontDefinition[] = [
  {
    id: 'default',
    name: 'Default',
    variable: '--font-inter',
    category: 'sans-serif'
  },
  {
    id: 'serif',
    name: 'Serif',
    variable: '--font-literata',
    category: 'serif'
  },
  {
    id: 'system',
    name: 'System',
    variable: '--font-system',
    category: 'sans-serif'
  },
  {
    id: 'dyslexic',
    name: 'Dyslexic Friendly',
    variable: '--font-lexend',
    category: 'sans-serif'
  }
];

export function getFontDefinition(id: string): FontDefinition | undefined {
  return fonts.find((f) => f.id === id);
}
