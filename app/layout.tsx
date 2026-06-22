import type { Metadata } from 'next';
import { Sora, Space_Grotesk, Literata, Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { FontProvider } from '@/lib/theme/font-provider';
import { EditorThemeProvider } from '@/lib/theme/editor-theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { JsonLd, websiteSchema } from '@/lib/structured-data';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });
// Switzer — clean geometric sans (Fontshare, free). Default UI font.
const switzer = localFont({
  src: [
    { path: './fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Switzer-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Switzer-Extrabold.woff2', weight: '800', style: 'normal' }
  ],
  variable: '--font-switzer',
  display: 'swap'
});

const fontVariables = [
  switzer.variable,
  sora.variable,
  spaceGrotesk.variable,
  literata.variable,
  plusJakarta.variable,
  newsreader.variable
].join(' ');

export const metadata: Metadata = {
  title: {
    default: 'Toolbench | Free Developer Tools',
    template: '%s | Toolbench'
  },
  description:
    'Free, ad-free developer tools. JSON formatter, markdown editor, diff tool, notepad, and utilities like UUID generator, Base64 encoder, and SHA-256 hashing. No sign-ups, no tracking.',
  keywords: [
    'developer tools',
    'devtools',
    'json formatter',
    'json beautifier',
    'json minifier',
    'online json formatter',
    'markdown editor',
    'free markdown editor',
    'json diff',
    'text diff',
    'diff tool',
    'uuid generator',
    'nanoid generator',
    'base64 encoder',
    'base64 decoder',
    'hash generator',
    'sha256',
    'sha512',
    'notepad',
    'sticky notes',
    'quick notes',
    'developer notepad',
    'free developer tools',
    'online developer tools'
  ],
  icons: { icon: '/logo.svg' },
  metadataBase: new URL('https://toolbench.vercel.app'),
  openGraph: {
    title: 'Toolbench | Free Developer Tools',
    description:
      'Free developer tools: JSON formatter, markdown editor, diff tool, notepad, and utilities. No ads, no sign-ups.',
    url: 'https://toolbench.vercel.app',
    type: 'website',
    siteName: 'Toolbench'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolbench | Free Developer Tools',
    description:
      'Free developer tools: JSON formatter, markdown editor, diff tool, notepad, and utilities. No ads, no sign-ups.'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className={`${fontVariables} antialiased`}
        style={{ fontFamily: 'var(--font-switzer)' }}
      >
        <ThemeProvider>
          <FontProvider>
            <EditorThemeProvider>
              <TooltipProvider>
                {children}
                <Toaster
                  toastOptions={{
                    classNames: {
                      success: '[&>[data-icon]]:text-green-500'
                    }
                  }}
                />
              </TooltipProvider>
              <Analytics />
            </EditorThemeProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
