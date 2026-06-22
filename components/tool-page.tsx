'use client';

import Link from 'next/link';
import { ToolSwitcher } from '@/components/tool-switcher';
import { SettingsDialog } from '@/components/settings-dialog';
import { AboutDialog } from '@/components/about-dialog';

export function ToolPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-y-auto md:overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-3 py-2 sm:px-4">
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground text-sm font-semibold tracking-tight transition-colors"
          >
            Leafpad · Toolbench
          </Link>
          <span className="text-muted-foreground/40 select-none" aria-hidden="true">
            /
          </span>
          <ToolSwitcher />
        </div>
        <div className="flex items-center gap-0.5">
          <SettingsDialog />
          <AboutDialog />
        </div>
      </header>

      {/* Active tool */}
      {children}
    </div>
  );
}
