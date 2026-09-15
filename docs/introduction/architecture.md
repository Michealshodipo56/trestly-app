# System Architecture

Trestly is split across three repositories, each with a single responsibility:

| Repo | Role |
|---|---|
| [`trestly-contract`](https://github.com/Trestly-team/trestly-contract) | The Soroban smart contract (Rust). Source of truth for every payment's state. |
| [`trestly-sdk`](https://github.com/Trestly-team/trestly-sdk) | TypeScript client that builds, simulates, signs, and submits contract calls. |
| [`trestly-app`](https://github.com/Trestly-team/trestly-app) | The Next.js frontend — reference UI and demo. |

## Topology

```
                     ┌───────────────────────┐
                     │   Freighter Wallet     │
                     │  (signs transactions)  │
                     └───────────┬───────────┘
                                 │ sign
                                 ▼
┌────────────────┐           ┌─────────────────────┐   RPC calls   ┌──────────────────────┐
│      User       │ ────────▶│   trestly-app        │──────────────▶│  Soroban RPC          │
│    (browser)     │           │  (Next.js frontend)   │  via          │  (Stellar Testnet)    │
└────────────────┘           │  + trestly-sdk        │  trestly-sdk  └───────────┬──────────┘
                              └─────────────────────┘                            │
                                                                                 ▼
                                                                    ┌──────────────────────┐
                                                                    │  Trestly Contract     │
                                                                    │  (on-chain storage)   │
                                                                    └──────────────────────┘
```

Every contract interaction happens directly from the browser:

- **No API routes** and **no server-side secrets** — the app is static/client-rendered.
- Freighter signs transactions; the SDK submits them to Stellar's public Soroban RPC endpoint.
- On-chain storage is the database — there is no indexer, no SQLite, no activity feed backend.

Hosting `trestly-app` (e.g. on Vercel) just serves the static/client-rendered site. The public RPC endpoint is free and requires no API key, though it is rate-limited and not intended for high-volume production traffic.

## Why three repos instead of one

- **trestly-contract** is Rust/Soroban — a completely different toolchain from the other two, with its own release cadence (contract upgrades are a much bigger deal than a frontend deploy).
- **trestly-sdk** is meant to be consumed by *anyone* building on Trestly — an AI agent framework, a different UI, a server-side integration. Keeping it separate from `trestly-app` is what makes that possible.
- **trestly-app** is the reference frontend, built on top of the SDK like any other consumer would.

One practical consequence: `trestly-app` depends on `trestly-sdk`, but Vercel only clones `trestly-app` itself, so it never sees the sibling checkout. The app vendors a built copy of the SDK (`vendor/trestly-sdk/`) until `trestly-sdk` is published to npm — see [How to Contribute](../contributing/how-to-contribute.md).

## Trust model

The **arbiter** is the one piece of this system that is not purely trustless — see [Arbiter Trust Model](../concepts/arbiter-trust-model.md). Everything else (the escrow hold, the dispute window, who can call what) is enforced entirely by the contract.
