'use client';

import { useState, useCallback } from 'react';
import { ClipboardCopyIcon, CheckIcon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

/**
 * Themed copy button that floats in the top-right corner of the code/JSON
 * editors. Uses the editor theme's gutter colors via inline styles and is
 * intentionally removed from the tab order (`tabIndex={-1}`) so it doesn't
 * interrupt keyboard flow through the editor surface.
 */
export function EditorCopyButton({
  value,
  colors
}: {
  value: string;
  colors: { gutterBg: string; gutterText: string; border: string };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="absolute top-2 right-2 z-10 rounded-md p-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover/editor:opacity-100"
          style={{
            background: colors.gutterBg,
            color: colors.gutterText,
            border: `1px solid ${colors.border}`
          }}
          tabIndex={-1}
          aria-label="Copy to clipboard"
        >
          {copied ? <CheckIcon className="size-3.5" /> : <ClipboardCopyIcon className="size-3.5" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{copied ? 'Copied!' : 'Copy'}</TooltipContent>
    </Tooltip>
  );
}
