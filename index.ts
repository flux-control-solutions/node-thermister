/** Converts Type 2 10K thermistor resistance readings to temperature. */
import { bounds } from './src/bounds';
import { map } from './src/map';
import { conversionTable, resistances, type ThermistorReading } from './src/type2_10k_conversion';
export { map } from './src/map';

interface Bracket {
  readonly lower: number;
  readonly upper: number;
  readonly lowerReading: ThermistorReading;
  readonly upperReading: ThermistorReading;
}

/**
 * Finds the nearest tabulated resistances strictly below and above a reading.
 * An exact interior table match is excluded from this bracket.
 *
 * @param resistance - Thermistor resistance in ohms.
 * @returns The bounding resistances and their tabulated temperatures.
 * @throws {RangeError} If either bound is absent, including for endpoint or non-finite inputs.
 */
function bracket(resistance: number): Bracket {
  const [lower, upper] = bounds(resistance, resistances);
  const lowerReading = conversionTable.get(lower);
  const upperReading = conversionTable.get(upper);

  if (lowerReading === undefined || upperReading === undefined) {
    throw new RangeError(
      `${resistance} Ohms is outside the Type 2 10K table, which covers 1034 to 323839 Ohms.`,
    );
  }

  return { lower, upper, lowerReading, upperReading };
}

/**
 * Converts a Type 2 10K resistance reading to degrees Celsius by linear interpolation.
 * Uses the nearest table rows strictly below and above the input, even for an exact table match.
 * The result is not rounded.
 *
 * @param resistance - Resistance in ohms. The value must be strictly inside the table range.
 * @returns The interpolated temperature in degrees Celsius.
 * @throws {RangeError} If the reading is at or outside the table endpoints, or is NaN.
 */
export function resistanceToDegreesC(resistance: number): number {
  const { lower, upper, lowerReading, upperReading } = bracket(resistance);
  return map(resistance, lower, upper, lowerReading.c, upperReading.c);
}

/**
 * Converts a Type 2 10K resistance reading to degrees Fahrenheit by linear interpolation.
 * Uses the nearest table rows strictly below and above the input, even for an exact table match.
 * The result is not rounded.
 *
 * @param resistance - Resistance in ohms. The value must be strictly inside the table range.
 * @returns The interpolated temperature in degrees Fahrenheit.
 * @throws {RangeError} If the reading is at or outside the table endpoints, or is NaN.
 */
export function resistanceToDegreesF(resistance: number): number {
  const { lower, upper, lowerReading, upperReading } = bracket(resistance);
  return map(resistance, lower, upper, lowerReading.f, upperReading.f);
}
