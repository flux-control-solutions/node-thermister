/** Maps numbers between ranges with linear interpolation or extrapolation. */
/**
 * Maps a value from one range of numbers to another.
 * Input and output endpoints can increase or decrease.
 * Inputs are not validated. Equal input endpoints can produce `NaN` or infinity.
 *
 * @param x - The value to map. Values outside the input range are extrapolated.
 * @param inMin - First input endpoint.
 * @param inMax - Second input endpoint. Use a value different from `inMin`.
 * @param outMin - Output value corresponding to `inMin`.
 * @param outMax - Output value corresponding to `inMax`.
 * @returns The linearly mapped value. The result is not rounded or clamped.
 */
export function map(
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
