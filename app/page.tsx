'use client';

import { useState } from 'react';
import ConnectButton from '../components/ConnectButton';
import CreatePaymentForm from '../components/CreatePaymentForm';
import PaymentStatusCard from '../components/PaymentStatusCard';
import { useWallet } from '../lib/wallet-context';

export default function Home() {
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Trestly</h1>
          <ConnectButton />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Trestly</h2>
            <p className="text-gray-600 mb-6">
              Escrow payments on Stellar with dispute resolution
            </p>
            <p className="text-gray-500">Connect your wallet to get started</p>
          </div>
        ) : (
          <>
            <section>
              <CreatePaymentForm />
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">View Payment Status</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={viewPaymentId}
                  onChange={(e) => setViewPaymentId(e.target.value)}
                  placeholder="Enter payment ID"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleViewPayment}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
