'use client';

import { useState } from 'react';
import { useWallet } from '../lib/wallet-context';

export default function ConnectButton() {
  const { address, isConnected, connect, disconnect } = useWallet();
  const [connecting, setConnecting] = useState(false);

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
      return;
    }

    setConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
      alert(error instanceof Error ? error.message : 'Failed to connect wallet. Please make sure Freighter is installed and try again.');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {isConnected ? `Disconnect (${address?.slice(0, 8)}...${address?.slice(-4)})` : connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
