'use client';

import { cn } from '@/lib/utils';

export interface MobileTab<T extends string> {
  value: T;
  label: string;
  icon: React.ReactNode;
}

/**
 * Mobile-only segmented tab bar used to switch between the two panels of a
 * split-pane tool (editor/preview, input/output, left/right). Hidden at `md`
 * and up where both panels are shown side by side.
 */
export function MobileTabSwitcher<T extends string>({
  tabs,
  value,
  onChange
}: {
  tabs: readonly MobileTab<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex border-b md:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
            'focus-visible:ring-ring/50 outline-none focus-visible:ring-2 focus-visible:ring-inset',
            value === tab.value
              ? 'border-primary text-foreground border-b-2'
              : 'text-muted-foreground'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
