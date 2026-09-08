'use client';

import { useState } from 'react';
import { useWallet } from '../lib/wallet-context';
import { createPayment } from 'trestly-sdk';
import { trestlyConfig } from '../lib/trestly-config';

export default function CreatePaymentForm() {
  const { address, isConnected, signTransaction } = useWallet();
  const [payee, setPayee] = useState('');
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [disputeWindowSecs, setDisputeWindowSecs] = useState('86400'); // 24 hours
  const [arbiter, setArbiter] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ paymentId: number; txHash: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const paymentResult = await createPayment(trestlyConfig, {
        payer: address,
        payee,
        token,
        amount: BigInt(amount),
        disputeWindowSecs: parseInt(disputeWindowSecs),
        arbiter,
        signTransaction,
      });

      setResult(paymentResult);
      // Reset form
      setPayee('');
      setToken('');
      setAmount('');
      setDisputeWindowSecs('86400');
      setArbiter('');
    } catch (error) {
      console.error('Failed to create payment:', error);
      alert(`Failed to create payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Escrowed Payment</h2>
      
      {result && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800">Payment created successfully!</p>
          <p className="text-sm text-green-600">Payment ID: {result.paymentId}</p>
          <p className="text-sm text-green-600 break-all">Transaction: {result.txHash}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payee Address</label>
          <input
            type="text"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            required
            placeholder="GXXXXXX..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Token Address</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            placeholder="CXXXXXX..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount (stroops)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            placeholder="1000000"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Dispute Window (seconds)</label>
          <input
            type="number"
            value={disputeWindowSecs}
            onChange={(e) => setDisputeWindowSecs(e.target.value)}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Default: 86400 (24 hours)</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Arbiter Address</label>
          <input
            type="text"
            value={arbiter}
            onChange={(e) => setArbiter(e.target.value)}
            required
            placeholder="GXXXXXX..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!isConnected || loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Payment'}
        </button>
      </form>
    </div>
  );
}
