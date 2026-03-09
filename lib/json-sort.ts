export function sortKeysDeep(val: unknown): unknown {
  if (Array.isArray(val)) return val.map(sortKeysDeep);
  if (val !== null && typeof val === 'object') {
    return Object.keys(val as Record<string, unknown>)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = sortKeysDeep((val as Record<string, unknown>)[key]);
          return acc;
        },
        {} as Record<string, unknown>
      );
  }
  return val;
}
