# @flux-control/node-thermister

Convert Type 2 10K thermistor resistance readings to Celsius or Fahrenheit.
The library interpolates between resistance-table rows and includes TypeScript declarations.

> This package is pre-1.0. Its API may change before the first stable release.

## Install

With Bun:

```bash
bun add @flux-control/node-thermister
```

With npm:

```bash
npm install @flux-control/node-thermister
```

## Usage

Pass the measured thermistor resistance in ohms:

```ts
import { resistanceToDegreesC, resistanceToDegreesF } from '@flux-control/node-thermister';

const resistance = 10_000;

const celsius = resistanceToDegreesC(resistance);
const fahrenheit = resistanceToDegreesF(resistance);

console.log(Math.round(celsius)); // 25
console.log(Math.round(fahrenheit)); // 77
```

## API

### `resistanceToDegreesC(resistance)`

Returns the interpolated temperature in degrees Celsius for a resistance measured in ohms.
The result is a `number` and is not rounded.
Invalid inputs throw `RangeError`; see [Supported range](#supported-range).

### `resistanceToDegreesF(resistance)`

Returns the interpolated temperature in degrees Fahrenheit for a resistance measured in ohms.
The result is a `number` and is not rounded.
Invalid inputs throw `RangeError`; see [Supported range](#supported-range).

### `map(x, inMin, inMax, outMin, outMax)`

Maps a number between two ranges with this formula:

```text
((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
```

`outMin` corresponds to `inMin`; `outMax` corresponds to `inMax`.
Either range can increase or decrease.
The function extrapolates outside the input range and does not round or clamp the result.
It does not validate inputs.
If the input endpoints are equal, division by zero can produce `NaN` or infinity.

```ts
import { map } from '@flux-control/node-thermister';

console.log(map(5, 0, 10, 0, 100)); // 50
console.log(map(15, 0, 10, 0, 100)); // 150
console.log(map(5, 10, 0, 0, 100)); // 50
```

The package root exports these three functions.
The conversion table, its row type, and the bounds helper are internal modules.

## Supported range

The table endpoints are:

| Resistance   | Celsius   | Fahrenheit |
| ------------ | --------- | ---------- |
| 1,034 ohms   | 86.11 °C  | 187 °F     |
| 323,839 ohms | -39.44 °C | -39 °F     |

Conversion inputs must satisfy `1034 < resistance && resistance < 323839`.
Both endpoints, values outside the range, `NaN`, and infinities throw `RangeError`.
The temperature converters do not extrapolate outside this range.

```ts
import { resistanceToDegreesC } from '@flux-control/node-thermister';

const resistance = 10_000;

if (Number.isFinite(resistance) && resistance > 1034 && resistance < 323839) {
  console.log(resistanceToDegreesC(resistance));
} else {
  console.log('Resistance is outside the supported range.');
}
```

### Interpolation behavior

Each converter selects the nearest resistance strictly below the input and the nearest resistance strictly above it.
If the input matches an interior table resistance, that row is excluded and the neighboring rows are used.
For example, 10,000 ohms produces approximately 25.03 °C and 77.06 °F, rather than exactly 25 °C and 77 °F.
The usage example rounds those results for display.

Celsius and Fahrenheit are interpolated independently from their tabulated values.
Celsius table values have two decimal places; Fahrenheit table values are integers.
The two results can differ slightly from a direct scale conversion because of table rounding.
These functions do not apply sensor calibration or convert raw electrical measurements to resistance.

## Development

Run commands from the package root.
If a parent workspace manages dependencies, install from that workspace's root.

| Action                            | Command              |
| --------------------------------- | -------------------- |
| Install                           | `bun install`        |
| Check formatting                  | `bun run format`     |
| Apply formatting                  | `bun run format:fix` |
| Lint                              | `bun run lint`       |
| Type-check                        | `bun run typecheck`  |
| Test                              | `bun run test`       |
| Build JavaScript and declarations | `bun run build`      |

Package exports use `dist/`.
Build before testing package imports from a local clone.

## Source layout

- `index.ts`: Public temperature converters and `map` export.
- `src/type2_10k_conversion.ts`: Resistance and temperature table.
- `src/bounds.ts`: Strict lower and upper bound selection.
- `src/map.ts`: Linear mapping without validation or clamping.
- `src/index.test.ts`: Conversion, range, and mapping checks.

## License

[MIT](LICENSE)
