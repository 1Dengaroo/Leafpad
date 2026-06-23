export interface EditorTheme {
  id: string;
  name: string;
  colors: {
    bg: string;
    text: string;
    gutterBg: string;
    gutterText: string;
    border: string;
    placeholder: string;
    readOnlyBg: string;
    syntax: {
      key: string;
      string: string;
      number: string;
      boolean: string;
      null: string;
      punctuation: string;
    };
  };
}

export const editorThemes: EditorTheme[] = [
  {
    id: 'auto',
    name: 'Theme Default',
    colors: {
      bg: 'hsl(var(--card))',
      text: 'hsl(var(--foreground))',
      gutterBg: 'hsl(var(--muted) / 0.5)',
      gutterText: 'hsl(var(--muted-foreground))',
      border: 'hsl(var(--border))',
      placeholder: 'hsl(var(--muted-foreground) / 0.5)',
      readOnlyBg: 'hsl(var(--muted) / 0.3)',
      syntax: {
        key: '#e05260',
        string: '#16a34a',
        number: '#c45e00',
        boolean: '#0284c7',
        null: '#9333ea',
        punctuation: 'hsl(var(--foreground))'
      }
    }
  },
  {
    id: 'light',
    name: 'Light',
    colors: {
      bg: '#ffffff',
      text: '#1a1a1a',
      gutterBg: '#f7f7f7',
      gutterText: '#a0a0a0',
      border: '#e5e5e5',
      placeholder: '#b0b0b0',
      readOnlyBg: '#fafafa',
      syntax: {
        key: '#b5002a',
        string: '#186a2e',
        number: '#1a00b8',
        boolean: '#0a3d8f',
        null: '#6a1b8a',
        punctuation: '#333333'
      }
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: {
      bg: '#0d0d0d',
      text: '#e8e8e8',
      gutterBg: '#080808',
      gutterText: '#4a4a4a',
      border: '#1f1f1f',
      placeholder: '#4a4a4a',
      readOnlyBg: '#0a0a0a',
      syntax: {
        key: '#ff8a8a',
        string: '#8aeea0',
        number: '#ffe066',
        boolean: '#99d5ff',
        null: '#e8a0ff',
        punctuation: '#888888'
      }
    }
  }
];
