// Estimate brute-force crack time for a randomly generated string.
// Assumes an attacker guessing at 10 billion attempts/second and the average
// case of searching half the keyspace. `alphabetSize` is the number of distinct
// symbols each position is drawn from (64 for Nano IDs by default).
export function estimateCrackTime(length: number, alphabetSize = 64): string {
  const guessesPerSecond = 1e10;
  const totalCombinations = Math.pow(alphabetSize, length);
  const seconds = totalCombinations / (2 * guessesPerSecond);

  if (!isFinite(seconds) || seconds > 1e30) return '∞ (heat death of universe)';
  if (seconds < 0.001) return '< 1 millisecond';
  if (seconds < 1) return `~${Math.round(seconds * 1000)} milliseconds`;
  if (seconds < 60) return `~${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `~${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `~${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `~${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365 * 1e3) return `~${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 1e6) return `~${Math.round(seconds / (86400 * 365 * 1e3))}K years`;
  if (seconds < 86400 * 365 * 1e9) return `~${Math.round(seconds / (86400 * 365 * 1e6))}M years`;
  if (seconds < 86400 * 365 * 1e12) return `~${Math.round(seconds / (86400 * 365 * 1e9))}B years`;
  return `~${(seconds / (86400 * 365 * 1e12)).toExponential(1)} trillion years`;
}
