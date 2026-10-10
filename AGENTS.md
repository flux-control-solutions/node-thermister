# @flux-control/node-thermister

Type 2 10K thermistor conversion utilities with TypeScript declarations.

## Development

Use Bun for package development.
Run commands from this repository's root. If a parent workspace manages dependencies, install from that workspace's root.

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
Run checks relevant to the change. For documentation-only changes, check formatting, paths, commands, and technical accuracy.

### Commit hook

- `bun install` installs the Husky hook through `prepare`. Run `bun run prepare` to reinstall it.
- The hook checks lockfile staging, fixes staged files with `lint-staged`, then runs package lint and tests.
- Oxlint fixes run before oxfmt. Remaining lint errors or test failures block the commit.
- Keep lint-staged's default backup and partial-staging protection enabled. Do not add a separate `git add` step.
- Package lint and tests run against the working tree after staged fixes.
- Run required type checks, builds, and Fallow audits separately before PR handoff.

### Fallow audit

- For code, dependency, or tooling configuration changes, run a Fallow audit alongside relevant type checks, lint, formatting, and tests.
- Run the audit from this repository's root after the final edits, before committing or opening or updating a pull request.

```bash
bunx fallow audit --base <base-ref>
```

- Replace `<base-ref>` with the merge-base commit between `HEAD` and the intended PR target branch.
- For uncommitted work only, use `HEAD`. Do not use `HEAD` to verify commits already included in a PR.
- The Fallow MCP `audit` tool is equivalent. Set `root` to this repository and `base` to the same comparison ref.
- Inspect the verdict and findings. Fix verified findings introduced by the change, then rerun the audit.
- Verify usage before deleting reported code or dependencies. Public exports can have consumers outside this repository.
- Explain remaining findings or false positives. Do not weaken rules or add baselines only to obtain a passing result.
- If Fallow cannot run, report the blocker. Do not count a skipped audit as a pass.
- Documentation-only changes do not require a Fallow audit.

## Conventions

- Keep the conversion functions deterministic and free of side effects.
- Preserve the documented Type 2 10K resistance range and strict boundary behavior.
- Add or update Bun tests for conversion, interpolation, range, or exported API changes.
- Keep runtime dependencies minimal.
- Let oxfmt own mechanical formatting.
- For conversion or exported API changes, run formatting, lint, type checks, tests, and the build.

## Written communication

Use Simplified Technical English principles for all text you create or revise.
This includes documentation, code comments, JSDoc, TODOs, test descriptions, error messages, and agent instructions.
It also includes commit messages, pull requests, review comments, release notes, and Linear titles, descriptions, comments, and updates.
Apply the same rules to prose inside examples, code blocks, and Markdown or HTML comments.

- Use short sentences, active voice, and concrete words.
- Give one instruction per sentence. Put each condition before the action that depends on it.
- Use the same term for the same concept.
- Aim for 20 words per instruction sentence and 25 words per descriptive sentence.
- Avoid idioms, metaphors, contractions, and unnecessary background.
- Explain the reason or constraint in code comments. Do not repeat the code.
- Preserve technical meaning, identifiers, commands, units, and required legal wording.
- Keep necessary quotations exact and identify them as quotations. Apply the public-repository rules to quotations too.
- Do not claim formal ASD-STE100 compliance without a complete review.

## Public repository

Treat this repository and its associated development records as public, regardless of its current visibility.

- Keep private information from consumers, customers, deployments, and other repositories out of public work.
- Apply this rule to every repository file, including agent instructions, code, comments, tests, fixtures, and examples.
- Apply it to documentation, commit messages, branch names, pull requests, review comments, issues, changesets, and release notes.
- Apply it to logs, screenshots, and other attachments intended for publication.
- Do not include private issue identifiers, URLs, customer names, deployment details, internal paths, or consumer-specific configuration.
- Use public dependency names and public repository references when needed.
- Use synthetic examples. Describe library requirements without naming private consumers.
- Accept consumer-specific context through parameters instead of embedding private values.
- Keep private tracking references in private records. Public records must remain understandable without private context.
- Check the destination repository and all proposed public text before committing, pushing, or opening a pull request.

## Commits and pull requests

- Commit, push, or open pull requests only when requested.
- Follow the repository's commit conventions. Use an imperative summary and explain important reasons in the body.
- Describe the change, verification results, and remaining limitations in pull requests.
- Include the Fallow audit scope, base ref, verdict, and unresolved findings with lint, formatting, type-check, and test results.
- Report failed checks and checks that you could not run.
- Do not rewrite published history unless explicitly requested.
- Keep `CLAUDE.md` as an `@AGENTS.md` import. Keep these instructions complete for a standalone clone.
