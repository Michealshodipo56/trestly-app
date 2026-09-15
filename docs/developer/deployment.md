# Deployment

## The contract, without `stellar-cli`

`stellar-cli` has a large dependency tree and a memory-hungry build/link step — on constrained machines, `cargo install --locked stellar-cli` can be enough to crash the system outright. You do not need it to deploy Trestly.

[`trestly-contract/scripts/deploy-testnet.cjs`](https://github.com/Trestly-team/trestly-contract/blob/main/scripts/deploy-testnet.cjs) deploys using `@stellar/stellar-sdk` directly over RPC instead:

```bash
cd trestly-contract
cargo build --target wasm32v1-none --release
node scripts/deploy-testnet.cjs
```

This generates a throwaway deployer keypair, funds it via [Friendbot](https://friendbot.stellar.org), uploads the compiled wasm, creates the contract instance, and prints the resulting contract ID — saving deployer details to `scripts/testnet-deployer.json` (gitignored; this is a testnet-only throwaway key, not something to reuse for anything with real value).

To verify a deployment actually works end-to-end (not just that the transactions submitted successfully), run the companion script:

```bash
node scripts/e2e-testnet.cjs
```

This runs the full lifecycle — `create_payment` → wait for the window to close → `release`, and separately `create_payment` → `raise_dispute` → `resolve_dispute` — signing with generated keypairs directly (no Freighter, no browser) via the exact same `trestly-sdk` functions the app uses.

### If you do have `stellar-cli`

```bash
stellar keys generate deployer --network testnet
stellar keys fund deployer --network testnet
cd contracts/trestly
stellar contract deploy \
  --wasm ../../target/wasm32v1-none/release/trestly.wasm \
  --source deployer \
  --network testnet
```

## Wiring the frontend to a deployment

Set these in `trestly-app`'s `.env.local` (or, for a hosted deployment, in your host's environment variable settings — **this is easy to miss**, since `.env.local` is gitignored and never gets pushed):

```bash
NEXT_PUBLIC_CONTRACT_ID=<your deployed contract ID>
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```

See [Environment Variables](environment-variables.md).

For the live Vercel site, those three variables must be configured for the **Production** environment. `NEXT_PUBLIC_USDC_CONTRACT_ID` may also be set as a convenience value, but the current app does not read it: users provide a token contract address in the payment form. If you rely on Vercel Preview deployments for wallet or transaction testing, configure the same three required variables for **Preview** as well; Production-only values are sufficient for `trestly.vercel.app` itself.

## Hosting the frontend

`trestly-app` is a static/client-rendered Next.js app with no server-side logic (see [System Architecture](../introduction/architecture.md)) — any static/Node host works. It is currently deployed on Vercel at [trestly.vercel.app](https://trestly.vercel.app).

One thing to know if you fork this: `trestly-app` depends on `trestly-sdk` via a vendored copy checked into `vendor/trestly-sdk/`. If you change `trestly-sdk`, you need to rebuild it and copy the new `dist/` into `vendor/trestly-sdk/dist/` before your host will pick up the change — a plain `git push` to `trestly-sdk` alone does nothing for the deployed frontend.

## Mainnet

Nothing here has been deployed to mainnet. Doing so means real funds and a real arbiter trust decision — read [Security Considerations](../contract/security.md) first, and treat mainnet deployment as a deliberate decision, not a copy-paste of the testnet steps with `--network mainnet` swapped in.
