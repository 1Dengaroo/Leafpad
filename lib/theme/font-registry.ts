export interface FontDefinition {
  id: string;
  name: string;
  variable: string;
  category: 'sans-serif' | 'serif';
}

export const fonts: FontDefinition[] = [
  {
    id: 'sora',
    name: 'Sora',
    variable: '--font-sora',
    category: 'sans-serif'
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    variable: '--font-space-grotesk',
    category: 'sans-serif'
  },
  {
    id: 'literata',
    name: 'Literata',
    variable: '--font-literata',
    category: 'serif'
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    variable: '--font-plus-jakarta',
    category: 'sans-serif'
  },
  {
    id: 'newsreader',
    name: 'Newsreader',
    variable: '--font-newsreader',
    category: 'serif'
  }
];

export function getFontDefinition(id: string): FontDefinition | undefined {
  return fonts.find((f) => f.id === id);
}
