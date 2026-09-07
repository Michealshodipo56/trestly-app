'use client';

import { useWallet } from '../lib/wallet-context';

export default function ConnectButton() {
  const { address, isConnected, connect, disconnect } = useWallet();

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
    } else {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect:', error);
        alert('Failed to connect wallet. Please make sure Freighter is installed and try again.');
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      {isConnected ? `Disconnect (${address?.slice(0, 8)}...${address?.slice(-4)})` : 'Connect Wallet'}
    </button>
  );
}
