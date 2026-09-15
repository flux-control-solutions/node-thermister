---
'@flux-control/node-thermister': minor
---

Give the conversion table a type that matches its contents.

`conversionTable` is a `ReadonlyMap` from a resistance in Ohms to the temperature at that resistance. An index signature declares a value for every number. Most resistances are not in the table, so that type was not correct. `get` returns `undefined` for a resistance that the table does not hold. Each row has the type `ThermistorReading`.

`resistances` held strings at run time, but its type said numbers. `Object.keys` returns strings, and two type assertions hid this difference. The array holds numbers. The order of the values does not change.

The two conversion functions throw a `RangeError` for a reading outside the table. The message names the limits of the table. Before this change, the code read a property of an undefined row. The result was a `TypeError`.

`resistanceToDegreesC`, `resistanceToDegreesF`, and `map` keep their parameters and their results.

**Breaking:** a caller that reads `conversionTable[resistance]` must use `conversionTable.get(resistance)`. The result can be `undefined`.
