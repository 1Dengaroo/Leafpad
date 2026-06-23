'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CopyButton } from '@/components/utility-primitives';
import { estimateCrackTime } from '@/lib/crack-time';
import { useEditorTheme } from '@/lib/theme/editor-theme-provider';
import { RefreshCwIcon, KeyRoundIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const PASSWORD_OPTIONS = ['uppercase', 'lowercase', 'numbers', 'symbols'] as const;
type PasswordOption = (typeof PASSWORD_OPTIONS)[number];

const PASSWORD_SETS: Record<PasswordOption, string> = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?'
};

function generatePassword(length: number, pool: string): string {
  if (!pool) return '';
  // Rejection sampling to avoid modulo bias.
  const limit = Math.floor(256 / pool.length) * pool.length;
  let result = '';
  while (result.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < bytes.length && result.length < length; i++) {
      if (bytes[i] < limit) result += pool[bytes[i] % pool.length];
    }
  }
  return result;
}

function strengthLabel(entropy: number): { label: string; tone: string } {
  if (entropy < 40) return { label: 'Weak', tone: 'text-red-500' };
  if (entropy < 60) return { label: 'Fair', tone: 'text-amber-500' };
  if (entropy < 80) return { label: 'Strong', tone: 'text-lime-500' };
  return { label: 'Very strong', tone: 'text-emerald-500' };
}

export function PasswordGenerator() {
  const { editorTheme } = useEditorTheme();
  const c = editorTheme.colors;
  const [value, setValue] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<Record<PasswordOption, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });

  const pool = useMemo(
    () =>
      PASSWORD_OPTIONS.filter((key) => options[key])
        .map((key) => PASSWORD_SETS[key])
        .join(''),
    [options]
  );

  const entropy = pool ? Math.round(length * Math.log2(pool.length)) : 0;
  const crackTime = pool ? estimateCrackTime(length, pool.length) : '—';
  const strength = strengthLabel(entropy);

  const regenerate = useCallback(() => {
    setValue(generatePassword(length, pool));
  }, [length, pool]);

  // Generate on mount and whenever the inputs change. Runs only on the client
  // (effect), so there is no SSR/hydration mismatch from crypto randomness.
  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const toggle = useCallback((key: PasswordOption) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Never allow an empty character pool.
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-xl space-y-6 p-4 sm:p-8">
        <header className="space-y-1.5">
          <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <KeyRoundIcon className="text-primary size-5" />
            Password Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Cryptographically secure passwords generated locally in your browser with the Web Crypto
            API. Nothing is sent over the network.
          </p>
        </header>

        {/* Output */}
        <div
          className="flex items-center gap-2 rounded-xl border px-4 py-3"
          style={{ background: c.bg, borderColor: c.border }}
        >
          <span className="flex-1 font-mono text-base break-all" style={{ color: c.text }}>
            {value}
          </span>
          <CopyButton value={value} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={regenerate}
                className="text-primary hover:text-primary/80 shrink-0"
              >
                <RefreshCwIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Regenerate</TooltipContent>
          </Tooltip>
        </div>

        {/* Strength */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className={cn('font-semibold', strength.tone)}>{strength.label}</span>
          <span className="text-border">|</span>
          <span className="text-muted-foreground">{entropy} bits of entropy</span>
          <span className="text-border">|</span>
          <span className="text-muted-foreground">cracks in {crackTime}</span>
        </div>

        {/* Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="pw-length" className="text-sm font-medium">
              Length
            </label>
            <Input
              id="pw-length"
              type="number"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Math.max(4, Math.min(128, Number(e.target.value) || 16)))}
              className="h-8 w-20 text-center text-sm"
            />
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={Math.min(length, 64)}
            onChange={(e) => setLength(Number(e.target.value))}
            aria-label="Password length"
            className="accent-primary h-1.5 w-full cursor-pointer"
          />
        </div>

        {/* Character sets */}
        <div className="grid grid-cols-2 gap-2">
          {PASSWORD_OPTIONS.map((key) => (
            <label
              key={key}
              className="bg-muted/30 hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 text-sm capitalize transition-colors"
            >
              <span className="text-muted-foreground">{key}</span>
              <Switch checked={options[key]} onCheckedChange={() => toggle(key)} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
