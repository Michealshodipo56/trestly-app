# The Dispute Window

The dispute window is the time period after payment creation during which the payer can raise a dispute. It is the core mechanism that gives x402 payments a refund path without requiring instant trust in the seller.

## How it is set

At `create_payment`, the payer specifies `dispute_window_secs` — a duration in seconds. The contract computes:

```
dispute_window_end = current_ledger_timestamp + dispute_window_secs
```

This timestamp is stored on-chain and never changes. There is no way to extend or shorten the window after creation.

## What happens during the window

- The payer can call `raise_dispute(payment_id)`.
- Nobody can call `release` — the contract returns `DisputeWindowOpen`.
- Nobody can call `resolve_dispute` — a payment must be disputed first.

## What happens after the window

- The payer can no longer dispute — `raise_dispute` returns `DisputeWindowClosed`.
- If the payment was never disputed, anyone can call `release` and funds go to the payee.
- If the payment was disputed during the window, only `resolve_dispute` can settle it — the window closing does not auto-resolve disputes.

## Soroban has no internal timer

Like all Soroban contracts, Trestly only executes when someone submits a transaction. Auto-release does not happen spontaneously at `dispute_window_end` — someone (the payee, the payer, a keeper script, or the frontend) must call `release` after the window closes. Until that transaction lands, funds remain in the contract even though the window has passed.

The Trestly app shows whether the window is open or closed and enables the release button when appropriate, but it does not automatically submit a release transaction on your behalf.

## Choosing a window length

Shorter windows mean faster settlement for honest transactions but less time for the payer to notice a bad delivery. Longer windows give more protection but delay payee access to funds.

The reference app defaults to 86400 seconds (24 hours). For agent-to-API payments where delivery is synchronous, much shorter windows (minutes) may be appropriate — that is an integration decision, not something the contract enforces.
