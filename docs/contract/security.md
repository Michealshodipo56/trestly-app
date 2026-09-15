# Security Considerations

This has **not** had a third-party security audit and is currently **testnet-only**. Nothing here should be read as a claim that it is safe to hold real value.

## Arbiter trust model

See [Arbiter Trust Model](../concepts/arbiter-trust-model.md) for the full discussion. In short: the arbiter you pick is exactly as trustworthy as you believe them to be, and the contract cannot protect you from a malicious or careless one.

## What the contract does enforce

- Only the original `payer` can raise a dispute, and only within the dispute window (`payer.require_auth()`).
- Only the named `arbiter` can resolve a dispute (`arbiter.require_auth()`).
- `release` is public (no auth) but only succeeds for undisputed payments after the window closes — see [Contract Functions](functions.md).
- The release profile has `overflow-checks = true` — an arithmetic overflow (e.g. an absurdly large `dispute_window_secs` pushing `dispute_window_end` past `u64::MAX`) aborts the transaction instead of silently wrapping.

## What's not implemented (yet)

- **No pause / emergency-stop.** If a bug were found post-deployment, there is no admin switch to halt the contract while it is fixed.
- **No upgrade path.** Fixing a bug means deploying a new contract instance and migrating, not upgrading in place.
- **Single-token per payment; no partial release.** A payment resolves entirely to one side or the other — no split settlements.
- **No rate limiting or per-account payment caps.**

Several of these are tracked as open issues — check the issue tracker before assuming any of them are unaddressed by design versus just not built yet.

## Wallet-connection considerations

If you are integrating Freighter (or another Stellar wallet) yourself: `getAddress()` silently resolves with an **empty address and no error** when the extension is not installed, is not unlocked, or has not granted this site permission yet — it does not throw. Code that checks only `if (error)` before trusting the returned address will treat that as a successful connection. Use `requestAccess()` to actually prompt the user for permission on first connect, and validate the returned address is non-empty before treating a connection as successful.

## Reporting a vulnerability

Open a GitHub issue on the relevant repo describing the issue. Please do not attempt to exploit anything against the live testnet deployment beyond what is needed to demonstrate the issue.
