import type { TrestlyConfig } from "trestly-sdk";

// Trestly configuration from environment variables
export const trestlyConfig: TrestlyConfig = {
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || '',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org',
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
};
