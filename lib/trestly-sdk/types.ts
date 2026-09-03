// Temporary local SDK types - replace with trestly-sdk package once published

export interface TrestlyConfig {
  contractId: string;
  rpcUrl: string;
  networkPassphrase: string;
}

export interface CreatePaymentParams {
  payer: string;
  payee: string;
  token: string;
  amount: bigint;
  disputeWindowSecs: number;
  arbiter: string;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

export interface CreatePaymentResult {
  paymentId: string;
  txHash: string;
}

export interface Payment {
  id: string;
  payer: string;
  payee: string;
  token: string;
  amount: bigint;
  arbiter: string;
  disputeWindowEnd: bigint;
  status: 'Pending' | 'Disputed' | 'Released' | 'Refunded';
  disputed: boolean;
}

export interface RaiseDisputeParams {
  paymentId: string;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

export interface ReleaseParams {
  paymentId: string;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

export interface ResolveDisputeParams {
  paymentId: string;
  releaseToPayee: boolean;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

export interface TransactionResult {
  txHash: string;
}
