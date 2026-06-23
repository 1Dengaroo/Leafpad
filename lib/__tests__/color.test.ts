import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  contrastRatio,
  contrastGrades,
  generateScale
} from '../color';

describe('hexToRgb', () => {
  it('parses 6-digit hex with and without #', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('expands 3-digit shorthand', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#abc')).toEqual({ r: 0xaa, g: 0xbb, b: 0xcc });
  });

  it('returns null for invalid input', () => {
    expect(hexToRgb('')).toBeNull();
    expect(hexToRgb('#xyz')).toBeNull();
    expect(hexToRgb('#12345')).toBeNull();
  });
});

describe('rgbToHex', () => {
  it('formats and zero-pads channels', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 99, g: 102, b: 241 })).toBe('#6366f1');
  });

  it('clamps out-of-range channels', () => {
    expect(rgbToHex({ r: 300, g: -5, b: 128 })).toBe('#ff0080');
  });
});

describe('hex <-> rgb round trip', () => {
  it('is stable for known colors', () => {
    for (const hex of ['#6366f1', '#000000', '#ffffff', '#123456', '#abcdef']) {
      expect(rgbToHex(hexToRgb(hex)!)).toBe(hex);
    }
  });
});

describe('rgb <-> hsl round trip', () => {
  it('recovers the original rgb within rounding tolerance', () => {
    for (const rgb of [
      { r: 99, g: 102, b: 241 },
      { r: 12, g: 200, b: 87 },
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 0 }
    ]) {
      const back = hslToRgb(rgbToHsl(rgb));
      expect(Math.abs(back.r - rgb.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(back.g - rgb.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(back.b - rgb.b)).toBeLessThanOrEqual(2);
    }
  });
});

describe('contrastRatio', () => {
  it('is 21:1 for black on white', () => {
    expect(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBeCloseTo(21, 5);
  });

  it('is 1:1 for identical colors', () => {
    expect(contrastRatio({ r: 50, g: 60, b: 70 }, { r: 50, g: 60, b: 70 })).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    const a = { r: 10, g: 20, b: 30 };
    const b = { r: 200, g: 180, b: 160 };
    expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 10);
  });
});

describe('contrastGrades', () => {
  it('passes all grades for black on white', () => {
    const g = contrastGrades({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(g.aa).toBe(true);
    expect(g.aaa).toBe(true);
    expect(g.aaLarge).toBe(true);
  });

  it('fails for low-contrast pairs', () => {
    const g = contrastGrades({ r: 200, g: 200, b: 200 }, { r: 255, g: 255, b: 255 });
    expect(g.aa).toBe(false);
    expect(g.aaa).toBe(false);
  });
});

describe('generateScale', () => {
  it('returns the requested number of valid hex steps', () => {
    const scale = generateScale({ r: 99, g: 102, b: 241 }, 11);
    expect(scale).toHaveLength(11);
    for (const hex of scale) {
      expect(hexToRgb(hex)).not.toBeNull();
    }
  });

  it('goes from light to dark', () => {
    const scale = generateScale({ r: 99, g: 102, b: 241 }, 11);
    const first = hexToRgb(scale[0])!;
    const last = hexToRgb(scale[scale.length - 1])!;
    const lum = (c: { r: number; g: number; b: number }) => c.r + c.g + c.b;
    expect(lum(first)).toBeGreaterThan(lum(last));
  });
});
