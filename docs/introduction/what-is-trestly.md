# What is Trestly

Trestly adds a refund layer to [x402](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402) — the protocol AI agents use to pay per-request for APIs and services on Stellar.

Today, an x402 payment settles instantly with no way back if the service fails to deliver. Trestly holds the payment in escrow instead: once a short dispute window closes, anyone can submit `release` to send an undisputed payment to the seller; a dispute routes the decision to the named arbiter.

The lock is enforced by a Soroban smart contract, not a promise. There is no custodian holding your funds off-chain and no UI toggle that bypasses the escrow rules — the contract itself governs when money moves.

No existing Stellar-native solution does this — the only comparable tool ([x402r](https://github.com/x402r)) is EVM-only.

- **Live app:** [trestly.vercel.app](https://trestly.vercel.app)
- **Deployed contract (testnet):** [`CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD`](https://stellar.expert/explorer/testnet/contract/CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD)

## What Trestly Is Not

Trestly is not a payment processor in the traditional sense — it does not hold private keys or run a backend that settles on your behalf. It is not a multisig or DAO arbitration platform in v1 — each payment names a single arbiter address chosen at creation time. It does not support partial settlements — a disputed payment resolves entirely to the payer or the payee. It is currently **testnet-only** and has **not** had a third-party security audit.

## The three repos

Trestly is split across three repos, each independently versioned and tested. The contract is deployed to Stellar testnet and the frontend is deployed to Vercel; the SDK is distributed as source/build artifacts and is not yet published to npm.

| Repo | What it is |
|---|---|
| [trestly-contract](https://github.com/Trestly-team/trestly-contract) | The Soroban smart contract — the actual escrow logic |
| [trestly-sdk](https://github.com/Trestly-team/trestly-sdk) | TypeScript client library that builds, simulates, signs, and submits transactions against the contract |
| [trestly-app](https://github.com/Trestly-team/trestly-app) | The Next.js frontend — connect a wallet, create a payment, manage disputes |

## Where to go next

- New to the project? Start with [How It Works](how-it-works.md) and [System Architecture](architecture.md).
- Want to run it locally? [Local Setup](../developer/local-setup.md).
- Looking for exact contract functions and error codes? [Contract Reference](../developer/contract-reference.md).
- Integrating the SDK into your own app or agent? [SDK Reference](../developer/sdk-reference.md) and [x402 Integration](../developer/x402-integration.md).
- Evaluating this for production use? Read [Security Considerations](../contract/security.md) first.
