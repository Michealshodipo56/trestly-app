'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAddress, signTransaction, isConnected } from '@stellar/freighter-api';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected on mount
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { isConnected: walletConnected } = await isConnected();
      if (walletConnected) {
        const { address: walletAddress, error } = await getAddress();
        if (!error && walletAddress) {
          setAddress(walletAddress);
          setConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connect = async () => {
    try {
      const { address: walletAddress, error } = await getAddress();
      if (error) {
        throw new Error(error.message || 'Failed to connect wallet');
      }
      setAddress(walletAddress);
      setConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setConnected(false);
  };

  const sign = async (xdr: string, opts?: { networkPassphrase?: string }): Promise<string> => {
    if (!connected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const { signedTxXdr, error } = await signTransaction(xdr, {
        networkPassphrase: opts?.networkPassphrase || 'Test SDF Network ; September 2015',
        address: address || undefined,
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to sign transaction');
      }
      
      return signedTxXdr;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: connected,
        connect,
        disconnect,
        signTransaction: sign,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
