export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  isDark: boolean;
  previewColors: {
    bg: string;
    primary: string;
    accent: string;
  };
}

export const themes: ThemeDefinition[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Cool neutral paper, crisp and high-contrast',
    isDark: false,
    previewColors: {
      bg: 'hsl(220 20% 98%)',
      primary: 'hsl(234 58% 52%)',
      accent: 'hsl(220 16% 94%)'
    }
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    description: 'Warm ivory and espresso with deep teal',
    isDark: false,
    previewColors: {
      bg: 'hsl(40 30% 97%)',
      primary: 'hsl(178 44% 31%)',
      accent: 'hsl(40 16% 92%)'
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Neutral charcoal with a restrained indigo',
    isDark: true,
    previewColors: {
      bg: 'hsl(222 18% 9%)',
      primary: 'hsl(234 70% 67%)',
      accent: 'hsl(222 12% 16%)'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep navy blue-black with a clear azure',
    isDark: true,
    previewColors: {
      bg: 'hsl(220 40% 7%)',
      primary: 'hsl(200 88% 57%)',
      accent: 'hsl(218 30% 16%)'
    }
  },
  {
    id: 'graphite',
    name: 'Graphite',
    description: 'Pure monochrome charcoal with cool steel',
    isDark: true,
    previewColors: {
      bg: 'hsl(0 0% 9%)',
      primary: 'hsl(214 14% 72%)',
      accent: 'hsl(0 0% 17%)'
    }
  },
  {
    id: 'umber',
    name: 'Umber',
    description: 'Warm brown-black with a glowing amber',
    isDark: true,
    previewColors: {
      bg: 'hsl(28 16% 8%)',
      primary: 'hsl(36 80% 57%)',
      accent: 'hsl(28 12% 17%)'
    }
  }
];

export const themeIds = themes.map((t) => t.id);
export const darkThemeIds = themes.filter((t) => t.isDark).map((t) => t.id);

export function getThemeDefinition(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
