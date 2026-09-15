# Contract Functions

Source: [`trestly-contract`](https://github.com/Trestly-team/trestly-contract) — `contracts/trestly/src/lib.rs`

## `create_payment`

```rust
pub fn create_payment(
    env: Env,
    payer: Address,
    payee: Address,
    token: Address,
    amount: i128,
    dispute_window_secs: u64,
    arbiter: Address,
) -> Result<u32, ContractError>
```

Transfers `amount` of `token` from `payer` to the contract and creates a new escrowed payment. Returns the new `payment_id` (a `u32`, starting at 1).

- **Auth:** requires `payer`'s signature.
- **Errors:** `InvalidAmount` if `amount <= 0`.

## `raise_dispute`

```rust
pub fn raise_dispute(env: Env, payment_id: u32) -> Result<(), ContractError>
```

Marks the payment as disputed. Only the original payer can do this, and only while the dispute window is still open.

- **Auth:** requires the payment's `payer` signature (checked internally — the contract does not take `payer` as a parameter here).
- **Errors:** `PaymentNotFound`, `AlreadyResolved`, `DisputeWindowClosed`, `AlreadyDisputed`.

## `release`

```rust
pub fn release(env: Env, payment_id: u32) -> Result<(), ContractError>
```

Sends the escrowed funds to the payee. Callable by **anyone** — no auth required — but only once the dispute window has closed and only if the payment was never disputed.

- **Auth:** none.
- **Errors:** `PaymentNotFound`, `AlreadyResolved`, `DisputeWindowOpen`, `AlreadyDisputed` (a disputed payment must go through `resolve_dispute` instead).

## `resolve_dispute`

```rust
pub fn resolve_dispute(
    env: Env,
    payment_id: u32,
    refund_to_payer: bool,
) -> Result<(), ContractError>
```

Settles a disputed payment. The arbiter decides: `refund_to_payer = true` sends funds back to the payer, `false` releases them to the payee.

- **Auth:** requires the payment's `arbiter` signature (checked internally — not taken as a parameter here).
- **Errors:** `PaymentNotFound`, `AlreadyResolved`, `DisputeWindowOpen` (reused as the "not disputed" error — the payment must be disputed first).

## `get_payment`

```rust
pub fn get_payment(env: Env, payment_id: u32) -> Result<EscrowedPayment, ContractError>
```

Read-only. Returns the full payment record, or `PaymentNotFound`.

## A note on `payment_id`'s type

`payment_id` is a `u32` everywhere in this contract, not `u64`. If you are calling the contract directly (rather than through `trestly-sdk`, which already gets this right), encoding it as the wrong Soroban integer width will fail at the RPC layer — see the note in [SDK Reference](../developer/sdk-reference.md#a-note-on-scval-types).
