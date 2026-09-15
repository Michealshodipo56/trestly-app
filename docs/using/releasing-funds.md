# Releasing Funds

Release is the happy path: an undisputed payment auto-settles to the payee once the dispute window closes.

## When release is available

- The payment must **not be disputed**.
- The payment must **not already be resolved**.
- The **dispute window must have closed** (current ledger time >= `dispute_window_end`).

Anyone can call `release` — no special role required. The payee, payer, a keeper bot, or a random third party can submit the transaction.

## Steps

1. Connect any funded Freighter wallet (your address is used as the transaction submitter, not as an authorized party).
2. Look up the payment by ID.
3. Click **Release to Payee**.
4. Sign the transaction. Funds transfer from the contract to the payee and `resolved` is set to `true`.

## Soroban does not auto-release

The contract does not release funds at the moment the window closes. Someone must submit a `release` transaction. Until that happens, funds remain in the contract even though the window has passed.

If you are the payee waiting for payment, you can call `release` yourself once the window closes — you do not need the payer's cooperation.

## If release fails

Common errors:

- `DisputeWindowOpen` — the window has not closed yet. Wait and try again.
- `AlreadyDisputed` — the payer raised a dispute. The arbiter must call `resolve_dispute` instead.
- `AlreadyResolved` — funds have already been released or resolved.
