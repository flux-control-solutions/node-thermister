/** Finds strict lower and upper bounds without changing the input array. */
/**
 * Finds the greatest array value below the input and the least value above it.
 * Values equal to the input are excluded.
 *
 * @param val - The number to bound.
 * @param arr - The values to search. The array need not be sorted.
 * @returns A tuple containing the lower and upper bounds.
 * An absent lower bound is `-Infinity`; an absent upper bound is `Infinity`.
 */
export function bounds(val: number, arr: number[]): [number, number] {
  const allLower = arr.filter((x) => x < val);
  const allUpper = arr.filter((x) => x > val);

  const lowerBound = Math.max(...allLower);
  const upperBound = Math.min(...allUpper);
  return [lowerBound, upperBound];
}
