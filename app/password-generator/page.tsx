import type { Metadata } from 'next';
import { ToolPage } from '@/components/tool-page';
import { PasswordGenerator } from '@/components/password-generator';

export const metadata: Metadata = {
  title: 'Password Generator - Strong Random Passwords',
  description:
    'Generate strong, cryptographically secure random passwords in your browser. Customize length and character sets, with live entropy and crack-time estimates. Free, ad-free, nothing sent over the network.',
  keywords: [
    'password generator',
    'random password generator',
    'strong password generator',
    'secure password',
    'password entropy',
    'online password generator'
  ],
  openGraph: {
    title: 'Password Generator - Strong Random Passwords | Toolbench',
    description:
      'Cryptographically secure random passwords with custom length, character sets, and entropy estimates.',
    url: 'https://toolbench.vercel.app/password-generator'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Strong Random Passwords | Toolbench',
    description:
      'Cryptographically secure random passwords with custom length, character sets, and entropy estimates.'
  },
  alternates: {
    canonical: '/password-generator'
  }
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPage>
      <PasswordGenerator />
    </ToolPage>
  );
}
