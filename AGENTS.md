# @flux-control/node-thermister

Type 2 10K thermistor conversion utilities with TypeScript declarations.

## Development

Use Bun for package development.

```bash
bun install
bun run format
bun run lint
bun run typecheck
bun run test
bun run build
```

`bun run format` checks formatting. Run `bun run format:fix` to write formatting changes.

After dependency changes, run `bun run lock` to regenerate and validate the lockfile.

## Conventions

- Keep the conversion functions deterministic and free of side effects.
- Preserve the documented Type 2 10K resistance range and strict boundary behavior.
- Add or update Bun tests for conversion, interpolation, range, or exported API changes.
- Keep runtime dependencies minimal.
- Let oxfmt own mechanical formatting.
- Run the complete development command sequence before completing a change.

## Public Repository

Treat all source, comments, documentation, commit messages, and pull request text as public.

Do not include private consumer details, issue-tracker keys, deployment names, customer or site names, or consumer-specific configuration vocabulary. Describe requirements in generic library terms. If an API needs consumer-specific context, accept it as a parameter instead of embedding that context in the library.
