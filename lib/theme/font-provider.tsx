'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fonts, type FontDefinition, getFontDefinition } from './font-registry';

interface FontContextValue {
  currentFont: FontDefinition;
  setFont: (id: string) => void;
}

const FontContext = createContext<FontContextValue | null>(null);

const STORAGE_KEY = 'app-font';
const DEFAULT_FONT_ID = 'sora';

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [fontId, setFontId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_FONT_ID;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && getFontDefinition(stored) ? stored : DEFAULT_FONT_ID;
  });

  useEffect(() => {
    const font = getFontDefinition(fontId);
    if (font) {
      document.body.style.fontFamily = `var(${font.variable})`;
    }
  }, [fontId]);

  const setFont = useCallback((id: string) => {
    if (getFontDefinition(id)) {
      setFontId(id);
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const currentFont = getFontDefinition(fontId) ?? fonts[0];

  return <FontContext.Provider value={{ currentFont, setFont }}>{children}</FontContext.Provider>;
}

export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error('useFont must be used within FontProvider');
  return ctx;
}
