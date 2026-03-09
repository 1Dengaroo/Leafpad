'use client';

import { useState, useCallback, useRef, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { JsonEditor, type LineStatus } from '@/components/json-editor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { diffPresets } from '@/lib/diff-presets';
import { useEditorTheme } from '@/lib/theme/editor-theme-provider';
import { ResizeHandle } from '@/components/resize-handle';
import {
  GitCompareArrowsIcon,
  Trash2Icon,
  FlaskConicalIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { computeDiff, type InlineSegment } from '@/lib/diff';

const LEFT_KEY = 'leafpad-diff-left';
const RIGHT_KEY = 'leafpad-diff-right';

export function JsonDiff() {
  const { syntaxHighlight } = useEditorTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitFraction, setSplitFraction] = useState(0.5);
  const [left, setLeft] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(LEFT_KEY) ?? '';
  });
  const [right, setRight] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(RIGHT_KEY) ?? '';
  });
  const leftTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rightTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [mobileTab, setMobileTab] = useState<'left' | 'right'>('left');
  const loaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [leftStatuses, setLeftStatuses] = useState<LineStatus[] | undefined>();
  const [rightStatuses, setRightStatuses] = useState<LineStatus[] | undefined>();
  const [leftInline, setLeftInline] = useState<(InlineSegment[] | null)[] | undefined>();
  const [rightInline, setRightInline] = useState<(InlineSegment[] | null)[] | undefined>();

  const handleCompare = useCallback(() => {
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');
    const result = computeDiff(leftLines, rightLines);
    setLeftStatuses(result.leftStatuses);
    setRightStatuses(result.rightStatuses);
    setLeftInline(result.leftInline);
    setRightInline(result.rightInline);
  }, [left, right]);

  const clearDiffState = useCallback(() => {
    setLeftStatuses(undefined);
    setRightStatuses(undefined);
    setLeftInline(undefined);
    setRightInline(undefined);
  }, []);

  const handleClear = useCallback(() => {
    setLeft('');
    setRight('');
    clearDiffState();
    localStorage.removeItem(LEFT_KEY);
    localStorage.removeItem(RIGHT_KEY);
  }, [clearDiffState]);

  const handleLeftChange = useCallback(
    (v: string) => {
      setLeft(v);
      clearDiffState();
      if (leftTimerRef.current) clearTimeout(leftTimerRef.current);
      leftTimerRef.current = setTimeout(() => {
        localStorage.setItem(LEFT_KEY, v);
      }, 300);
    },
    [clearDiffState]
  );

  const handleRightChange = useCallback(
    (v: string) => {
      setRight(v);
      clearDiffState();
      if (rightTimerRef.current) clearTimeout(rightTimerRef.current);
      rightTimerRef.current = setTimeout(() => {
        localStorage.setItem(RIGHT_KEY, v);
      }, 300);
    },
    [clearDiffState]
  );

  const loadPreset = useCallback(
    (presetId: string) => {
      const preset = diffPresets.find((p) => p.id === presetId);
      if (!preset) return;
      setLeft(preset.left);
      setRight(preset.right);
      clearDiffState();
      localStorage.setItem(LEFT_KEY, preset.left);
      localStorage.setItem(RIGHT_KEY, preset.right);
    },
    [clearDiffState]
  );

  if (!loaded) return null;

  const jsonPresets = diffPresets.filter((p) => p.category === 'json');
  const textPresets = diffPresets.filter((p) => p.category === 'text');

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2 sm:px-4">
        <Button
          size="sm"
          onClick={handleCompare}
          disabled={!left.trim() && !right.trim()}
          className="gap-1.5"
        >
          <GitCompareArrowsIcon className="size-3.5" />
          Compare
        </Button>
        <Button size="sm" variant="outline" onClick={handleClear} className="gap-1.5">
          <Trash2Icon className="size-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </div>

      {/* Mobile tab bar */}
      <div className="flex border-b md:hidden">
        <button
          onClick={() => setMobileTab('left')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
            mobileTab === 'left'
              ? 'border-primary text-foreground border-b-2'
              : 'text-muted-foreground'
          )}
        >
          <ArrowLeftIcon className="size-3.5" />
          Left
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
            mobileTab === 'right'
              ? 'border-primary text-foreground border-b-2'
              : 'text-muted-foreground'
          )}
        >
          <ArrowRightIcon className="size-3.5" />
          Right
        </button>
      </div>

      {/* Editor panels */}
      <div ref={containerRef} className="flex min-h-0 flex-1 flex-col gap-0 md:flex-row">
        <div
          className={cn(
            'mobile-tab-panel flex flex-col p-3 md:flex md:border-b-0',
            mobileTab === 'left' ? 'min-h-0' : 'hidden'
          )}
          style={{ flex: `0 0 ${splitFraction * 100}%` }}
        >
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-muted-foreground hidden text-xs font-medium md:inline">Left</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="xs" className="text-muted-foreground gap-1">
                  <FlaskConicalIcon className="size-3" />
                  Presets
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>JSON</DropdownMenuLabel>
                {jsonPresets.map((p) => (
                  <DropdownMenuItem key={p.id} onClick={() => loadPreset(p.id)}>
                    {p.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Text</DropdownMenuLabel>
                {textPresets.map((p) => (
                  <DropdownMenuItem key={p.id} onClick={() => loadPreset(p.id)}>
                    {p.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="min-h-0 flex-1">
            <JsonEditor
              value={left}
              onChange={handleLeftChange}
              placeholder="Paste original text here..."
              lineStatuses={leftStatuses}
              inlineSegments={leftInline}
              syntaxHighlight={syntaxHighlight}
            />
          </div>
        </div>
        <ResizeHandle onResize={setSplitFraction} containerRef={containerRef} />
        <div
          className={cn(
            'mobile-tab-panel flex flex-col p-3 md:flex',
            mobileTab === 'right' ? 'min-h-0' : 'hidden'
          )}
          style={{ flex: 1 }}
        >
          <div className="mb-1.5 flex h-6 items-center">
            <span className="text-muted-foreground hidden text-xs font-medium md:inline">
              Right
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <JsonEditor
              value={right}
              onChange={handleRightChange}
              placeholder="Paste modified text here..."
              lineStatuses={rightStatuses}
              inlineSegments={rightInline}
              syntaxHighlight={syntaxHighlight}
            />
          </div>
        </div>
      </div>
    </>
  );
}
