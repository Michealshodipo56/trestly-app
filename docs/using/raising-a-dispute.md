# Raising a Dispute

A dispute freezes the payment and routes settlement to the named arbiter instead of auto-releasing to the payee.

## When you can dispute

- You must be the **payer** on the payment.
- The **dispute window must still be open** (current ledger time < `dispute_window_end`).
- The payment must **not already be disputed or resolved**.

If the window has closed, `raise_dispute` returns `DisputeWindowClosed` and the only path forward is `release` (if undisputed) or waiting for arbiter resolution (if already disputed).

## Steps

1. Connect the Freighter wallet that created the payment (the payer address).
2. Look up the payment by ID (see [Viewing Payment Status](viewing-payment-status.md)).
3. Click **Raise Dispute**.
4. Freighter prompts you to sign. The contract sets `disputed = true` and emits a `DisputeRaised` event.

## What happens next

Once disputed:

- `release` will no longer work — the payment must be resolved by the arbiter.
- The arbiter sees **Refund to Payer** and **Release to Payee** buttons when they connect their wallet and look up the payment.

There is no way to cancel a dispute. The arbiter must resolve it one way or the other.

## When to dispute

Disputes are for when the payee did not deliver what was agreed — a failed API call, incomplete data, or no response at all in an x402 flow. Disputing a good-faith payment is possible on-chain but burns arbiter trust and is not reversible.
