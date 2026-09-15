# Creating a Payment

Payments are the core unit of Trestly. Each payment is an on-chain escrow commitment with a dispute window and a named arbiter.

## Steps

1. Connect your Freighter wallet (see [Connecting Your Wallet](connecting-your-wallet.md)).
2. On the `/app` page, fill in the **Create Escrowed Payment** form:
   - **Payee Address** — the Stellar address that will receive funds on release.
   - **Token Address** — the SAC (Stellar Asset Contract) address of the token being escrowed.
   - **Amount** — the token amount in stroops (smallest unit). For USDC with 7 decimals, 12.50 USDC is `125000000`.
   - **Dispute Window (seconds)** — how long the payer has to raise a dispute. Defaults to `86400` (24 hours).
   - **Arbiter Address** — who resolves disputes if one is raised.
3. Click **Create Payment**. Freighter prompts you to sign a transaction invoking `create_payment` on the contract.
4. The transaction submits to Soroban Testnet. On success, the form shows the new **Payment ID** and transaction hash — save the payment ID to look up the payment later.

## Choosing an arbiter

The arbiter is trusted to decide disputed payments. Common choices:

- A third-party dispute service address (for real integrations).
- Your own address (self-arbitration — you decide any disputes unilaterally).
- A multisig or DAO address (not enforced by the contract, but a deployment pattern).

See [Arbiter Trust Model](../concepts/arbiter-trust-model.md) before picking one for anything beyond a testnet experiment.

## Token approval

`create_payment` transfers tokens from your wallet to the contract in the same transaction. Your wallet must hold sufficient balance of the specified token. There is no separate approval step — Soroban SAC transfers are authorized by the payer's signature on the transaction.
