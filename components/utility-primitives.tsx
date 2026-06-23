'use client';

import { useState, useCallback } from 'react';

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ClipboardCopyIcon, CheckIcon, InfoIcon } from 'lucide-react';

export function CopyButton({ value, compact }: { value: string; compact?: boolean }) {
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
        <Button
          type="button"
          variant="ghost-muted"
          size={compact ? 'icon-xs' : 'icon-sm'}
          onClick={handleCopy}
          disabled={!value}
          className="shrink-0"
        >
          {copied ? (
            <CheckIcon className={compact ? 'size-3.5' : 'size-4'} />
          ) : (
            <ClipboardCopyIcon className={compact ? 'size-3.5' : 'size-4'} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{copied ? 'Copied!' : 'Copy'}</TooltipContent>
    </Tooltip>
  );
}

export function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="ghost-muted" size="icon-xs">
          <InfoIcon className="size-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-64">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
