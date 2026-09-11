# Getting Started

## Try it live

The fastest way to see Trestly working: [trestly.vercel.app](https://trestly.vercel.app), connected to the testnet contract. You'll need:

1. The [Freighter](https://www.freighter.app/) browser extension, set to **Testnet**.
2. Free testnet XLM — fund your address via [Friendbot](https://friendbot.stellar.org?addr=YOUR_ADDRESS) (replace `YOUR_ADDRESS` with your Freighter public key).

Click **Launch Trestly**, connect your wallet (Freighter will pop up asking you to approve the connection — this is expected the first time), then create a payment.

## Run the app locally

```bash
git clone https://github.com/Michealshodipo56/trestly-app.git
cd trestly-app
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_CONTRACT_ID=CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Use the SDK directly

If you're integrating Trestly into your own agent or service rather than
using the web app, see the [SDK Reference](sdk-reference.md) — the short
version:

```bash
npm install trestly-sdk   # once published; see sdk-reference.md for the
                          # current install path
```

```ts
import { wrapX402Payment } from "trestly-sdk";

const result = await wrapX402Payment(config, {
  payer: buyerAddress,
  payee: sellerAddress,
  token: usdcAddress,
  amount: 125000000n, // 12.50 USDC (7 decimals)
  disputeWindowSecs: 10 * 60,
  arbiter: arbiterAddress,
  signTransaction: async (xdr) => await freighter.signTransaction(xdr),
});

console.log("Payment ID:", result.paymentId);
console.log("Tx hash:", result.txHash);
```

## Deploy your own contract

You don't need `stellar-cli` — see [Deployment](deployment.md) for a script-based
path using `@stellar/stellar-sdk` directly.
