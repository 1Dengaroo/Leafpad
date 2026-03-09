import { sortKeysDeep } from '../json-sort';

describe('sortKeysDeep', () => {
  it('sorts top-level keys alphabetically', () => {
    const input = { c: 1, a: 2, b: 3 };
    const result = sortKeysDeep(input) as Record<string, number>;
    expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
  });

  it('sorts nested object keys', () => {
    const input = { z: { b: 1, a: 2 }, a: 1 };
    const result = sortKeysDeep(input) as Record<string, unknown>;
    expect(Object.keys(result)).toEqual(['a', 'z']);
    expect(Object.keys(result.z as Record<string, unknown>)).toEqual(['a', 'b']);
  });

  it('sorts objects inside arrays', () => {
    const input = [
      { z: 1, a: 2 },
      { m: 3, b: 4 }
    ];
    const result = sortKeysDeep(input) as Record<string, number>[];
    expect(Object.keys(result[0])).toEqual(['a', 'z']);
    expect(Object.keys(result[1])).toEqual(['b', 'm']);
  });

  it('preserves primitive values', () => {
    expect(sortKeysDeep(42)).toBe(42);
    expect(sortKeysDeep('hello')).toBe('hello');
    expect(sortKeysDeep(true)).toBe(true);
    expect(sortKeysDeep(null)).toBe(null);
  });

  it('preserves array order', () => {
    const input = [3, 1, 2];
    expect(sortKeysDeep(input)).toEqual([3, 1, 2]);
  });

  it('handles deeply nested structures', () => {
    const input = { c: { b: { z: 1, a: 2 } } };
    const result = sortKeysDeep(input) as Record<string, Record<string, Record<string, number>>>;
    expect(Object.keys(result.c.b)).toEqual(['a', 'z']);
  });
});
