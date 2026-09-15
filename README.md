# Trestly

Escrow for x402 payments on Stellar. This repo is the Next.js frontend —
connect a wallet, create an escrowed payment, manage disputes.

**Live:** [trestly.vercel.app](https://trestly.vercel.app) · **Docs:** [docs/](docs/README.md)

Trestly adds a dispute-aware escrow layer to x402 payments: instead of
settling instantly with no way back if a service fails to deliver, funds are
held in a Soroban contract until the dispute window closes. After that,
anyone can submit a `release` transaction to send undisputed funds to the
seller; a raised dispute routes the decision to the named arbiter.

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

Full walkthrough: [Local Setup](docs/developer/local-setup.md).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
```

## Documentation

The [`docs/`](docs/README.md) directory is the GitBook source:

- [What is Trestly](docs/introduction/what-is-trestly.md)
- [System Architecture](docs/introduction/architecture.md)
- [Using Trestly](docs/using/connecting-your-wallet.md)
- [Developer Guide](docs/developer/local-setup.md)
- [Contract Reference](docs/developer/contract-reference.md)
- [SDK Reference](docs/developer/sdk-reference.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
