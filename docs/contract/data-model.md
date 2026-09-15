# Data Model

## EscrowedPayment

The on-chain record for each payment:

```rust
pub struct EscrowedPayment {
    pub payer: Address,
    pub payee: Address,
    pub token: Address,
    pub amount: i128,
    pub dispute_window_end: u64,
    pub disputed: bool,
    pub resolved: bool,
    pub arbiter: Address,
}
```

| Field | Type | Description |
|---|---|---|
| `payer` | `Address` | Who funded the escrow; only they can raise a dispute |
| `payee` | `Address` | Who receives funds on release or favorable resolution |
| `token` | `Address` | SAC address of the escrowed token |
| `amount` | `i128` | Escrowed amount in token stroops |
| `dispute_window_end` | `u64` | Ledger timestamp after which disputes are no longer allowed |
| `disputed` | `bool` | Set to `true` when payer calls `raise_dispute` |
| `resolved` | `bool` | Set to `true` after `release` or `resolve_dispute` |
| `arbiter` | `Address` | Who can resolve disputes |

## Storage keys

```rust
pub enum DataKey {
    PaymentCount,
    Payment(u32),
}
```

- `PaymentCount` — instance storage; tracks the highest assigned payment ID.
- `Payment(u32)` — persistent storage per payment, with TTL extended on each write (50,000 ledgers).

Payment IDs are `u32`, start at 1, and increment monotonically. They are not reused.

## ContractError

```rust
pub enum ContractError {
    PaymentNotFound = 1,
    AlreadyResolved = 2,
    AlreadyDisputed = 3,
    DisputeWindowClosed = 4,
    DisputeWindowOpen = 5,
    Unauthorized = 6,
    InvalidAmount = 7,
}
```

## Events

Published via the `#[contractevent]` macro, each indexed by `payment_id` as a topic:

| Event | Topic | Fields |
|---|---|---|
| `PaymentCreated` | `"created"` | `payment_id`, `payer`, `payee`, `amount` |
| `DisputeRaised` | `"disputed"` | `payment_id` |
| `Released` | `"released"` | `payment_id`, `payee`, `amount` |
| `DisputeResolved` | `"resolved"` | `payment_id`, `refund_to_payer` |

There is no indexer in v1 — events are available on-chain for future tooling but are not consumed by the reference app.
