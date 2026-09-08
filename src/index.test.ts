import { describe, expect, test } from 'bun:test';

import { map, resistanceToDegreesC, resistanceToDegreesF } from '../index';

describe('@flux-control/node-thermister', () => {
  test('maps values between ranges', () => {
    expect(map(5, 0, 10, 0, 100)).toBe(50);
  });

  test('converts a Type 2 10K resistance reading', () => {
    expect(resistanceToDegreesC(10_000)).toBeCloseTo(25, 1);
    expect(resistanceToDegreesF(10_000)).toBeCloseTo(77, 0);
  });

  test('rejects a reading outside the tabulated range', () => {
    expect(() => resistanceToDegreesC(500_000)).toThrow(RangeError);
    expect(() => resistanceToDegreesF(500)).toThrow(RangeError);
  });
});
