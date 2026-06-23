'use client';

import { useState, useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/utility-primitives';
import { PilcrowIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOREM_WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ' +
  'incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud ' +
  'exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure ' +
  'in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur ' +
  'sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'
).split(' ');

function loremWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function loremSentence(): string {
  const length = 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length }, loremWord);
  return capitalize(words.join(' ')) + '.';
}

function loremParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, loremSentence).join(' ');
}

const LOREM_TYPES = ['paragraphs', 'sentences', 'words'] as const;
type LoremType = (typeof LOREM_TYPES)[number];

function generateLorem(type: LoremType, count: number): string {
  if (type === 'words') {
    const words = Array.from({ length: count }, loremWord);
    return capitalize(words.join(' ')) + '.';
  }
  if (type === 'sentences') {
    return Array.from({ length: count }, loremSentence).join(' ');
  }
  return Array.from({ length: count }, loremParagraph).join('\n\n');
}

export function LoremIpsum() {
  const [type, setType] = useState<LoremType>('paragraphs');
  const [count, setCount] = useState(3);
  const [value, setValue] = useState('');

  const regenerate = useCallback(() => {
    setValue(generateLorem(type, count));
  }, [type, count]);

  // Generate on the client whenever the controls change (avoids SSR mismatch
  // from Math.random).
  useEffect(() => {
    regenerate();
  }, [regenerate]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-8">
        <header className="space-y-1.5">
          <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <PilcrowIcon className="text-primary size-5" />
            Lorem Ipsum Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Placeholder text for mockups and layouts. Choose paragraphs, sentences, or words and how
            many you need.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex overflow-hidden rounded-md border">
            {LOREM_TYPES.map((option) => (
              <Button
                key={option}
                type="button"
                variant={type === option ? 'default' : 'ghost-muted'}
                onClick={() => setType(option)}
                className="h-auto rounded-none px-3 py-1.5 text-xs font-medium capitalize shadow-none"
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="lorem-count" className="text-muted-foreground">
              Count
            </label>
            <Input
              id="lorem-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="h-8 w-20 text-center text-sm"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={regenerate}>
            Regenerate
          </Button>
        </div>

        {/* Output */}
        <div className="border-input relative rounded-lg border bg-transparent p-4">
          <div className="absolute top-3 right-3">
            <CopyButton value={value} />
          </div>
          <div
            className={cn(
              'space-y-4 pr-8 text-sm leading-relaxed whitespace-pre-wrap',
              !value && 'text-muted-foreground italic'
            )}
          >
            {value || 'Generated text will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
