# Security

This has **not** had a third-party security audit and is currently
**testnet-only**. Nothing here should be read as a claim that it's safe to
hold real value.

## Arbiter trust model

This is the one place Trestly isn't purely trustless. Each payment names an
`arbiter` (chosen by the payer at `create_payment` time) who has sole
authority to decide a disputed payment's outcome — refund the payer, or
release to the payee. There is no on-chain appeals process, no multi-party
arbitration, and no slashing or reputation mechanism for a bad-faith
arbiter.

In practice this means: **the arbiter you pick is exactly as trustworthy as
you believe them to be, and the contract cannot protect you from a
malicious or careless one.** For a real deployment, that likely means using
a known, reputable arbiter service (or a multisig / DAO-governed address)
rather than an arbitrary EOA — but the contract itself is agnostic to how
`arbiter` is chosen; that decision sits entirely with whoever integrates
Trestly.

Nothing stops a payer from naming themselves as arbiter. That's a
legitimate choice for a payer who only wants the auto-release safety net
and doesn't need independent dispute resolution — but it means disputes on
that payment are decided unilaterally by the payer, not neutrally.

## What the contract does enforce

- Only the original `payer` can raise a dispute, and only within the
  dispute window (`payer.require_auth()`).
- Only the named `arbiter` can resolve a dispute (`arbiter.require_auth()`).
- `release` is public (no auth) but only succeeds for undisputed payments
  after the window closes — see [Contract Reference](contract-reference.md).
- The release profile has `overflow-checks = true` — an arithmetic overflow
  (e.g. an absurdly large `dispute_window_secs` pushing `dispute_window_end`
  past `u64::MAX`) aborts the transaction instead of silently wrapping.

## What's not implemented (yet)

- **No pause / emergency-stop.** If a bug were found post-deployment, there's
  no admin switch to halt the contract while it's fixed.
- **No upgrade path.** Fixing a bug means deploying a new contract instance
  and migrating, not upgrading in place.
- **Single-token per payment; no partial release.** A payment resolves
  entirely to one side or the other — no split settlements.
- **No rate limiting or per-account payment caps.**

Several of these are tracked as open issues — check the issue tracker
before assuming any of them are unaddressed by design versus just not
built yet.

## Wallet-connection considerations

If you're integrating Freighter (or another Stellar wallet) yourself:
`getAddress()` silently resolves with an **empty address and no error**
when the extension isn't installed, isn't unlocked, or hasn't granted this
site permission yet — it does not throw. Code that checks only `if (error)`
before trusting the returned address will treat that as a successful
connection. Use `requestAccess()` to actually prompt the user for
permission on first connect (`getAddress()` only returns a key if
permission was already granted), and validate the returned address is
non-empty before treating a connection as successful. This was a real bug
in `trestly-app` — see `lib/wallet-context.tsx` and its git history.

## Reporting a vulnerability

Open a GitHub issue on the relevant repo describing the issue. Please do
not attempt to exploit anything against the live testnet deployment beyond
what's needed to demonstrate the issue.
