'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAddress, requestAccess, signTransaction, isConnected } from '@stellar/freighter-api';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// freighter-api's calls never resolve if the extension isn't installed —
// there's no built-in timeout, so a missing extension would otherwise hang forever.
function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const checkConnection = async () => {
    try {
      const { isConnected: walletConnected } = await withTimeout(
        isConnected(),
        5000,
        'Timed out waiting for Freighter'
      );
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

  useEffect(() => {
    // Check if wallet is already connected on mount. Standard effect-driven
    // sync with an external system (the browser extension); checkConnection
    // sets state before its first await, which the newer React Compiler
    // purity rule flags even for this documented effect pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkConnection();
  }, []);

  const connect = async () => {
    try {
      // getAddress() only returns a key if this site already has permission —
      // it never prompts. requestAccess() is the call that actually pops open
      // Freighter's "connect this site" dialog, which is what a fresh Connect
      // Wallet click needs to trigger.
      const { address: walletAddress, error } = await withTimeout(
        requestAccess(),
        10000,
        'Freighter did not respond. Please make sure the extension is installed and unlocked.'
      );
      if (error) {
        throw new Error(error.message || 'Failed to connect wallet');
      }
      // freighter-api resolves with an empty address (no error) if the user
      // declines the connection request — treat that as failure too.
      if (!walletAddress) {
        throw new Error('No wallet address returned. Please make sure Freighter is installed and unlocked, and approve the connection request.');
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
