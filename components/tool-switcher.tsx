'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  CheckIcon,
  ChevronDownIcon,
  PencilLineIcon,
  BracesIcon,
  GitCompareArrowsIcon,
  WrenchIcon,
  StickyNoteIcon,
  PaletteIcon,
  KeyRoundIcon,
  PilcrowIcon
} from 'lucide-react';

export type Tool =
  | 'markdown'
  | 'json-formatter'
  | 'diff-tool'
  | 'utilities'
  | 'color-picker'
  | 'password-generator'
  | 'lorem-ipsum'
  | 'notepad';

const tools: {
  id: Tool;
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'markdown',
    href: '/markdown',
    label: 'Markdown',
    description: 'Editor with live preview',
    icon: <PencilLineIcon className="size-4" />
  },
  {
    id: 'json-formatter',
    href: '/json-formatter',
    label: 'JSON Formatter',
    description: 'Format, minify & sort',
    icon: <BracesIcon className="size-4" />
  },
  {
    id: 'diff-tool',
    href: '/diff-tool',
    label: 'Diff Tool',
    description: 'Compare JSON or text',
    icon: <GitCompareArrowsIcon className="size-4" />
  },
  {
    id: 'utilities',
    href: '/utilities',
    label: 'Utilities',
    description: 'IDs, hashes & encoders',
    icon: <WrenchIcon className="size-4" />
  },
  {
    id: 'color-picker',
    href: '/color-picker',
    label: 'Color Picker',
    description: 'HEX, RGB & HSL + contrast',
    icon: <PaletteIcon className="size-4" />
  },
  {
    id: 'password-generator',
    href: '/password-generator',
    label: 'Password Generator',
    description: 'Secure random passwords',
    icon: <KeyRoundIcon className="size-4" />
  },
  {
    id: 'lorem-ipsum',
    href: '/lorem-ipsum',
    label: 'Lorem Ipsum',
    description: 'Placeholder text',
    icon: <PilcrowIcon className="size-4" />
  },
  {
    id: 'notepad',
    href: '/notepad',
    label: 'Notepad',
    description: 'Quick notes & snippets',
    icon: <StickyNoteIcon className="size-4" />
  }
];

function getActiveTool(pathname: string): Tool | null {
  const match = tools.find((t) => t.href === pathname);
  return match?.id ?? null;
}

export function ToolSwitcher() {
  const pathname = usePathname();
  const activeTool = getActiveTool(pathname);
  const active = tools.find((t) => t.id === activeTool);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group data-[state=open]:bg-accent gap-1.5 px-2 font-medium"
        >
          {active && (
            <span className="text-muted-foreground group-data-[state=open]:text-foreground">
              {active.icon}
            </span>
          )}
          <span>{active?.label ?? 'Select tool'}</span>
          <ChevronDownIcon className="text-muted-foreground size-3.5 transition-transform duration-150 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6} className="w-64 p-1.5">
        <DropdownMenuLabel className="text-muted-foreground py-1 text-xs tracking-wide uppercase">
          Tools
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tools.map((t) => {
          const isActive = t.id === activeTool;
          return (
            <DropdownMenuItem key={t.id} asChild>
              <Link href={t.href} className={cn('gap-3 py-2', isActive && 'bg-accent/60')}>
                <span className={cn('text-muted-foreground', isActive && 'text-foreground')}>
                  {t.icon}
                </span>
                <div className="flex-1">
                  <div className={cn('text-sm', isActive ? 'font-semibold' : 'font-medium')}>
                    {t.label}
                  </div>
                  <div className="text-muted-foreground text-xs">{t.description}</div>
                </div>
                {isActive && <CheckIcon className="text-primary size-3.5" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
