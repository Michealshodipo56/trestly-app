import type { ReactNode } from 'react';
import { EscrowTimer } from './EscrowTimer';
import { TrestlyLogo } from './TrestlyLogo';

export function HeroDiagram() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-0">
        <FlowCard
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <rect x="5" y="4" width="14" height="12" rx="3" />
                <circle cx="9" cy="9" r="1.2" fill="currentColor" />
                <circle cx="15" cy="9" r="1.2" fill="currentColor" />
                <path d="M9 13h6" strokeLinecap="round" />
                <path d="M8 18h8" strokeLinecap="round" />
              </svg>
            </div>
          }
          title="AI AGENT"
          description="Sends x402 payment for a service"
        />

        <Arrow />

        <div className="relative z-10 flex-1 rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-500/10 ring-1 ring-blue-50">
          <div className="flex flex-col items-center text-center">
            <TrestlyLogo className="mb-2 h-10 w-10" />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Trestly Escrow
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">12.50 USDC</p>
            <p className="text-xs text-slate-500">Held in escrow</p>
            <EscrowTimer />
          </div>
        </div>

        <Arrow />

        <FlowCard
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M8 7l-4 5 4 5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 4l-4 16" strokeLinecap="round" />
              </svg>
            </div>
          }
          title="API / SERVICE"
          description="Delivers the requested service"
        />
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
        <div className="hidden sm:block absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 -translate-y-full border-l border-dashed border-slate-300" />
        <OutcomeCard
          tone="success"
          title="SERVICE COMPLETES"
          description="Release to seller"
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <OutcomeCard
          tone="warning"
          title="DISPUTE RAISED"
          description="Return to buyer"
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3.5L21 20H3L12 3.5zm0 5.5v5h0v-5zm0 7a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center py-1 sm:px-2 sm:py-8" aria-hidden="true">
      <svg className="h-4 w-4 rotate-90 text-slate-300 sm:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FlowCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {icon}
        <p className="mt-2.5 text-xs font-semibold uppercase tracking-wide text-slate-800">
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function OutcomeCard({
  tone,
  title,
  description,
  icon,
}: {
  tone: 'success' | 'warning';
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const styles =
    tone === 'success'
      ? {
          wrap: 'border-emerald-100 bg-emerald-50/70',
          icon: 'bg-emerald-100 text-emerald-600',
          title: 'text-emerald-700',
        }
      : {
          wrap: 'border-amber-100 bg-amber-50/70',
          icon: 'bg-amber-100 text-amber-600',
          title: 'text-amber-700',
        };

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3.5 ${styles.wrap}`}>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
        {icon}
      </div>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wide ${styles.title}`}>
          {title}
        </p>
        <p className="mt-0.5 text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}
