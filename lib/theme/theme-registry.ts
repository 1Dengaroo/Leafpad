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
    id: 'manuscript',
    name: 'Manuscript',
    description: 'Clean parchment, pure focus',
    isDark: false,
    previewColors: {
      bg: 'hsl(45 20% 96%)',
      primary: 'hsl(168 40% 38%)',
      accent: 'hsl(45 10% 93%)'
    }
  },
  {
    id: 'campfire',
    name: 'Campfire',
    description: 'Warm amber glow, long sessions',
    isDark: false,
    previewColors: {
      bg: 'hsl(35 30% 95%)',
      primary: 'hsl(16 50% 45%)',
      accent: 'hsl(30 16% 92%)'
    }
  },
  {
    id: 'overcast',
    name: 'Overcast',
    description: 'Soft gray calm, distraction-free',
    isDark: false,
    previewColors: {
      bg: 'hsl(220 15% 96%)',
      primary: 'hsl(220 45% 50%)',
      accent: 'hsl(220 10% 93%)'
    }
  },
  {
    id: 'nightfall',
    name: 'Nightfall',
    description: 'Deep dark, easy on eyes',
    isDark: true,
    previewColors: {
      bg: 'hsl(230 20% 8%)',
      primary: 'hsl(168 45% 55%)',
      accent: 'hsl(230 12% 15%)'
    }
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Warm dark with golden edge',
    isDark: true,
    previewColors: {
      bg: 'hsl(25 18% 8%)',
      primary: 'hsl(38 60% 52%)',
      accent: 'hsl(25 12% 14%)'
    }
  },
  {
    id: 'inkwell',
    name: 'Inkwell',
    description: 'Deep blue-black, focused intensity',
    isDark: true,
    previewColors: {
      bg: 'hsl(245 30% 7%)',
      primary: 'hsl(240 50% 65%)',
      accent: 'hsl(245 16% 14%)'
    }
  }
];

export const themeIds = themes.map((t) => t.id);
export const darkThemeIds = themes.filter((t) => t.isDark).map((t) => t.id);

export function getThemeDefinition(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
