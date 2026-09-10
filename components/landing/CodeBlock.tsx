'use client';

import { useState } from 'react';

const CODE = `import { wrapX402Payment } from "trestly-sdk";

const result = await wrapX402Payment(config, {
  payer: buyerAddress,
  payee: sellerAddress,
  token: usdcAddress,
  amount: 125000000n, // 12.50 USDC
  disputeWindowSecs: 10 * 60,
  arbiter: arbiterAddress,
  signTransaction: async (xdr) =>
    await freighter.signTransaction(xdr),
});

console.log("Payment ID:", result.paymentId);
console.log("Tx hash:", result.txHash);`;

export function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0B1220] shadow-xl shadow-slate-900/10">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-sm font-medium text-slate-300">
          Example integration
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <a
            href="https://github.com/Michealshodipo56/trestly-sdk#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            View docs →
          </a>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed sm:p-5 sm:text-sm">
        <code>
          <span className="text-purple-400">import</span>
          <span className="text-slate-300">{' { wrapX402Payment } '}</span>
          <span className="text-purple-400">from</span>
          <span className="text-emerald-400">{' "trestly-sdk"'}</span>
          <span className="text-slate-300">;</span>
          {'\n\n'}
          <span className="text-purple-400">const</span>
          <span className="text-slate-300"> result = </span>
          <span className="text-purple-400">await</span>
          <span className="text-blue-300"> wrapX402Payment</span>
          <span className="text-slate-300">(config, {'{'}</span>
          {'\n'}
          <span className="text-slate-300">{'  payer: buyerAddress,'}</span>
          {'\n'}
          <span className="text-slate-300">{'  payee: sellerAddress,'}</span>
          {'\n'}
          <span className="text-slate-300">{'  token: usdcAddress,'}</span>
          {'\n'}
          <span className="text-slate-300">{'  amount: '}</span>
          <span className="text-amber-300">125000000n</span>
          <span className="text-slate-500">{', // 12.50 USDC'}</span>
          {'\n'}
          <span className="text-slate-300">{'  disputeWindowSecs: '}</span>
          <span className="text-amber-300">10</span>
          <span className="text-slate-300"> * </span>
          <span className="text-amber-300">60</span>
          <span className="text-slate-300">,</span>
          {'\n'}
          <span className="text-slate-300">{'  arbiter: arbiterAddress,'}</span>
          {'\n'}
          <span className="text-slate-300">{'  signTransaction: '}</span>
          <span className="text-purple-400">async</span>
          <span className="text-slate-300"> (xdr) =&gt;</span>
          {'\n'}
          <span className="text-slate-300">{'    '}</span>
          <span className="text-purple-400">await</span>
          <span className="text-slate-300"> freighter.signTransaction(xdr),</span>
          {'\n'}
          <span className="text-slate-300">{'});'}</span>
          {'\n\n'}
          <span className="text-slate-300">console.log(</span>
          <span className="text-emerald-400">&quot;Payment ID:&quot;</span>
          <span className="text-slate-300">, result.paymentId);</span>
          {'\n'}
          <span className="text-slate-300">console.log(</span>
          <span className="text-emerald-400">&quot;Tx hash:&quot;</span>
          <span className="text-slate-300">, result.txHash);</span>
        </code>
      </pre>
    </div>
  );
}
