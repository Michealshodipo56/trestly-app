'use client';

import { useWallet } from '@/lib/wallet-context';

export function ConnectButton() {
  const { connected, publicKey, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please make sure Freighter is installed.');
    }
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
    >
      Connect Freighter
    </button>
  );
}
