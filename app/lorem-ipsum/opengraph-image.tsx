import { generateOgImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Lorem Ipsum Generator - Placeholder Text - Toolbench';
export const size = ogSize;
export const contentType = ogContentType;

export default function OGImage() {
  return generateOgImage(
    'Lorem Ipsum Generator',
    'Placeholder text by paragraphs, sentences, or words'
  );
}
