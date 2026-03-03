'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { InfoIcon } from 'lucide-react';

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground hover:bg-accent/60"
        >
          <InfoIcon className="size-[15px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Leafpad</DialogTitle>
          <DialogDescription>A clean markdown editor with live preview.</DialogDescription>
        </DialogHeader>
        <div className="text-secondary-foreground space-y-3 text-sm">
          <p>
            I wanted a markdown editor with a clean interface that stays out of the way. Leafpad is
            just that, no ads, no distractions, and a clean modern UX.
          </p>
          <p className="text-muted-foreground pt-1 text-xs">
            Built by{' '}
            <a
              href="https://andydeng.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Andy Deng
            </a>
          </p>
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
