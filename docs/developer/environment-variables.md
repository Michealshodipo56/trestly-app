# Environment Variables

Create a `.env.local` file in `trestly-app` (`cp .env.example .env.local`). All `NEXT_PUBLIC_` variables are exposed to the browser; never put secrets in them.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_CONTRACT_ID` | Yes | The deployed Trestly Soroban contract address | `CBL4JVIPQBSTGUUVQRZXHDCGCVDPN3N4MHJKKY4MZSM2ZBILIIUJR6WD` |
| `NEXT_PUBLIC_RPC_URL` | Yes | Soroban RPC endpoint | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_NETWORK_PASSPHRASE` | Yes | Stellar network passphrase | `Test SDF Network ; September 2015` |
| `NEXT_PUBLIC_USDC_CONTRACT_ID` | No | Example USDC SAC address (not used by app code; convenience for copy-paste) | `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA` |

There are no server-side secrets. The app is fully client-side — wallet connection and transaction signing happen in the browser via Freighter.

## Hosted deployments

If you deploy `trestly-app` to Vercel or another host, set these same variables in the host's environment settings. `.env.local` is gitignored and never gets pushed — forgetting to set env vars on the host is a common cause of "contract not configured" errors in production.

## About `NEXT_PUBLIC_USDC_CONTRACT_ID`

There is no single canonical "testnet USDC" contract to hardcode — SAC addresses depend on which issuer minted the asset. The value in `.env.example` is a reference address only. **Do not reuse an address from an old doc without verifying it on-chain first** — an invalid or stale address causes transactions to revert with unrelated-looking errors.

The app does not read this variable today — you paste the token address manually in the create-payment form. It is included in `.env.example` as a convenience for developers.
