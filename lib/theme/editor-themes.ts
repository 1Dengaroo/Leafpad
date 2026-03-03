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
      readOnlyBg: 'hsl(var(--muted) / 0.3)'
    }
  },
  {
    id: 'paper',
    name: 'Paper',
    colors: {
      bg: '#ffffff',
      text: '#1a1a1a',
      gutterBg: '#f7f7f7',
      gutterText: '#a0a0a0',
      border: '#e5e5e5',
      placeholder: '#b0b0b0',
      readOnlyBg: '#fafafa'
    }
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: {
      bg: '#2d3748',
      text: '#e2e8f0',
      gutterBg: '#252f3f',
      gutterText: '#718096',
      border: '#4a5568',
      placeholder: '#718096',
      readOnlyBg: '#2a3444'
    }
  },
  {
    id: 'ink',
    name: 'Ink',
    colors: {
      bg: '#0d0d0d',
      text: '#e8e8e8',
      gutterBg: '#080808',
      gutterText: '#4a4a4a',
      border: '#1f1f1f',
      placeholder: '#4a4a4a',
      readOnlyBg: '#0a0a0a'
    }
  },
  {
    id: 'sepia',
    name: 'Sepia',
    colors: {
      bg: '#f5f0e8',
      text: '#433422',
      gutterBg: '#ede7dd',
      gutterText: '#a09080',
      border: '#d9d0c3',
      placeholder: '#a09080',
      readOnlyBg: '#f0ebe2'
    }
  }
];
