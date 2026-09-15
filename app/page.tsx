import Link from 'next/link';
import { CodeBlock } from '../components/landing/CodeBlock';
import { HeroDiagram } from '../components/landing/HeroDiagram';
import { SiteHeader } from '../components/landing/SiteHeader';
import { TrestlyLogo } from '../components/landing/TrestlyLogo';

const FEATURES = [
  {
    title: 'Instant Payments',
    description: 'Keep the speed of x402 with the added protection of escrow.',
    iconBg: 'bg-blue-50 text-blue-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z" strokeLinejoin="round" />
        <path d="M12 9v4M12 16.5v.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Dispute-Aware',
    description: 'Funds can return to the buyer if something goes wrong.',
    iconBg: 'bg-emerald-50 text-emerald-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z" strokeLinejoin="round" />
        <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Stellar-Native',
    description: 'Built on Stellar and powered by Soroban smart contracts.',
    iconBg: 'bg-violet-50 text-violet-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Developer Friendly',
    description: 'Simple integration. Powerful APIs. Full transparency.',
    iconBg: 'bg-slate-100 text-slate-700',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M8 8l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

const STEPS = [
  {
    title: 'Payment Initiated',
    description: 'The agent sends an x402 payment for a service.',
  },
  {
    title: 'Funds Held in Escrow',
    description: 'Trestly locks the payment in a Soroban smart contract.',
  },
  {
    title: 'Service Window',
    description: 'The service is delivered while the dispute window remains open.',
  },
  {
    title: 'Funds Released or Returned',
    description:
      'Payment releases to the seller — or returns to the buyer if a dispute is raised in time.',
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.06),_transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Escrow for x402 payments
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Payments that can{' '}
              <span className="text-blue-600">come back.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Trestly adds a dispute-aware escrow layer to x402 payments on
              Stellar. Agents pay. Services deliver. Funds settle only when the
              window closes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Launch Trestly
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#protocol"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Read the protocol
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <StellarMark />
                <span>Built on Stellar</span>
              </div>
              <div className="flex items-center gap-2">
                <StellarMark />
                <span>Powered by Soroban</span>
              </div>
            </div>
          </div>

          <HeroDiagram />
        </div>
      </section>

      {/* Why Trestly */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A smarter way to pay for AI services.
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg lg:text-right">
              Standard x402 payments are final the moment they settle. Trestly
              adds a safety net — escrow with a dispute window — so agents and
              services can transact with confidence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works / Protocol */}
      <section id="protocol" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            How it works
          </p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for real-world AI payments.
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <ol className="space-y-8">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <CodeBlock />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0B1B3A] px-6 py-14 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
              Ready to build?
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Integrate Trestly today.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Get started with our developer docs and start using refund-enabled
              x402 payments on Stellar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Get started
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://github.com/Trestly-team/trestly-sdk#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                View documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <TrestlyLogo className="h-6 w-6" showText={true} />
          <p className="text-sm text-slate-500">
            Escrow for x402 payments on Stellar
          </p>
        </div>
      </footer>
    </div>
  );
}

// Official Stellar mark. Soroban (Stellar's smart contracts platform) has no
// separate logo of its own — it's branded "Stellar Smart Contracts" and uses
// the same mark, so both badges below use this same icon.
function StellarMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#FDDA24" role="img" aria-label="Stellar">
      <path d="M12.003 1.716c-1.37 0-2.7.27-3.948.78A10.18 10.18 0 0 0 2.66 7.901a10.136 10.136 0 0 0-.797 3.954c0 .258.01.516.027.775a1.942 1.942 0 0 1-1.055 1.88L0 14.934v1.902l2.463-1.26.072-.032v.005l.77-.39.758-.385.066-.039 14.807-7.56 1.666-.847 3.392-1.732V2.694L17.792 5.86 3.744 13.025l-.104.055-.017-.115a8.286 8.286 0 0 1-.071-1.105c0-2.255.88-4.377 2.474-5.977a8.462 8.462 0 0 1 2.71-1.82 8.513 8.513 0 0 1 3.2-.654h.067a8.41 8.41 0 0 1 4.09 1.055l1.628-.83.126-.066a10.11 10.11 0 0 0-5.845-1.853zM24 7.143 5.047 16.808l-1.666.847L0 19.382v1.902l3.282-1.671 2.91-1.485 14.058-7.153.105-.055.016.115c.05.369.072.743.072 1.11 0 2.255-.88 4.383-2.475 5.978a8.461 8.461 0 0 1-2.71 1.82 8.305 8.305 0 0 1-3.2.654h-.06c-1.441 0-2.86-.369-4.102-1.061l-.066.033-1.683.857c.594.418 1.232.776 1.903 1.062a10.11 10.11 0 0 0 3.947.797 10.09 10.09 0 0 0 7.17-2.975 10.136 10.136 0 0 0 2.969-7.18c0-.259-.005-.523-.027-.781a1.942 1.942 0 0 1 1.055-1.88L24 9.044z" />
    </svg>
  );
}
