# Trestly

Escrow for x402 payments on Stellar. This repo is the Next.js frontend —
connect a wallet, create an escrowed payment, manage disputes.

**Live:** [trestly.vercel.app](https://trestly.vercel.app) · **Docs:** [docs/](docs/README.md)

Trestly adds a dispute-aware escrow layer to x402 payments: instead of
settling instantly with no way back if a service fails to deliver, funds are
held in a Soroban contract and release automatically after a dispute
window — or route back to the buyer if a dispute is raised in time.

## The three repos

| Repo | What it is |
|---|---|
| [trestly-contract](https://github.com/Michealshodipo56/trestly-contract) | The Soroban smart contract |
| [trestly-sdk](https://github.com/Michealshodipo56/trestly-sdk) | TypeScript client library |
| **trestly-app** (this repo) | The Next.js frontend |

Deployed testnet contract:
[`CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD`](https://stellar.expert/explorer/testnet/contract/CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_CONTRACT_ID, etc.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll need the
[Freighter](https://www.freighter.app/) extension (set to Testnet) and some
free testnet XLM from [Friendbot](https://friendbot.stellar.org) to actually
create a payment.

Full walkthrough: [docs/getting-started.md](docs/getting-started.md).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
```

## Documentation

The [`docs/`](docs/README.md) directory is the source for this project's
GitBook documentation:

- [Architecture](docs/architecture.md) — how the contract, SDK, and this app fit together
- [Getting Started](docs/getting-started.md)
- [Contract Reference](docs/contract-reference.md)
- [SDK Reference](docs/sdk-reference.md)
- [Deployment](docs/deployment.md)
- [Security](docs/security.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
