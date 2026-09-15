# Arbiter Trust Model

This is the one place Trestly is not purely trustless. Each payment names an `arbiter` (chosen by the payer at `create_payment` time) who has sole authority to decide a disputed payment's outcome — refund the payer, or release to the payee.

## What the arbiter can do

When a payment is disputed, only the named arbiter can call `resolve_dispute`. They choose:

- `refund_to_payer = true` — funds return to the payer.
- `refund_to_payer = false` — funds release to the payee.

There is no on-chain appeals process, no multi-party arbitration, and no slashing or reputation mechanism for a bad-faith arbiter.

## What the arbiter cannot do

- They cannot resolve an undisputed payment — `resolve_dispute` requires `disputed = true`.
- They cannot resolve before a dispute is raised (even if the window is still open).
- They cannot split funds — resolution is all-or-nothing.
- They cannot release or dispute on their own — those are separate functions with separate auth rules.

## Self-arbitration

Nothing stops a payer from naming themselves as arbiter. That is a legitimate choice for a payer who only wants the auto-release safety net and does not need independent dispute resolution — but it means disputes on that payment are decided unilaterally by the payer, not neutrally.

For production integrations, a known reputable arbiter service (or a multisig / DAO-governed address) is likely more appropriate than an arbitrary EOA. The contract is agnostic to how `arbiter` is chosen; that decision sits entirely with whoever integrates Trestly.

## What the contract does enforce

- Only the original `payer` can raise a dispute, and only within the dispute window.
- Only the named `arbiter` can resolve a dispute.
- `release` is public (no auth) but only succeeds for undisputed payments after the window closes.

For the full security discussion including audit status and known limitations, see [Security Considerations](../contract/security.md).
