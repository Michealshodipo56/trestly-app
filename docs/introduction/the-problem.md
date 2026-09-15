# The Problem

The [x402 protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402) lets clients pay for HTTP resources on a per-request basis — a natural fit for AI agents that call APIs, fetch data, or trigger services without a human in the loop. On Stellar, x402 payments settle immediately: tokens move from buyer to seller in a single transaction.

That instant settlement is efficient when everything works. It is a problem when it does not.

## Instant settlement has no refund path

If an API returns an error, delivers incomplete data, or never responds at all, the buyer has already paid. There is no built-in escrow, no dispute window, and no on-chain mechanism to claw funds back. For human users this is annoying; for autonomous agents making hundreds of requests, it is a real financial risk.

Traditional payment rails solve this with chargebacks, escrow services, or platform-level dispute resolution — all off-chain, all requiring trust in a central party. On-chain x402 on Stellar has none of that today.

## No Stellar-native escrow for x402

The closest existing solution is [x402r](https://github.com/x402r), which adds dispute-aware escrow to x402 payments — but it targets EVM chains only. Stellar and Soroban have no equivalent: no standard escrow wrapper, no dispute window pattern, no refund path for agent-to-service payments.

## What Trestly adds

Trestly sits between the payer and payee:

1. **Funds are held in a Soroban contract** at payment creation, not sent directly to the seller.
2. **A configurable dispute window** gives the payer time to raise a dispute if the service under-delivers.
3. **Public release** lets anyone send an undisputed payment to the payee after the window closes. A caller must submit this transaction; the contract does not execute on its own at expiry.
4. **Arbiter resolution** routes disputed funds back to the payer or forward to the payee, decided by a named arbiter address.

The contract enforces all of this — not an API server, not a database, not a terms-of-service page.
