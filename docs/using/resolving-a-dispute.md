# Resolving a Dispute

When a payer raises a dispute, only the named arbiter can settle the payment.

## When resolution is available

- The payment must be **disputed** (`disputed = true`).
- The payment must **not already be resolved**.
- You must be the **arbiter** address named at payment creation.

The dispute window being open or closed does not block resolution — once disputed, only the arbiter can settle.

## Steps

1. Connect the Freighter wallet for the arbiter address.
2. Look up the disputed payment by ID.
3. Choose one of:
   - **Refund to Payer** — calls `resolve_dispute(payment_id, refund_to_payer=true)`. Funds return to the payer.
   - **Release to Payee** — calls `resolve_dispute(payment_id, refund_to_payer=false)`. Funds go to the payee.
4. Sign the transaction. The payment is marked resolved and funds leave the contract.

## Arbiter responsibility

The contract does not inspect evidence, messages, or off-chain proof. The arbiter's decision is final and on-chain. For production use, define off-chain dispute procedures (evidence submission, SLA, etc.) in your integration layer — the contract only enforces who can call `resolve_dispute` and where funds go.

See [Arbiter Trust Model](../concepts/arbiter-trust-model.md) for the trust implications.
