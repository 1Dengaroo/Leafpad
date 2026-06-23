import { generateOgImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Password Generator - Strong Random Passwords - Toolbench';
export const size = ogSize;
export const contentType = ogContentType;

export default function OGImage() {
  return generateOgImage(
    'Password Generator',
    'Cryptographically secure random passwords with entropy estimates'
  );
}
