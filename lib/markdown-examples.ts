export interface MarkdownExample {
  id: string;
  name: string;
  content: string;
}

export const markdownExamples: MarkdownExample[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    content: `# Welcome to Leafpad

Start writing markdown here and see it rendered in **real time** on the right.

## Features

- **Live preview** to see your changes instantly
- **GFM support** for tables, task lists, and strikethrough
- **Syntax highlighting** for fenced code blocks
- **Toolbar** with quick formatting shortcuts
- **Themes** including app themes, editor themes, and fonts

## Formatting

You can write **bold**, *italic*, and ~~strikethrough~~ text.

### Code

Inline \`code\` or fenced blocks:

\`\`\`tsx
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
\`\`\`

### Links & Images

[Visit GitHub](https://github.com/1Dengaroo)

### Blockquotes

> First, solve the problem. Then, write the code.
> — John Johnson

### Task Lists

- [x] Write some markdown
- [x] See it preview live
- [ ] Ship something great

### Tables

| Feature | Supported |
|---------|:---------:|
| Bold | Yes |
| Italic | Yes |
| Tables | Yes |
| Task Lists | Yes |
| Code Blocks | Yes |

### Ordered Lists

1. Write your markdown
2. See it preview live
3. Export when ready

---

*Built with care by [Andy Deng](https://andydeng.me).*
`
  },
  {
    id: 'blog-post',
    name: 'My Favorite Leetcode Problems',
    content: `# My Favorite LeetCode Problems

Here are some of the problems I keep coming back to.

## Best Time to Buy and Sell Stock IV (k Transactions)

This one is a classic DP problem. You track the best profit with at most \`k\` transactions using two states per transaction: holding and not holding.

\`\`\`python
from functools import lru_cache

def max_profit(k, prices):
    @lru_cache(maxsize=None)
    def dp(i, j, holding):
        if i == len(prices) or j == 0:
            return 0
        if holding:
            return max(dp(i+1, j, True), dp(i+1, j-1, False) + prices[i])
        else:
            return max(dp(i+1, j, False), dp(i+1, j, True) - prices[i])

    return dp(0, k, False)
\`\`\`

## Koko Eating Bananas

Binary search on the answer. Find the minimum eating speed \`k\` such that Koko can finish all piles within \`h\` hours.

\`\`\`python
import math

def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)

    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1

    return lo
\`\`\`

## Longest Increasing Subsequence

Patience sorting with binary search gives you O(n log n). One of the most satisfying optimizations.

\`\`\`python
from functools import lru_cache

def length_of_lis(nums):
    @lru_cache(maxsize=None)
    def dp(i, prev):
        if i == len(nums):
            return 0
        skip = dp(i + 1, prev)
        take = 0
        if prev == -1 or nums[i] > nums[prev]:
            take = 1 + dp(i + 1, i)
        return max(skip, take)

    return dp(0, -1)
\`\`\`

## Edit Distance

The quintessential 2D DP problem. Minimum operations to convert one string into another.

\`\`\`python
from functools import lru_cache

def min_distance(word1, word2):
    @lru_cache(maxsize=None)
    def dp(i, j):
        if i == 0:
            return j
        if j == 0:
            return i
        if word1[i-1] == word2[j-1]:
            return dp(i-1, j-1)
        return 1 + min(dp(i-1, j), dp(i, j-1), dp(i-1, j-1))

    return dp(len(word1), len(word2))
\`\`\`

---

*Written by [Andy Deng](https://andydeng.me).*
`
  },
  {
    id: 'cheatsheet',
    name: 'Markdown Cheatsheet',
    content: `# Markdown Cheatsheet

A quick reference for all the syntax you need.

---

## Text Formatting

| Syntax | Result |
|--------|--------|
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`~~strikethrough~~\` | ~~strikethrough~~ |
| \`\\\`inline code\\\`\` | \`inline code\` |

## Headings

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
\`\`\`

## Links & Images

\`\`\`markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.png)
\`\`\`

## Lists

**Unordered:**
- Item one
- Item two
  - Nested item

**Ordered:**
1. First
2. Second
3. Third

**Task list:**
- [x] Completed task
- [ ] Pending task

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Code Blocks

\`\`\`tsx
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

\`\`\`css
.container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
\`\`\`

## Tables

| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |     C |
| D    |   E    |     F |

## Horizontal Rule

---

## Escaping Characters

Use a backslash to show literal characters:

\`\\*not italic\\*\` renders as: \\*not italic\\*
`
  }
];
