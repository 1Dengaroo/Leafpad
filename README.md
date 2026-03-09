# Leafpad

A clean, ad-free set of developer tools: markdown editor, JSON formatter, and JSON diff.

**Live at [leafpad.vercel.app](https://leafpad.vercel.app)**

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

### JSON Diff

- Line-by-line comparison using LCS algorithm
- Visual highlighting for added and removed lines
- Side-by-side view

## Other Features

- 6 app themes (3 light, 3 dark)
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

Tests cover utility functions (stats computation, JSON key sorting, LCS diff algorithm) and data integrity checks for examples, presets, and theme definitions.

## Note

Git history was squashed for a clean starting point.

## Author

[Andy Deng](https://andydeng.me)
