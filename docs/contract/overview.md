# Smart Contract Overview

Trestly's on-chain logic is a single Soroban contract written in Rust using the `soroban-sdk`. One contract deployment handles all users and all payments — individual payments are differentiated by a `payment_id` integer stored in contract instance storage.

## Architecture

```
[Payer Wallet] <--sign--> [Trestly Frontend / SDK]
                                    |
                                    v
                    [Trestly Soroban Contract (Rust)]
                                    |
                                    v
                      [Token Contract (SAC) on Soroban]
```

The contract interacts with a Stellar Asset Contract (SAC) to perform token transfers. It never holds private keys — it holds tokens on behalf of payers, identified by their Stellar address, until release or resolution.

This is the contract's own view. The contract is one of three repos — see [System Architecture](../introduction/architecture.md) for how the SDK and frontend fit around it.

## Network

Trestly runs against **Soroban Testnet** in v1. The Soroban RPC endpoint is `https://soroban-testnet.stellar.org`. Freighter can be toggled to testnet mode in its settings.

**Deployed testnet contract:** [`CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD`](https://stellar.expert/explorer/testnet/contract/CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD)

## Source

[`trestly-contract`](https://github.com/Michealshodipo56/trestly-contract) — `contracts/trestly/src/lib.rs`
