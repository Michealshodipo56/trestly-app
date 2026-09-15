# SDK Reference

Source: [trestly-sdk](https://github.com/Michealshodipo56/trestly-sdk)

`trestly-sdk` is a TypeScript client library that wraps the Trestly contract — it builds, simulates, signs (via a callback you provide, so it is not tied to any specific wallet), and submits transactions.

## Install

`trestly-sdk` is not yet published to npm (see [System Architecture](../introduction/architecture.md)). Until then:

```bash
npm install "git+https://github.com/Michealshodipo56/trestly-sdk.git#main"
```

or clone it and build it yourself:

```bash
git clone https://github.com/Michealshodipo56/trestly-sdk.git
cd trestly-sdk
npm install && npm run build
```

## Config

Every function takes a `TrestlyConfig` as its first argument:

```ts
import type { TrestlyConfig } from "trestly-sdk";

const config: TrestlyConfig = {
  contractId: "CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD",
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
};
```

## `createPayment`

```ts
const { paymentId, txHash } = await createPayment(config, {
  payer: string,
  payee: string,
  token: string,          // the SEP-41 / Stellar Asset Contract address
  amount: bigint,         // in the token's smallest unit
  disputeWindowSecs: number,
  arbiter: string,
  signTransaction: (xdr: string) => Promise<string>,
});
```

## `raiseDispute`

```ts
const { txHash } = await raiseDispute(config, {
  paymentId: number,
  payer: string,           // must match the payment's original payer
  signTransaction: (xdr: string) => Promise<string>,
});
```

## `release`

```ts
const { txHash } = await release(
  config,
  paymentId,
  submitterAccount,   // any funded account -- release needs no special auth
  signTransaction
);
```

## `resolveDispute`

```ts
const { txHash } = await resolveDispute(config, {
  paymentId: number,
  arbiter: string,          // must match the payment's arbiter
  refundToPayer: boolean,
  signTransaction: (xdr: string) => Promise<string>,
});
```

## `getPayment`

```ts
const payment: EscrowedPayment = await getPayment(config, paymentId);
// { payer, payee, token, amount, disputeWindowEnd, arbiter, disputed, resolved }
```

Read-only, no signer needed.

## `wrapX402Payment`

A thin, x402-flavored alias over `createPayment` — same shape, named for where it fits in an x402 payment flow. See [x402 Integration](x402-integration.md).

## The `signTransaction` callback

Every write function takes a `signTransaction: (xdr: string) => Promise<string>` callback rather than a private key — this is what decouples the SDK from any specific signer. In a browser, that is typically Freighter:

```ts
signTransaction: async (xdr) => {
  const { signedTxXdr } = await freighter.signTransaction(xdr, {
    networkPassphrase: config.networkPassphrase,
  });
  return signedTxXdr;
}
```

Server-side or in a script, it can just as easily be a raw `Keypair`:

```ts
import { Keypair, TransactionBuilder, Networks } from "@stellar/stellar-sdk";

const kp = Keypair.fromSecret(secret);
signTransaction: async (xdr) => {
  const tx = TransactionBuilder.fromXDR(xdr, Networks.TESTNET);
  tx.sign(kp);
  return tx.toXDR();
}
```

This is exactly the pattern [`scripts/e2e-testnet.cjs`](https://github.com/Michealshodipo56/trestly-contract/blob/main/scripts/e2e-testnet.cjs) in trestly-contract uses to prove the full lifecycle end-to-end without a browser at all.

## A note on ScVal types

If you are extending the SDK (rather than just calling it), the one sharp edge worth knowing about: Soroban type-checks invocation arguments against the contract's actual interface spec, not just against TypeScript's type system. `payment_id` is a `u32` in the contract — encoding it as `nativeToScVal(id, { type: "u64" })` compiles fine in TypeScript but fails at the RPC layer with a type-mismatch error. `buildRaiseDisputeParams`, `buildReleaseParams`, `buildResolveDisputeParams`, and `buildGetPaymentParams` all correctly use `u32`.
