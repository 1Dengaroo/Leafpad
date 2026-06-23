'use client';

import { useCallback, useState } from 'react';

import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/utility-primitives';
import {
  type RGB,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  contrastRatio,
  contrastGrades,
  generateScale
} from '@/lib/color';
import { PaletteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const WHITE: RGB = { r: 255, g: 255, b: 255 };
const BLACK: RGB = { r: 0, g: 0, b: 0 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function readableText(rgb: RGB): string {
  return contrastRatio(rgb, WHITE) >= contrastRatio(rgb, BLACK) ? '#ffffff' : '#000000';
}

// ── Gradient-track slider ──────────────────────────────────────

const SLIDER_CLASS = cn(
  'h-3 w-full cursor-pointer appearance-none rounded-full border',
  '[&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent',
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.35)]',
  '[&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent',
  '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.35)]'
);

function ChannelSlider({
  label,
  value,
  min,
  max,
  gradient,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  gradient: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-muted-foreground text-xs font-medium">{label}</label>
        <Input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0, min, max))}
          className="h-7 w-16 text-center text-xs"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: gradient }}
        className={SLIDER_CLASS}
        aria-label={label}
      />
    </div>
  );
}

// ── Showcase: contrast ─────────────────────────────────────────

function Grade({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        'rounded px-1.5 py-0.5 text-[10px] font-semibold',
        ok
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          : 'text-muted-foreground bg-muted line-through'
      )}
    >
      {label}
    </span>
  );
}

function ContrastSample({ bg, label, rgb }: { bg: RGB; label: string; rgb: RGB }) {
  const grades = contrastGrades(rgb, bg);
  const bgHex = rgbToHex(bg);
  const fgHex = rgbToHex(rgb);
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="px-3 py-4" style={{ background: bgHex, color: fgHex }}>
        <div className="text-lg font-semibold">The quick brown fox</div>
        <div className="text-xs">jumps over the lazy dog</div>
      </div>
      <div className="bg-muted/30 flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-muted-foreground text-xs">
          {label} · <span className="font-mono">{grades.ratio.toFixed(2)}:1</span>
        </span>
        <div className="flex gap-1">
          <Grade ok={grades.aa} label="AA" />
          <Grade ok={grades.aaa} label="AAA" />
          <Grade ok={grades.aaLarge} label="AA Lg" />
        </div>
      </div>
    </div>
  );
}

// ── Showcase: live UI preview ──────────────────────────────────

