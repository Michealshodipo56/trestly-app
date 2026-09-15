# Connecting Your Wallet

Trestly uses the [Freighter](https://www.freighter.app/) browser extension to sign Stellar transactions. The app never sees your private keys.

## Prerequisites

1. Install Freighter and set it to **Testnet** in the extension settings.
2. Fund your testnet account with free XLM via [Friendbot](https://friendbot.stellar.org?addr=YOUR_ADDRESS) (replace `YOUR_ADDRESS` with your Freighter public key).
3. Hold the token you plan to escrow — the contract pulls tokens from your wallet at payment creation.

## Steps

1. Open [trestly.vercel.app/app](https://trestly.vercel.app/app) (or your local instance at `http://localhost:3000/app`).
2. Click **Connect Wallet**.
3. Freighter prompts you to approve the connection — this is expected the first time.
4. Once connected, your public address appears in the header.

## Demo without a local setup

The fastest way to try Trestly: use the live testnet deployment at [trestly.vercel.app](https://trestly.vercel.app). No local install required — just Freighter on testnet and some testnet XLM.

Unlike some Stellar apps, Trestly does not have a demo mode without a wallet. A connected Freighter wallet is required to create or manage payments.

## A note for integrators

Freighter's `getAddress()` returns an empty address without throwing when the extension is not installed, is locked, or has not granted site permission. Always use `requestAccess()` for the initial connect prompt, and verify the returned address is non-empty before treating the connection as successful. See [Security Considerations](../contract/security.md#wallet-connection-considerations).
