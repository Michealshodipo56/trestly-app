# Local Setup

Trestly is split across three repos (see [System Architecture](../introduction/architecture.md)). This page covers running the frontend against a deployed contract. To also build or deploy the contract locally, see [`trestly-contract`](https://github.com/Trestly-team/trestly-contract).

## Prerequisites

- **Node.js** v20 or higher
- **[Freighter](https://www.freighter.app/)** browser extension, set to Testnet (for signing real transactions)
- **Testnet XLM** — fund your address via [Friendbot](https://friendbot.stellar.org?addr=YOUR_ADDRESS)

## 1. Clone and Install

```bash
git clone https://github.com/Trestly-team/trestly-app.git
cd trestly-app
npm install
```

## 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

See [Environment Variables](environment-variables.md) for what each one does. At minimum, set:

```bash
NEXT_PUBLIC_CONTRACT_ID=CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

To deploy your own contract instead of using the shared testnet deployment, see [Deployment](deployment.md).

## 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app lives at `/app`.

## 4. Use the SDK directly

If you are integrating Trestly into your own agent or service rather than using the web app:

```bash
npm install "git+https://github.com/Trestly-team/trestly-sdk.git#main"
```

See [SDK Reference](sdk-reference.md) and [x402 Integration](x402-integration.md).

## Building and deploying the contract

The contract lives in [`trestly-contract`](https://github.com/Trestly-team/trestly-contract):

```bash
git clone https://github.com/Trestly-team/trestly-contract.git
cd trestly-contract
cargo test
cargo build --target wasm32v1-none --release
node scripts/deploy-testnet.cjs
```

The deploy script prints the contract ID to put in `NEXT_PUBLIC_CONTRACT_ID`. See [Deployment](deployment.md) for the full walkthrough including end-to-end verification.
