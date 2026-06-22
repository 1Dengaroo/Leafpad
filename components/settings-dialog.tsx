'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import { SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useFont } from '@/lib/theme/font-provider';
import { useEditorTheme } from '@/lib/theme/editor-theme-provider';
import { themes } from '@/lib/theme/theme-registry';
import { editorThemes } from '@/lib/theme/editor-themes';
import { fonts } from '@/lib/theme/font-registry';
import { useSyncExternalStore } from 'react';

export function SettingsDialog() {
  const { theme, setTheme } = useTheme();
  const { currentFont, setFont } = useFont();
  const { editorThemeId, setEditorTheme, syntaxHighlight, setSyntaxHighlight } = useEditorTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const currentTheme = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground hover:bg-accent/60"
        >
          <SettingsIcon className="size-[15px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your editor appearance.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Theme */}
          <section>
            <h3 className="mb-3 text-sm font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <Button
                  key={t.id}
                  type="button"
                  variant="outline"
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    'h-auto flex-col gap-1.5 rounded-lg p-3 text-xs',
                    mounted && t.id === currentTheme.id && 'border-primary ring-primary ring-1'
                  )}
                >
                  <div className="flex gap-1">
                    <span
                      className="border-border/50 inline-block size-3.5 rounded-full border"
                      style={{ background: t.previewColors.bg }}
                    />
                    <span
                      className="border-border/50 inline-block size-3.5 rounded-full border"
                      style={{ background: t.previewColors.primary }}
                    />
                    <span
                      className="border-border/50 inline-block size-3.5 rounded-full border"
                      style={{ background: t.previewColors.accent }}
                    />
                  </div>
                  <span>{t.name}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* Editor Theme */}
          <section>
            <h3 className="mb-3 text-sm font-medium">Editor Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {editorThemes.map((t) => (
                <Button
                  key={t.id}
                  type="button"
                  variant="outline"
                  onClick={() => setEditorTheme(t.id)}
                  className={cn(
                    'h-auto flex-col gap-1.5 rounded-lg p-3 text-xs',
                    t.id === editorThemeId && 'border-primary ring-primary ring-1'
                  )}
                >
                  <div className="flex gap-1">
                    <span
                      className="border-border/50 inline-block size-3.5 rounded-sm border"
                      style={{ background: t.colors.bg }}
                    />
                    <span
                      className="border-border/50 inline-block size-3.5 rounded-sm border"
                      style={{ background: t.colors.text }}
                    />
                  </div>
                  <span>{t.name}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* Syntax Highlighting */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Syntax Highlighting</h3>
              <Switch
                checked={syntaxHighlight}
                onCheckedChange={setSyntaxHighlight}
                aria-label="Toggle syntax highlighting"
              />
            </div>
            <p className="text-muted-foreground mt-1 text-xs">Color JSON tokens in the editor</p>
          </section>

          {/* Font */}
          <section>
            <h3 className="mb-3 text-sm font-medium">Font</h3>
            <Select value={currentFont.id} onValueChange={setFont}>
              <SelectTrigger style={{ fontFamily: `var(${currentFont.variable})` }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((f) => (
                  <SelectItem key={f.id} value={f.id} style={{ fontFamily: `var(${f.variable})` }}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
