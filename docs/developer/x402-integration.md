# x402 Integration

Trestly is designed to wrap x402 payments with escrow. The SDK exposes `wrapX402Payment` as a named entry point for that flow — functionally identical to `createPayment`, but documented for x402 integrators.

## The x402 gap Trestly fills

Standard x402 on Stellar settles immediately: the buyer pays, the seller receives, done. If the HTTP resource fails or under-delivers, there is no on-chain refund path. Trestly inserts an escrow step:

```
x402 payment request
       |
       v
wrapX402Payment (escrow created, funds held)
       |
       +-- service delivers → wait for window → release to seller
       |
       +-- service fails → raise_dispute → arbiter refunds buyer
```

See [The Problem](../introduction/the-problem.md) for the full motivation.

## Basic usage

```ts
import { wrapX402Payment } from "trestly-sdk";

const result = await wrapX402Payment(config, {
  payer: buyerAddress,
  payee: sellerAddress,
  token: usdcAddress,
  amount: 125000000n,        // 12.50 USDC (7 decimals)
  disputeWindowSecs: 10 * 60, // 10 minutes — tune for your API latency SLA
  arbiter: arbiterAddress,
  signTransaction: async (xdr) => await freighter.signTransaction(xdr),
});

console.log("Payment ID:", result.paymentId);
console.log("Tx hash:", result.txHash);
```

## Integration considerations

**Dispute window length** — For synchronous API calls, a short window (minutes) may suffice: the buyer knows immediately if the response was bad. For async or human-reviewed services, use a longer window.

**Arbiter selection** — For agent-to-API flows, the arbiter might be the API platform operator, a third-party dispute service, or the buyer themselves (self-arbitration). See [Arbiter Trust Model](../concepts/arbiter-trust-model.md).

**Release timing** — After a successful delivery, someone must call `release` once the window closes. Your integration may want to auto-submit release on behalf of the seller, or rely on the seller to do it.

**Amount encoding** — Amounts are in token stroops. USDC on Soroban uses 7 decimals.

## Comparison to x402r

[x402r](https://github.com/x402r) provides similar dispute-aware escrow for x402 on EVM chains. Trestly is the Stellar/Soroban equivalent — same conceptual model, different chain and contract implementation.
