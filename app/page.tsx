'use client';

import { ConnectButton } from '@/components/ConnectButton';
import { useWallet } from '@/lib/wallet-context';
import Link from 'next/link';

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trestly</h1>
          <ConnectButton />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <h2 className="text-5xl font-bold mb-6">
            Secure Escrow Payments on Stellar
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Create escrowed payments with dispute resolution built in. Connect your wallet to get started.
          </p>

          {connected ? (
            <div className="flex gap-4 justify-center">
              <Link
                href="/payment/create"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors"
              >
                Create Payment
              </Link>
            </div>
          ) : (
            <div className="text-gray-500">
              Connect your Freighter wallet to continue
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          Built for Stellar
        </div>
      </footer>
    </div>
  );
}
