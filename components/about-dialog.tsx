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
          <DialogTitle>About Toolbench</DialogTitle>
          <DialogDescription>Clean developer tools in one place.</DialogDescription>
        </DialogHeader>
        <div className="text-secondary-foreground space-y-3 text-sm">
          <p>
            Toolbench is a suite of clean, ad-free developer tools in one place. It includes a
            Markdown editor with live preview, a JSON formatter for beautifying, minifying, and
            sorting keys, a diff tool for comparing JSON or text side by side, a notepad for quick
            notes, and utilities like UUID and NanoID generators, Base64 encoding, and SHA-256
            hashing. No ads, no sign-ups, no tracking, and everything runs locally in your browser.
            Built by{' '}
            <a
              href="https://andydeng.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Andy Deng
            </a>
            .
          </p>
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
