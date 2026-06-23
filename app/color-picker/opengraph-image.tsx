import { generateOgImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Color Picker - HEX, RGB & HSL Converter - Toolbench';
export const size = ogSize;
export const contentType = ogContentType;

export default function OGImage() {
  return generateOgImage(
    'Color Picker',
    'Convert HEX, RGB & HSL with contrast checking and tints & shades'
  );
}
