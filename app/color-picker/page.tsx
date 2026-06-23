import type { Metadata } from 'next';
import { ToolPage } from '@/components/tool-page';
import { ColorPicker } from '@/components/color-picker';

export const metadata: Metadata = {
  title: 'Color Picker - HEX, RGB & HSL Converter with Contrast Checker',
  description:
    'Pick colors with RGB and HSL sliders and convert between HEX, RGB, and HSL. Generate tints and shades, check WCAG contrast ratios, and preview colors in real UI. Free and ad-free.',
  keywords: [
    'color picker',
    'hex to rgb',
    'rgb to hex',
    'hsl converter',
    'color converter',
    'wcag contrast checker',
    'tints and shades generator',
    'online color picker'
  ],
  openGraph: {
    title: 'Color Picker - HEX, RGB & HSL Converter | Toolbench',
    description:
      'Pick colors with RGB/HSL sliders, convert HEX/RGB/HSL, generate tints & shades, and check WCAG contrast.',
    url: 'https://toolbench.vercel.app/color-picker'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker - HEX, RGB & HSL Converter | Toolbench',
    description:
      'Pick colors with RGB/HSL sliders, convert HEX/RGB/HSL, generate tints & shades, and check WCAG contrast.'
  },
  alternates: {
    canonical: '/color-picker'
  }
};

export default function ColorPickerPage() {
  return (
    <ToolPage>
      <ColorPicker />
    </ToolPage>
  );
}
