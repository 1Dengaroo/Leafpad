import Link from 'next/link';
import { ToolPage } from '@/components/tool-page';

const tools = [
  { href: '/markdown', title: 'Markdown Editor' },
  { href: '/json-formatter', title: 'JSON Formatter' },
  { href: '/diff-tool', title: 'Diff Tool' },
  { href: '/utilities', title: 'Utilities' },
  { href: '/color-picker', title: 'Color Picker' },
  { href: '/password-generator', title: 'Password Generator' },
  { href: '/lorem-ipsum', title: 'Lorem Ipsum' },
  { href: '/notepad', title: 'Notepad' }
];

export default function LandingPage() {
  return (
    <ToolPage>
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-20">
        <div className="w-full max-w-xs">
          <span className="text-lg font-bold tracking-tight">Toolbench</span>
          <p className="text-muted-foreground mt-2 text-sm">
            A clean, ad-free suite of developer tools.
          </p>

          <nav className="mt-8 flex flex-col">
            {tools.map(({ href, title }) => (
              <Link
                key={href}
                href={href}
                className="text-foreground/80 hover:text-foreground border-b py-3 text-sm transition-colors last:border-b-0"
              >
                {title}
              </Link>
            ))}
          </nav>

          <p className="text-muted-foreground mt-8 text-xs">
            Made with <span className="text-primary">♥</span> by{' '}
            <a
              href="https://github.com/1Dengaroo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Andy Deng
            </a>
          </p>
        </div>
      </div>
    </ToolPage>
  );
}
