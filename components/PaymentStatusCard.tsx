'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '../lib/wallet-context';
import { getPayment, raiseDispute, release, resolveDispute } from 'trestly-sdk';
import { trestlyConfig } from '../lib/trestly-config';
import type { EscrowedPayment } from 'trestly-sdk';

interface PaymentStatusCardProps {
  paymentId: number;
}

export default function PaymentStatusCard({ paymentId }: PaymentStatusCardProps) {
  const { address, isConnected, signTransaction } = useWallet();
  const [payment, setPayment] = useState<EscrowedPayment | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const paymentData = await getPayment(trestlyConfig, paymentId);
      setPayment(paymentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayment();
  }, [paymentId]);

  const handleRaiseDispute = async () => {
    if (!isConnected || !address || !payment) return;
    
    setActionLoading(true);
    try {
      await raiseDispute(trestlyConfig, {
        paymentId,
        payer: address,
        signTransaction,
      });
      alert('Dispute raised successfully!');
      await loadPayment();
    } catch (err) {
      alert(`Failed to raise dispute: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRelease = async () => {
    if (!isConnected || !address) return;
    
    setActionLoading(true);
    try {
      await release(trestlyConfig, paymentId, address, signTransaction);
      alert('Payment released successfully!');
      await loadPayment();
    } catch (err) {
      alert(`Failed to release payment: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolve = async (refundToPayer: boolean) => {
    if (!isConnected || !address || !payment) return;
    
    setActionLoading(true);
    try {
      await resolveDispute(trestlyConfig, {
        paymentId,
        arbiter: address,
        refundToPayer,
        signTransaction,
      });
      alert(`Dispute resolved - ${refundToPayer ? 'refunded to payer' : 'released to payee'}!`);
      await loadPayment();
    } catch (err) {
      alert(`Failed to resolve dispute: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow">Loading payment...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={loadPayment}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!payment) {
    return <div className="p-6 bg-white rounded-lg shadow">Payment not found</div>;
  }

  const now = BigInt(Math.floor(Date.now() / 1000));
  const windowClosed = now >= payment.disputeWindowEnd;
  const canRaiseDispute = !payment.resolved && !payment.disputed && !windowClosed && address === payment.payer;
  const canRelease = !payment.resolved && !payment.disputed && windowClosed;
  const canResolve = payment.disputed && !payment.resolved && address === payment.arbiter;

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-4">
      <h3 className="text-xl font-bold">Payment #{paymentId}</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Payer:</span>
          <p className="break-all text-gray-600">{payment.payer}</p>
        </div>
        <div>
          <span className="font-medium">Payee:</span>
          <p className="break-all text-gray-600">{payment.payee}</p>
        </div>
        <div>
          <span className="font-medium">Amount:</span>
          <p className="text-gray-600">{payment.amount.toString()} stroops</p>
        </div>
        <div>
          <span className="font-medium">Arbiter:</span>
          <p className="break-all text-gray-600">{payment.arbiter}</p>
        </div>
      </div>

      <div className="flex gap-2 text-sm">
        <span className={`px-2 py-1 rounded ${payment.disputed ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {payment.disputed ? 'Disputed' : 'Undisputed'}
        </span>
        <span className={`px-2 py-1 rounded ${payment.resolved ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
          {payment.resolved ? 'Resolved' : 'Pending'}
        </span>
        <span className={`px-2 py-1 rounded ${windowClosed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {windowClosed ? 'Window Closed' : 'Window Open'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t">
        {canRaiseDispute && (
          <button
            onClick={handleRaiseDispute}
            disabled={actionLoading}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
          >
            Raise Dispute
          </button>
        )}

        {canRelease && (
          <button
            onClick={handleRelease}
            disabled={actionLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Release to Payee
          </button>
        )}

        {canResolve && (
          <>
            <button
              onClick={() => handleResolve(true)}
              disabled={actionLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
            >
              Refund to Payer
            </button>
            <button
              onClick={() => handleResolve(false)}
              disabled={actionLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              Release to Payee
            </button>
          </>
        )}

        <button
          onClick={loadPayment}
          disabled={actionLoading}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
