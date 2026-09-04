'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isConnected, getPublicKey, requestAccess, signTransaction as freighterSignTransaction } from '@stellar/freighter-api';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string, opts?: { networkPassphrase?: string }) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    try {
      const connected = await isConnected();
      if (connected) {
        const key = await getPublicKey();
        setPublicKey(key);
        setConnected(true);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }

  async function connect() {
    try {
      const accessObj = await requestAccess();
      if (accessObj.error) {
        throw new Error(accessObj.error);
      }
      const key = await getPublicKey();
      setPublicKey(key);
      setConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  function disconnect() {
    setConnected(false);
    setPublicKey(null);
  }

  async function signTransaction(xdr: string, opts?: { networkPassphrase?: string }): Promise<string> {
    if (!connected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const result = await freighterSignTransaction(xdr, {
        networkPassphrase: opts?.networkPassphrase,
      });
      
      if ('signedXDR' in result) {
        return result.signedXDR;
      }
      
      throw new Error('Failed to sign transaction');
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }

  return (
    <WalletContext.Provider value={{ connected, publicKey, connect, disconnect, signTransaction }}>
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
