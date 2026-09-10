'use client';

import Link from 'next/link';
import { useState } from 'react';
import ConnectButton from '../../components/ConnectButton';
import CreatePaymentForm from '../../components/CreatePaymentForm';
import PaymentStatusCard from '../../components/PaymentStatusCard';
import { useWallet } from '../../lib/wallet-context';
import { TrestlyLogo } from '../../components/landing/TrestlyLogo';

export default function AppPage() {
  const { isConnected } = useWallet();
  const [viewPaymentId, setViewPaymentId] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const handleViewPayment = () => {
    const id = parseInt(viewPaymentId);
    if (!isNaN(id) && id > 0) {
      setShowPayment(true);
    } else {
      alert('Please enter a valid payment ID');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <TrestlyLogo className="h-7 w-7" />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Trestly
              </span>
            </Link>
            <Link
              href="/"
              className="hidden text-sm text-slate-500 transition-colors hover:text-slate-900 sm:inline"
            >
              ← Back to home
            </Link>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        {!isConnected ? (
          <div className="py-16 text-center">
            <h1 className="mb-3 text-3xl font-bold text-slate-900">
              Launch Trestly
            </h1>
            <p className="mb-2 text-slate-600">
              Create escrowed x402 payments with dispute resolution on Stellar.
            </p>
            <p className="text-sm text-slate-500">
              Connect your Freighter wallet to get started.
            </p>
          </div>
        ) : (
          <>
            <section>
              <CreatePaymentForm />
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                View Payment Status
              </h2>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row">
                <input
                  type="number"
                  value={viewPaymentId}
                  onChange={(e) => setViewPaymentId(e.target.value)}
                  placeholder="Enter payment ID"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleViewPayment}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  View
                </button>
              </div>

              {showPayment && viewPaymentId && (
                <PaymentStatusCard paymentId={parseInt(viewPaymentId)} />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
