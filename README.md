# @flux-control/node-thermister

Convert Type 2 10K thermistor resistance readings to Celsius or Fahrenheit. The library uses linear interpolation between points in its resistance table and ships with TypeScript declarations.

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

### `resistanceToDegreesF(resistance)`

Returns the interpolated temperature in degrees Fahrenheit for a resistance measured in ohms.

### `map(value, inputMin, inputMax, outputMin, outputMax)`

Maps a number from one range to another. This utility is exported for consumers that need the same linear interpolation behavior.

## Supported Range

The bundled Type 2 10K table covers 1,034 to 323,839 ohms, corresponding to approximately 86.11 C to -39.44 C (187 F to -39 F). Conversion inputs must be strictly inside those resistance bounds. Validate sensor readings before conversion; extrapolation outside the table is not supported.

## Development

| Action     | Command             |
| ---------- | ------------------- |
| Install    | `bun install`       |
| Format     | `bun run format`    |
| Lint       | `bun run lint`      |
| Type-check | `bun run typecheck` |
| Test       | `bun run test`      |
| Build      | `bun run build`     |

## License

[MIT](LICENSE)
