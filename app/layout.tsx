import type { Metadata } from 'next';
import { Sora, Space_Grotesk, Literata, Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { FontProvider } from '@/lib/theme/font-provider';
import { EditorThemeProvider } from '@/lib/theme/editor-theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });

const fontVariables = [
  sora.variable,
  spaceGrotesk.variable,
  literata.variable,
  plusJakarta.variable,
  newsreader.variable
].join(' ');

export const metadata: Metadata = {
  title: 'Leafpad | Clean Markdown Editor with Live Preview',
  description:
    'Free, ad-free markdown editor with live preview. Write, format, and preview markdown instantly. No sign-ups, no tracking, no nonsense.',
  keywords: [
    'markdown editor',
    'markdown preview',
    'markdown writer',
    'live preview',
    'markdown tools',
    'free markdown editor',
    'online markdown editor',
    'markdown formatter',
    'GFM',
    'ad-free markdown editor'
  ],
  icons: { icon: '/icon.svg' },
  metadataBase: new URL('https://leafpad.vercel.app'),
  openGraph: {
    title: 'Leafpad | Clean Markdown Editor with Live Preview',
    description: 'Write and preview markdown instantly. No ads, no sign-ups. Just a clean editor.',
    url: 'https://leafpad.vercel.app',
    type: 'website',
    siteName: 'Leafpad'
  },
  twitter: {
    card: 'summary',
    title: 'Leafpad | Clean Markdown Editor with Live Preview',
    description: 'Write and preview markdown instantly. No ads, no sign-ups. Just a clean editor.'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`} style={{ fontFamily: 'var(--font-sora)' }}>
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
            </EditorThemeProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
