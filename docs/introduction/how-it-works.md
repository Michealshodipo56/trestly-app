# How It Works

1. **Connect your Freighter wallet** to the Trestly web app on testnet. The wallet signs all transactions; Trestly never holds private keys.

2. **Create an escrowed payment.** Specify the payee, token, amount, dispute window length, and an arbiter address. Calling `create_payment` on the Soroban contract transfers tokens from your wallet into the contract and returns a `payment_id`.

3. **Wait out the dispute window.** While the window is open, the payer can call `raise_dispute` if the service did not deliver. Nobody can release or resolve yet.

4. **Two possible outcomes:**
   - **Undisputed:** once the window closes, anyone can call `release`, which sends funds to the payee. The call is public, but it is still a transaction someone must submit.
   - **Disputed:** the named arbiter calls `resolve_dispute`, choosing to refund the payer or release to the payee.

5. **Track status in the app.** Enter the payment ID on the `/app` page to see current state and take the next available action.

```
create_payment
     |
     v
dispute window open
     |
     +-- payer calls raise_dispute? ──yes──> resolve_dispute (arbiter decides)
     |
     no, window closes
     |
     v
release (anyone) → funds to payee
```

All payment state — who paid whom, how much, whether it is disputed, whether it is resolved — lives in the contract's on-chain storage. There is no off-chain database; the ledger is the source of truth.

For the full technical lifecycle including auth requirements, see [Contract Functions](../contract/functions.md).
