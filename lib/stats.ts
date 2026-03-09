export function computeStats(markdown: string) {
  const text = markdown.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const chars = markdown.length;
  const lines = markdown ? markdown.split('\n').length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, lines, readingTime };
}
