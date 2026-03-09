import { computeDiff } from '../diff';

describe('computeDiff', () => {
  it('returns all nulls for identical inputs', () => {
    const lines = ['a', 'b', 'c'];
    const { leftStatuses, rightStatuses } = computeDiff(lines, lines);
    expect(leftStatuses).toEqual([null, null, null]);
    expect(rightStatuses).toEqual([null, null, null]);
  });

  it('marks removed lines on the left', () => {
    const left = ['a', 'b', 'c'];
    const right = ['a', 'c'];
    const { leftStatuses, rightStatuses } = computeDiff(left, right);
    expect(leftStatuses).toEqual([null, 'removed', null]);
    expect(rightStatuses).toEqual([null, null]);
  });

  it('marks added lines on the right', () => {
    const left = ['a', 'c'];
    const right = ['a', 'b', 'c'];
    const { leftStatuses, rightStatuses } = computeDiff(left, right);
    expect(leftStatuses).toEqual([null, null]);
    expect(rightStatuses).toEqual([null, 'added', null]);
  });

  it('handles completely different inputs', () => {
    const left = ['a', 'b'];
    const right = ['c', 'd'];
    const { leftStatuses, rightStatuses } = computeDiff(left, right);
    expect(leftStatuses).toEqual(['removed', 'removed']);
    expect(rightStatuses).toEqual(['added', 'added']);
  });

  it('handles empty left', () => {
    const { leftStatuses, rightStatuses } = computeDiff([], ['a', 'b']);
    expect(leftStatuses).toEqual([]);
    expect(rightStatuses).toEqual(['added', 'added']);
  });

  it('handles empty right', () => {
    const { leftStatuses, rightStatuses } = computeDiff(['a', 'b'], []);
    expect(leftStatuses).toEqual(['removed', 'removed']);
    expect(rightStatuses).toEqual([]);
  });

  it('handles both empty', () => {
    const { leftStatuses, rightStatuses } = computeDiff([], []);
    expect(leftStatuses).toEqual([]);
    expect(rightStatuses).toEqual([]);
  });

  it('returns inline segments for paired changed lines', () => {
    const left = ['hello world'];
    const right = ['hello earth'];
    const result = computeDiff(left, right);
    expect(result.leftStatuses).toEqual(['removed']);
    expect(result.rightStatuses).toEqual(['added']);
    // "world" vs "earth" should be highlighted
    expect(result.leftInline[0]).toBeDefined();
    expect(result.rightInline[0]).toBeDefined();
    expect(result.leftInline[0]!.length).toBeGreaterThan(0);
    expect(result.rightInline[0]!.length).toBeGreaterThan(0);
  });

  it('returns null inline segments for identical lines', () => {
    const left = ['same', 'line'];
    const right = ['same', 'line'];
    const result = computeDiff(left, right);
    expect(result.leftInline).toEqual([null, null]);
    expect(result.rightInline).toEqual([null, null]);
  });

  it('returns null inline for unpaired lines (more removed than added)', () => {
    const left = ['a', 'b', 'c'];
    const right = ['x'];
    const result = computeDiff(left, right);
    // Only first pair gets inline segments, rest are null
    expect(result.leftInline[0]).toBeDefined();
    expect(result.leftInline[1]).toBeNull();
    expect(result.leftInline[2]).toBeNull();
  });

  it('highlights specific word changes', () => {
    const left = ['the quick brown fox'];
    const right = ['the slow brown cat'];
    const result = computeDiff(left, right);
    // "quick" and "fox" should be highlighted on left, "slow" and "cat" on right
    const leftSegs = result.leftInline[0]!;
    const rightSegs = result.rightInline[0]!;
    expect(leftSegs.length).toBe(2); // "quick" and "fox"
    expect(rightSegs.length).toBe(2); // "slow" and "cat"
  });
});
