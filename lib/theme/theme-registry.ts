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
    description: 'Clean neutral monochrome — crisp and minimal',
    isDark: false,
    previewColors: {
      bg: 'hsl(0 0% 99%)',
      primary: 'hsl(0 0% 16%)',
      accent: 'hsl(0 0% 94%)'
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Pure monochrome charcoal with cool steel',
    isDark: true,
    previewColors: {
      bg: 'hsl(0 0% 9%)',
      primary: 'hsl(214 14% 72%)',
      accent: 'hsl(0 0% 17%)'
    }
  }
];

export const themeIds = themes.map((t) => t.id);
export const darkThemeIds = themes.filter((t) => t.isDark).map((t) => t.id);

export function getThemeDefinition(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
