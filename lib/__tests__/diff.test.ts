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
});
