/**
 * Given a value and an array of numbers, returns the values of the lower and
 * upper bounds of the value in the array.
 *
 * @param {number} val - The value whose bounds we want to find.
 * @param {number[]} arr - The array of values.
 * @returns {[number, number]} An array containing the lower bound and the upper
 * bound of the given value in the array.
 */
export function bounds(val: number, arr: number[]): [number, number] {
  const allLower = arr.filter((x) => x < val);
  const allUpper = arr.filter((x) => x > val);

  const lowerBound = Math.max(...allLower);
  const upperBound = Math.min(...allUpper);
  return [lowerBound, upperBound];
}
