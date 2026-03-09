export type LineStatus = 'added' | 'removed' | null;

export function computeDiff(leftLines: string[], rightLines: string[]) {
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

  return { leftStatuses, rightStatuses };
}
