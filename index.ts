import { bounds } from './src/bounds';
import { map } from './src/map';
import { conversionTable, resistances } from './src/type2_10k_conversion';
export { map } from './src/map';

/**
 * Given a resistance reading from a thermister, returns the corresponding
 * temperature in degrees Celsius.
 *
 * @param {number} resistance - The resistance reading from the thermister in Ohms.
 * @returns {number} The corresponding temperature in degrees Celsius.
 */
export function resistanceToDegreesC(resistance: number): number {
  const [lower, upper] = bounds(resistance, resistances);
  const lowerDegrees = conversionTable[lower];
  const upperDegrees = conversionTable[upper];

  const degreesC = map(resistance, lower, upper, lowerDegrees['c'], upperDegrees['c']);
  return degreesC;
}

/**
 * Given a resistance reading from a thermister, returns the corresponding
 * temperature in degrees Fahrenheit.
 *
 * @param {number} resistance - The resistance reading from the thermister in Ohms.
 * @returns {number} The corresponding temperature in degrees Fahrenheit.
 */
export function resistanceToDegreesF(resistance: number): number {
  const [lower, upper] = bounds(resistance, resistances);
  const lowerDegrees = conversionTable[lower];
  const upperDegrees = conversionTable[upper];

  const degreesC = map(resistance, lower, upper, lowerDegrees['f'], upperDegrees['f']);
  return degreesC;
}
