import type { Metadata } from 'next';
import { ToolPage } from '@/components/tool-page';
import { LoremIpsum } from '@/components/lorem-ipsum';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Placeholder Text',
  description:
    'Generate lorem ipsum placeholder text for mockups and layouts. Choose paragraphs, sentences, or words and set the count. Free, ad-free, instant copy.',
  keywords: [
    'lorem ipsum generator',
    'placeholder text generator',
    'dummy text generator',
    'lorem ipsum',
    'filler text',
    'online lorem ipsum'
  ],
  openGraph: {
    title: 'Lorem Ipsum Generator - Placeholder Text | Toolbench',
    description:
      'Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Instant copy.',
    url: 'https://toolbench.vercel.app/lorem-ipsum'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator - Placeholder Text | Toolbench',
    description:
      'Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Instant copy.'
  },
  alternates: {
    canonical: '/lorem-ipsum'
  }
};

export default function LoremIpsumPage() {
  return (
    <ToolPage>
      <LoremIpsum />
    </ToolPage>
  );
}
