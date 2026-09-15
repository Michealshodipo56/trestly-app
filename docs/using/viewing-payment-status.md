# Viewing Payment Status

The Trestly app does not maintain a payment list or history. You look up payments individually by ID.

## Steps

1. Connect your Freighter wallet on the `/app` page.
2. Enter the **Payment ID** in the lookup field (the number returned when you created the payment).
3. The status card loads the on-chain record via `get_payment` and shows:
   - Payer, payee, and arbiter addresses
   - Token and amount
   - Whether the dispute window is open or closed
   - Whether the payment is disputed or resolved
   - Available actions based on your connected address and the payment state

## Available actions

The app shows buttons only when the connected wallet can perform the action:

| Action | Who | When |
|---|---|---|
| Raise Dispute | Payer | Window open, not disputed, not resolved |
| Release to Payee | Anyone | Window closed, not disputed, not resolved |
| Refund to Payer | Arbiter | Disputed, not resolved |
| Release to Payee | Arbiter | Disputed, not resolved |

If no buttons appear, either the payment is already resolved or your connected address does not match the role required for the next step.

## Refreshing

Click **Refresh** on the status card to re-fetch the on-chain state. This is useful after submitting a transaction or while waiting for the dispute window to close.

There is no push notification or automatic polling — the app reads state when you load or refresh.
