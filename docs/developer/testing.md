# Testing

## Contract unit tests

Trestly's Soroban contract has a unit test suite written in Rust using `soroban-sdk`'s built-in test utilities. All tests run in a local, in-process Soroban environment — no network connection required.

Run the test suite:

```bash
cd trestly-contract
cargo test
```

### What is covered

| Test scenario | Expected result |
|---|---|
| `create_payment` with valid params | Payment created, returns `payment_id = 1` on first call |
| `create_payment` with `amount = 0` | Returns `InvalidAmount` |
| `get_payment` on nonexistent ID | Returns `PaymentNotFound` |
| `raise_dispute` before window closes | Succeeds, `disputed = true` |
| `raise_dispute` after window closes | Returns `DisputeWindowClosed` |
| `raise_dispute` twice | Returns `AlreadyDisputed` |
| `release` before window closes | Returns `DisputeWindowOpen` |
| `release` after window closes (undisputed) | Succeeds, funds to payee |
| `release` on disputed payment | Returns `AlreadyDisputed` |
| `resolve_dispute` refund to payer | Succeeds, funds to payer |
| `resolve_dispute` release to payee | Succeeds, funds to payee |
| `resolve_dispute` on already resolved payment | Returns `AlreadyResolved` |

12 tests total, covering the full create → dispute → release/resolve lifecycle.

## SDK tests

[`trestly-sdk`](https://github.com/Michealshodipo56/trestly-sdk) has its own Jest suite (`npm test`), covering transaction-building argument encoding (mocked RPC, no network) and response parsing.

## Frontend

`trestly-app` has no automated test suite yet — `npm run lint` and `npm run build` are what CI runs. Wallet/chain-interaction logic is covered by the SDK's tests rather than duplicated in the app.

Manual testing with Freighter against the live testnet contract is required for UI changes that touch wallet-connected flows.

## End-to-end testnet verification

For a full integration test against live Soroban Testnet without a browser:

```bash
cd trestly-contract
node scripts/e2e-testnet.cjs
```

This uses generated keypairs and `trestly-sdk` directly to exercise both the public-release path and the dispute/resolve path against a deployed contract.

For manual browser testing:

1. Deploy or use the shared testnet contract ID.
2. Set `trestly-app/.env.local` (see [Environment Variables](environment-variables.md)).
3. Fund Freighter with testnet XLM via [Friendbot](https://friendbot.stellar.org).
4. Run through create → dispute → release/resolve in the app at `/app`.
