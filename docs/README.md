# Trestly

Trestly adds a refund layer to [x402](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402) — the protocol AI agents use to pay per-request for APIs and services on Stellar.

Today, an x402 payment settles instantly with no way back if the service fails to deliver. Trestly holds the payment in escrow instead: funds release to the seller automatically after a short dispute window, or route back to the buyer if a dispute is raised in time.

No existing Stellar-native solution does this — the only comparable tool ([x402r](https://github.com/x402r)) is EVM-only.

- **Live app:** [trestly.vercel.app](https://trestly.vercel.app)
- **Deployed contract (testnet):** [`CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD`](https://stellar.expert/explorer/testnet/contract/CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD)

## The three repos

Trestly is split across three repos, each independently tested and deployed:

| Repo | What it is |
|---|---|
| [trestly-contract](https://github.com/Michealshodipo56/trestly-contract) | The Soroban smart contract — the actual escrow logic |
| [trestly-sdk](https://github.com/Michealshodipo56/trestly-sdk) | TypeScript client library that builds, simulates, signs, and submits transactions against the contract |
| [trestly-app](https://github.com/Michealshodipo56/trestly-app) | The Next.js frontend (this repo) — connect a wallet, create a payment, manage disputes |

## Where to go next

- New to the project? Start with [Architecture](architecture.md) to see how the three pieces fit together.
- Want to run it locally? [Getting Started](getting-started.md).
- Looking for the exact contract functions and error codes? [Contract Reference](contract-reference.md).
- Integrating the SDK into your own app or agent? [SDK Reference](sdk-reference.md).
- Deploying your own instance? [Deployment](deployment.md).
- Evaluating this for production use? Read [Security](security.md) first — this has not had a third-party audit and is currently testnet-only.

## Status

Contract logic is tested (12 unit tests covering the full create → dispute →
release/resolve lifecycle) and has been verified end-to-end against a live
testnet deployment — both the auto-release path and the dispute/resolve path.
It has not been deployed to mainnet and has not had a third-party security
audit; see [Security](security.md).
