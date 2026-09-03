// Temporary local SDK implementation - replace with trestly-sdk package once published
// This provides the same API surface as the real trestly-sdk

import {
  TrestlyConfig,
  CreatePaymentParams,
  CreatePaymentResult,
  Payment,
  RaiseDisputeParams,
  ReleaseParams,
  ResolveDisputeParams,
  TransactionResult,
} from './types';

export * from './types';

// Mock implementation for development
// TODO: Replace with actual trestly-sdk from npm once published

export async function createPayment(
  config: TrestlyConfig,
  params: CreatePaymentParams
): Promise<CreatePaymentResult> {
  // This would call the actual Soroban contract via stellar-sdk
  console.log('Creating payment with config:', config, 'params:', params);
  
  // Simulate transaction signing and submission
  const mockXdr = 'AAAAAgAAAAA...'; // Contract invocation XDR
  const signedXdr = await params.signTransaction(mockXdr, {
    networkPassphrase: config.networkPassphrase,
  });
  
  // Mock response
  return {
    paymentId: `payment_${Date.now()}`,
    txHash: `hash_${Date.now()}`,
  };
}

export async function getPayment(
  config: TrestlyConfig,
  paymentId: string
): Promise<Payment> {
  // This would query the contract state
  console.log('Getting payment:', paymentId);
  
  // Mock response
  return {
    id: paymentId,
    payer: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    payee: 'GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
    token: 'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    amount: BigInt(100_0000000), // 100 USDC (7 decimals)
    arbiter: 'GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
    disputeWindowEnd: BigInt(Date.now() / 1000 + 86400), // 24h from now
    status: 'Pending',
    disputed: false,
  };
}

export async function raiseDispute(
  config: TrestlyConfig,
  params: RaiseDisputeParams
): Promise<TransactionResult> {
  console.log('Raising dispute for payment:', params.paymentId);
  
  const mockXdr = 'AAAAAgAAAAA...';
  await params.signTransaction(mockXdr, {
    networkPassphrase: config.networkPassphrase,
  });
  
  return {
    txHash: `dispute_${Date.now()}`,
  };
}

export async function release(
  config: TrestlyConfig,
  params: ReleaseParams
): Promise<TransactionResult> {
  console.log('Releasing payment:', params.paymentId);
  
  const mockXdr = 'AAAAAgAAAAA...';
  await params.signTransaction(mockXdr, {
    networkPassphrase: config.networkPassphrase,
  });
  
  return {
    txHash: `release_${Date.now()}`,
  };
}

export async function resolveDispute(
  config: TrestlyConfig,
  params: ResolveDisputeParams
): Promise<TransactionResult> {
  console.log('Resolving dispute for payment:', params.paymentId, 'to', params.releaseToPayee ? 'payee' : 'payer');
  
  const mockXdr = 'AAAAAgAAAAA...';
  await params.signTransaction(mockXdr, {
    networkPassphrase: config.networkPassphrase,
  });
  
  return {
    txHash: `resolve_${Date.now()}`,
  };
}
