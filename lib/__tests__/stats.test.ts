import { computeStats } from '../stats';

describe('computeStats', () => {
  it('returns zeros for empty string', () => {
    const result = computeStats('');
    expect(result.words).toBe(0);
    expect(result.chars).toBe(0);
    expect(result.lines).toBe(0);
    expect(result.readingTime).toBe(1);
  });

  it('counts words correctly', () => {
    const result = computeStats('hello world foo');
    expect(result.words).toBe(3);
  });

  it('counts characters including whitespace', () => {
    const result = computeStats('ab cd');
    expect(result.chars).toBe(5);
  });

  it('counts lines by newlines', () => {
    const result = computeStats('line1\nline2\nline3');
    expect(result.lines).toBe(3);
  });

  it('single line has 1 line', () => {
    const result = computeStats('hello');
    expect(result.lines).toBe(1);
  });

  it('calculates reading time at 200 wpm with minimum of 1', () => {
    expect(computeStats('hello').readingTime).toBe(1);

    const twoHundredWords = Array(200).fill('word').join(' ');
    expect(computeStats(twoHundredWords).readingTime).toBe(1);

    const fourHundredWords = Array(400).fill('word').join(' ');
    expect(computeStats(fourHundredWords).readingTime).toBe(2);
  });

  it('handles whitespace-only input as zero words', () => {
    const result = computeStats('   \n  \n  ');
    expect(result.words).toBe(0);
  });
});
