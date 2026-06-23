# Toolbench

A clean, ad-free set of developer tools: markdown editor, JSON formatter, diff tool, utilities, color picker, password generator, lorem ipsum, and a notepad.

**Live at [toolbench.vercel.app](https://toolbench.vercel.app)**

## Tools

### Markdown Editor

- Split-pane live preview
- Keyboard shortcuts (bold, italic, links, code blocks, and more)
- Export to `.md`, `.html`, or copy raw HTML
- Live stats: word count, character count, line count, reading time
- GFM support: tables, task lists, strikethrough
- Syntax-highlighted code blocks

### JSON Formatter

- Pretty-print and minify JSON
- Sort keys alphabetically (recursive)
- Configurable indentation (2-8 spaces)
- Export formatted output

### Diff Tool

- Compare JSON or text, line-by-line using an LCS algorithm
- Word-level inline highlighting for added and removed content
- Side-by-side view

### Utilities

- UUID v4 and Nano ID generators with entropy/crack-time estimates
- SHA-1/256/384/512 hashing
- Base64 and URL encode/decode

### Color Picker

- RGB and HSL sliders with live gradient tracks
- Convert between HEX, RGB, and HSL
- Tints & shades ramp, WCAG contrast checker, and live UI preview

### Password Generator

- Cryptographically secure (Web Crypto) with unbiased sampling
- Configurable length and character sets
- Live entropy and crack-time estimates

### Lorem Ipsum

- Generate placeholder paragraphs, sentences, or words
- Configurable count with instant copy

### Notepad

- Quick notes and snippets, auto-saved to localStorage

## Other Features

- Light and dark themes
- 5 editor themes
- 5 font options
- Auto-save to localStorage
- Responsive mobile layout with tabbed views
- Accessible: keyboard shortcuts, ARIA labels, semantic HTML

## Tech Stack

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [react-markdown](https://github.com/remarkjs/react-markdown) with remark-gfm
- [Prism](https://prismjs.com) for syntax highlighting

## Getting Started

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```

Tests cover utility functions (stats computation, JSON key sorting, LCS diff algorithm, color conversions and contrast) and data integrity checks for examples, presets, and theme definitions.

## Note

Git history was squashed for a clean starting point.

## Author

[Andy Deng](https://andydeng.me)
