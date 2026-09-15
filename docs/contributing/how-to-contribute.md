# How to Contribute

Trestly is split across three repos — see [System Architecture](../introduction/architecture.md):

- [`trestly-contract`](https://github.com/Trestly-team/trestly-contract) — the Soroban contract (Rust)
- [`trestly-sdk`](https://github.com/Trestly-team/trestly-sdk) — the TypeScript client
- [`trestly-app`](https://github.com/Trestly-team/trestly-app) — the frontend

This documentation lives in `trestly-app/docs/` (GitBook source). Find the right repo for your code change before opening a PR — each has its own `CONTRIBUTING.md`, CI, and issue tracker.

## Finding something to work on

Check each repo's Issues tab:

- [trestly-contract issues](https://github.com/Trestly-team/trestly-contract/issues)
- [trestly-sdk issues](https://github.com/Trestly-team/trestly-sdk/issues)
- [trestly-app issues](https://github.com/Trestly-team/trestly-app/issues)

## Branch naming

Use one of these prefixes:

```
feat/your-feature-name
fix/what-you-are-fixing
docs/page-or-section-name
refactor/scope-of-change
test/what-is-being-tested
```

## Commit message format

Conventional Commits, one logical change per commit:

```
type(scope): short description in lowercase
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`

## Pull request process

1. Fork the relevant repo and branch off `main` using the naming rules above.
2. Run that repo's checks before opening the PR:
   - `trestly-contract`: `cargo test`
   - `trestly-sdk`: `npm test && npm run build`
   - `trestly-app`: `npm run lint && npm run build`
3. Open a Pull Request against `main`. Reference the issue number it addresses.
4. A maintainer will review within a few days. Push follow-up changes to the same branch rather than opening a new PR.

## Documentation changes

If your contribution changes how a contract function works, adds an environment variable, or adds a user-facing feature, update the relevant page in `docs/` as part of the same PR — even if the code change itself is in a different repo. Docs that drift from the code are harder to fix later than docs updated alongside the change.

## Vendored SDK workflow

`trestly-app` vendors a built copy of `trestly-sdk` at `vendor/trestly-sdk/` because Vercel only clones the app repo. If you change the SDK:

1. Build `trestly-sdk` (`npm run build`).
2. Copy `dist/` (and `package.json`) into `trestly-app/vendor/trestly-sdk/`.
3. Run `npm install` in `trestly-app` to refresh the lockfile.

Publishing `trestly-sdk` to npm (removing the need for vendoring) is a tracked open issue.

## Reporting a vulnerability

Open a GitHub issue on the relevant repo. See [Security Considerations](../contract/security.md#reporting-a-vulnerability).
