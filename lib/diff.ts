export type LineStatus = 'added' | 'removed' | null;

export interface InlineSegment {
  start: number;
  end: number;
}

export interface DiffResult {
  leftStatuses: LineStatus[];
  rightStatuses: LineStatus[];
  leftInline: (InlineSegment[] | null)[];
  rightInline: (InlineSegment[] | null)[];
}

/** Tokenize a string into words and whitespace, preserving character offsets. */
function tokenize(str: string): { text: string; start: number; end: number }[] {
  const tokens: { text: string; start: number; end: number }[] = [];
  const regex = /\S+|\s+/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    tokens.push({ text: match[0], start: match.index, end: match.index + match[0].length });
  }
  return tokens;
}

/** Compute word-level inline diff between two lines. Returns changed character ranges. */
function computeInlineSegments(
  oldLine: string,
  newLine: string
): { oldSegments: InlineSegment[]; newSegments: InlineSegment[] } {
  const oldTokens = tokenize(oldLine);
  const newTokens = tokenize(newLine);
  const m = oldTokens.length;
  const n = newTokens.length;

  // LCS on word tokens
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldTokens[i - 1].text === newTokens[j - 1].text) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrace to find matched tokens
  const oldMatched = new Set<number>();
  const newMatched = new Set<number>();
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (oldTokens[i - 1].text === newTokens[j - 1].text) {
      oldMatched.add(i - 1);
      newMatched.add(j - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // Convert unmatched tokens to character ranges, merging adjacent
  function toSegments(
    tokens: { text: string; start: number; end: number }[],
    matched: Set<number>
  ): InlineSegment[] {
    const segments: InlineSegment[] = [];
    for (let k = 0; k < tokens.length; k++) {
      if (matched.has(k)) continue;
      const seg = { start: tokens[k].start, end: tokens[k].end };
      // Merge with previous if adjacent
      if (segments.length > 0 && segments[segments.length - 1].end === seg.start) {
        segments[segments.length - 1].end = seg.end;
      } else {
        segments.push(seg);
      }
    }
    return segments;
  }

  return {
    oldSegments: toSegments(oldTokens, oldMatched),
    newSegments: toSegments(newTokens, newMatched)
  };
}

export function computeDiff(leftLines: string[], rightLines: string[]): DiffResult {
  const m = leftLines.length;
  const n = rightLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const leftStatuses: LineStatus[] = new Array(m).fill(null);
  const rightStatuses: LineStatus[] = new Array(n).fill(null);

  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftLines[i - 1] === rightLines[j - 1]) {
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rightStatuses[j - 1] = 'added';
      j--;
    } else {
      leftStatuses[i - 1] = 'removed';
      i--;
    }
  }

  // Compute inline segments by pairing change hunks
  const leftInline: (InlineSegment[] | null)[] = new Array(m).fill(null);
  const rightInline: (InlineSegment[] | null)[] = new Array(n).fill(null);

  let li = 0;
  let ri = 0;
  while (li < m || ri < n) {
    // Skip common lines
    if (li < m && ri < n && leftStatuses[li] === null && rightStatuses[ri] === null) {
      li++;
      ri++;
      continue;
    }

    // Collect contiguous removed lines
    const removedStart = li;
    while (li < m && leftStatuses[li] === 'removed') li++;

    // Collect contiguous added lines
    const addedStart = ri;
    while (ri < n && rightStatuses[ri] === 'added') ri++;

    // Pair 1:1 and compute inline diff
    const removedCount = li - removedStart;
    const addedCount = ri - addedStart;
    const pairCount = Math.min(removedCount, addedCount);

    for (let k = 0; k < pairCount; k++) {
      const leftIdx = removedStart + k;
      const rightIdx = addedStart + k;
      const { oldSegments, newSegments } = computeInlineSegments(
        leftLines[leftIdx],
        rightLines[rightIdx]
      );
      // Only add inline segments if there are partial changes (not entire line changed)
      if (oldSegments.length > 0 || newSegments.length > 0) {
        leftInline[leftIdx] = oldSegments;
        rightInline[rightIdx] = newSegments;
      }
    }
  }

  return { leftStatuses, rightStatuses, leftInline, rightInline };
}
