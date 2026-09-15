# Escrowed Payments

An escrowed payment is the central object in Trestly. It represents a token transfer from a payer to a payee, held by the contract until either the dispute window closes without a dispute, or an arbiter resolves a raised dispute.

## Payment Fields

| Field | Type | Description |
|---|---|---|
| `payer` | `Address` | The Stellar address that created the payment and is the only address permitted to raise a dispute |
| `payee` | `Address` | The address that receives funds on release or on a dispute resolved in their favor |
| `token` | `Address` | The SAC (Stellar Asset Contract) address of the escrowed token |
| `amount` | `i128` | The token amount held in escrow, in the token's smallest unit (stroops) |
| `dispute_window_end` | `u64` | A ledger timestamp; disputes can only be raised before this time |
| `disputed` | `bool` | Whether the payer has called `raise_dispute` |
| `resolved` | `bool` | Whether the payment has been settled (via `release` or `resolve_dispute`) |
| `arbiter` | `Address` | The address with sole authority to resolve disputed payments |

Payments are stored in contract instance storage, keyed by a `u32` payment ID that increments with each new payment created (starting at 1).

## Roles

Every payment involves three parties:

- **Payer** — funds the escrow and can dispute during the window.
- **Payee** — receives funds after a public `release` call or on a favorable dispute resolution.
- **Arbiter** — resolves disputes by choosing refund-to-payer or release-to-payee. Chosen by the payer at creation time.

The payer and payee can be the same person in theory (paying yourself), but the typical x402 flow is buyer → seller with a third-party or self-nominated arbiter.

## Token amounts

Amounts are specified in the token's smallest unit. For USDC on Soroban (7 decimals), 12.50 USDC is `125000000` stroops. The UI and SDK expect raw stroops — there is no automatic decimal conversion.
