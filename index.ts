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
 * Finds the two tabulated resistances a reading falls between, along with
 * their temperatures, ready to interpolate across.
 *
 * @param {number} resistance - The resistance reading from the thermister in Ohms.
 * @returns {Bracket} The bounding resistances and their tabulated readings.
 * @throws {RangeError} If the reading falls outside the tabulated range, where
 * there is nothing to interpolate between.
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
 * Given a resistance reading from a thermister, returns the corresponding
 * temperature in degrees Celsius.
 *
 * @param {number} resistance - The resistance reading from the thermister in Ohms.
 * @returns {number} The corresponding temperature in degrees Celsius.
 */
export function resistanceToDegreesC(resistance: number): number {
  const { lower, upper, lowerReading, upperReading } = bracket(resistance);
  return map(resistance, lower, upper, lowerReading.c, upperReading.c);
}

/**
 * Given a resistance reading from a thermister, returns the corresponding
 * temperature in degrees Fahrenheit.
 *
 * @param {number} resistance - The resistance reading from the thermister in Ohms.
 * @returns {number} The corresponding temperature in degrees Fahrenheit.
 */
export function resistanceToDegreesF(resistance: number): number {
  const { lower, upper, lowerReading, upperReading } = bracket(resistance);
  return map(resistance, lower, upper, lowerReading.f, upperReading.f);
}
