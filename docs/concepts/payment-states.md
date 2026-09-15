# Payment States

A payment moves through a small set of states determined by two booleans (`disputed`, `resolved`) and the current ledger time relative to `dispute_window_end`.

## State diagram

```
                    create_payment
                          |
                          v
                   ┌─────────────┐
                   │   PENDING    │  disputed=false, resolved=false
                   │ (window open)│  window still open
                   └──────┬──────┘
                          |
          ┌───────────────┼───────────────┐
          │               │               │
   raise_dispute    window closes    window closes
   (payer only)     (no dispute)     (no dispute)
          │               │               │
          v               v               v
   ┌─────────────┐  (still PENDING   anyone calls
   │  DISPUTED    │   until window    release()
   │              │   closes)              │
   └──────┬──────┘                        v
          │                        ┌─────────────┐
   resolve_dispute                 │  RELEASED    │
   (arbiter only)                  │ resolved=true│
          │                        └─────────────┘
          v
   ┌─────────────┐
   │  RESOLVED    │
   │ resolved=true│
   └─────────────┘
```

## States in detail

### Pending (active escrow)

- `resolved = false`, `disputed = false`
- Funds sit in the contract.
- If the dispute window is still open: payer may raise a dispute.
- If the window has closed: anyone may call `release`.

### Disputed

- `resolved = false`, `disputed = true`
- Funds remain in the contract.
- `release` will fail — the payment must go through `resolve_dispute`.
- Only the named arbiter can resolve, regardless of whether the window has closed.

### Released / Resolved

- `resolved = true`
- Funds have left the contract — either to the payee (`release` or `resolve_dispute(refund_to_payer=false)`) or back to the payer (`resolve_dispute(refund_to_payer=true)`).
- No further actions are possible. A second `release` or `resolve_dispute` returns `AlreadyResolved`.

## What the UI shows

The Trestly app derives action buttons from the same rules: raise dispute (payer + window open + undisputed), release (window closed + undisputed), resolve (arbiter + disputed). See [Viewing Payment Status](../using/viewing-payment-status.md).