function UIPreview({ rgb }: { rgb: RGB }) {
  const hex = rgbToHex(rgb);
  const onColor = readableText(rgb);
  return (
    <div className="bg-muted/20 flex flex-wrap items-center gap-3 rounded-lg border p-4">
      <button
        type="button"
        className="rounded-md px-3 py-1.5 text-sm font-medium shadow-sm"
        style={{ background: hex, color: onColor }}
      >
        Button
      </button>
      <span
        className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
        style={{ borderColor: hex, color: hex }}
      >
        Badge
      </span>
      <a
        href="#"
        className="text-sm font-medium underline underline-offset-2"
        style={{ color: hex }}
      >
        A sample link
      </a>
      <span className="text-sm" style={{ color: hex }}>
        Colored text
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Main ───────────────────────────────────────────────────────

export function ColorPicker() {
  const [rgb, setRgb] = useState<RGB>({ r: 99, g: 102, b: 241 });
  const [hexDraft, setHexDraft] = useState('#6366f1');

  const hsl = rgbToHsl(rgb);
  const hex = rgbToHex(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Single entry point for any non-hex-field change so the hex draft stays in sync.
  const applyRgb = useCallback((next: RGB) => {
    setRgb(next);
    setHexDraft(rgbToHex(next));
  }, []);

  const handleHexChange = useCallback((raw: string) => {
    setHexDraft(raw);
    const parsed = hexToRgb(raw);
    if (parsed) setRgb(parsed); // keep the user's typed text; don't normalize mid-edit
  }, []);

  const scale = generateScale(rgb, 11);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
        <header className="space-y-1.5">
          <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <PaletteIcon className="text-primary size-5" />
            Color Picker
          </h1>
          <p className="text-muted-foreground text-sm">
            Dial in a color with RGB and HSL sliders, then copy it as HEX, RGB, or HSL — with a live
            accessibility and usage preview.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Picker */}
          <div className="space-y-5">
            {/* Preview + formats */}
            <div className="space-y-2">
              <div
                className="h-28 w-full rounded-xl border shadow-inner"
                style={{ background: hex }}
              />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-9 shrink-0 text-xs font-medium">HEX</span>
                <Input
                  value={hexDraft}
                  onChange={(e) => handleHexChange(e.target.value)}
                  spellCheck={false}
                  className={cn(
                    'h-8 flex-1 font-mono text-sm',
                    !hexToRgb(hexDraft) && 'text-destructive'
                  )}
                />
                <CopyButton value={hex} compact />
              </div>
              {[
                { label: 'RGB', value: rgbString },
                { label: 'HSL', value: hslString }
              ].map((row) => (
                <div
                  key={row.label}
                  className="bg-muted/30 flex items-center gap-2 rounded-md border px-3 py-2"
                >
                  <span className="text-muted-foreground w-9 shrink-0 text-xs font-medium">
                    {row.label}
                  </span>
                  <span className="flex-1 font-mono text-sm">{row.value}</span>
                  <CopyButton value={row.value} compact />
                </div>
              ))}
            </div>

            {/* RGB sliders */}
            <Section title="RGB">
              <div className="space-y-3">
                <ChannelSlider
                  label="Red"
                  value={rgb.r}
                  min={0}
                  max={255}
                  gradient={`linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))`}
                  onChange={(r) => applyRgb({ ...rgb, r })}
                />
                <ChannelSlider
                  label="Green"
                  value={rgb.g}
                  min={0}
                  max={255}
                  gradient={`linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))`}
                  onChange={(g) => applyRgb({ ...rgb, g })}
                />
                <ChannelSlider
                  label="Blue"
                  value={rgb.b}
                  min={0}
                  max={255}
                  gradient={`linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))`}
                  onChange={(b) => applyRgb({ ...rgb, b })}
                />
              </div>
            </Section>

            {/* HSL sliders */}
            <Section title="HSL">
              <div className="space-y-3">
                <ChannelSlider
                  label="Hue"
                  value={hsl.h}
                  min={0}
                  max={360}
                  gradient="linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
                  onChange={(h) => applyRgb(hslToRgb({ ...hsl, h }))}
                />
                <ChannelSlider
                  label="Saturation"
                  value={hsl.s}
                  min={0}
                  max={100}
                  gradient={`linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))`}
                  onChange={(s) => applyRgb(hslToRgb({ ...hsl, s }))}
                />
                <ChannelSlider
                  label="Lightness"
                  value={hsl.l}
                  min={0}
                  max={100}
                  gradient={`linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)`}
                  onChange={(l) => applyRgb(hslToRgb({ ...hsl, l }))}
                />
              </div>
            </Section>
          </div>

          {/* Showcases */}
          <div className="space-y-6">
            <Section title="Tints & shades">
              <div className="flex overflow-hidden rounded-lg border">
                {scale.map((swatch, i) => {
                  const active = swatch.toLowerCase() === hex.toLowerCase();
                  return (
                    <button
                      key={`${swatch}-${i}`}
                      type="button"
                      title={swatch}
                      onClick={() => {
                        const parsed = hexToRgb(swatch);
                        if (parsed) applyRgb(parsed);
                      }}
                      className={cn(
                        'h-12 flex-1 transition-[flex-grow]',
                        active && 'ring-primary z-10 flex-[1.6] ring-2 ring-inset'
                      )}
                      style={{ background: swatch }}
                      aria-label={`Select ${swatch}`}
                    />
                  );
                })}
              </div>
            </Section>

            <Section title="Contrast (WCAG)">
              <div className="grid gap-3 sm:grid-cols-2">
                <ContrastSample bg={WHITE} label="on white" rgb={rgb} />
                <ContrastSample bg={BLACK} label="on black" rgb={rgb} />
              </div>
            </Section>

            <Section title="In use">
              <UIPreview rgb={rgb} />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
