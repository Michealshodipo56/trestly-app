# Architecture

## The escrow lifecycle

```
1. Payer calls create_payment(payer, payee, token, amount, dispute_window_secs, arbiter)
   -> tokens move from payer to the contract; a payment_id is returned

2. While the dispute window is open:
   - payer may call raise_dispute(payment_id)
   - nobody else can release or resolve yet

3a. If undisputed once the window closes:
    -> anyone can call release(payment_id), sending funds to the payee

3b. If disputed:
    -> the arbiter calls resolve_dispute(payment_id, refund_to_payer)
    -> funds go to the payer (refund) or the payee (release), arbiter's call
```

All of this state — who paid whom, how much, whether it's disputed, whether
it's resolved — lives in the contract's on-chain storage. There is no
off-chain database; the ledger is the source of truth.

## No backend, no database

This is a fully client-side application. `trestly-app` is a static/
client-rendered Next.js site with **no API routes and no server-side
secrets** — every contract interaction happens directly from the browser:

```
Browser (trestly-app + trestly-sdk)
   |
   |-- signs transactions via the Freighter extension
   |-- talks directly to Stellar's public Soroban RPC endpoint
   v
Soroban RPC (https://soroban-testnet.stellar.org)
   |
   v
Trestly contract (on-chain storage = the database)
```

Hosting `trestly-app` (e.g. on Vercel) just serves the static/client-rendered
site — there's no server logic to run, no database to provision, and no
secrets to manage. The public RPC endpoint is free and requires no API key.
It's rate-limited and not intended for high-volume production traffic; a
paid RPC provider is a future scaling concern, not a current requirement.

## Why three repos instead of one

- **trestly-contract** is Rust/Soroban — a completely different toolchain
  from the other two, with its own release cadence (contract upgrades are a
  much bigger deal than a frontend deploy).
- **trestly-sdk** is meant to be consumed by *anyone* building on Trestly,
  not just this specific frontend — an AI agent framework, a different UI, a
  server-side integration. Keeping it separate from `trestly-app` is what
  makes that possible.
- **trestly-app** is the reference frontend / demo, built on top of the SDK
  like any other consumer would.

One practical consequence of this split: `trestly-app` depends on
`trestly-sdk`, but Vercel (or any host) only clones `trestly-app` itself, so
it never sees the sibling `trestly-sdk` checkout. `trestly-app` vendors a
built copy of the SDK (`vendor/trestly-sdk/`) to work around this until
`trestly-sdk` is published to npm as a normal versioned dependency — see the
note in [trestly-app's CONTRIBUTING.md](https://github.com/Michealshodipo56/trestly-app/blob/main/CONTRIBUTING.md#why-is-the-sdk-vendored).

## Trust model

The **arbiter** is the one piece of this system that isn't purely
trustless — see [Security](security.md#arbiter-trust-model) for the full
discussion. Everything else (the escrow hold, the dispute window, who can
call what) is enforced entirely by the contract.
