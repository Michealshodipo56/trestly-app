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
                <SorobanMark />
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
                href="https://github.com/Michealshodipo56/trestly-sdk#readme"
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
          <div className="flex items-center gap-2">
            <TrestlyLogo className="h-6 w-6" />
            <span className="text-sm font-semibold text-slate-800">Trestly</span>
          </div>
          <p className="text-sm text-slate-500">
            Escrow for x402 payments on Stellar
          </p>
        </div>
      </footer>
    </div>
  );
}

function StellarMark() {
  return (
    <svg className="h-5 w-5 text-[#000000]" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000" />
      <path
        d="M6.5 14.2l10.2-3.4M7.2 16.5l9.4-3.1M8.1 9.2l9.8-3.3"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SorobanMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0A0A0A" />
      <path
        d="M7 8h10M7 12h10M7 16h10"
        stroke="#7DD3FC"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="9" cy="8" r="1.2" fill="#38BDF8" />
      <circle cx="15" cy="12" r="1.2" fill="#38BDF8" />
      <circle cx="11" cy="16" r="1.2" fill="#38BDF8" />
    </svg>
  );
}
