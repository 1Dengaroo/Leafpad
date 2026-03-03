'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { editorThemes, type EditorTheme } from './editor-themes';

interface EditorThemeContext {
  editorTheme: EditorTheme;
  editorThemeId: string;
  setEditorTheme: (id: string) => void;
}

const Context = createContext<EditorThemeContext>({
  editorTheme: editorThemes[0],
  editorThemeId: 'auto',
  setEditorTheme: () => {}
});

export function EditorThemeProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState('auto');

  const editorTheme = editorThemes.find((t) => t.id === id) ?? editorThemes[0];

  const setEditorTheme = useCallback((newId: string) => {
    setId(newId);
  }, []);

  return (
    <Context.Provider value={{ editorTheme, editorThemeId: id, setEditorTheme }}>
      {children}
    </Context.Provider>
  );
}

export function useEditorTheme() {
  return useContext(Context);
}
