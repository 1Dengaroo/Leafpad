import type { Metadata } from 'next';
import { Inter, Literata, Lexend } from 'next/font/google';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { FontProvider } from '@/lib/theme/font-provider';
import { EditorThemeProvider } from '@/lib/theme/editor-theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { JsonLd, websiteSchema } from '@/lib/structured-data';

// Inter — neutral, professional UI sans. Default font.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });
// Lexend — designed to improve reading proficiency; used as the dyslexia-friendly option.
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

const fontVariables = [inter.variable, literata.variable, lexend.variable].join(' ');

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
      <body className={`${fontVariables} antialiased`} style={{ fontFamily: 'var(--font-inter)' }}>
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
