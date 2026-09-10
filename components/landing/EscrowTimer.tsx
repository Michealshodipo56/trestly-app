'use client';

import { useEffect, useState } from 'react';

const WINDOW_SECONDS = 8 * 60 + 42;

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}

export function EscrowTimer() {
  const [remaining, setRemaining] = useState(WINDOW_SECONDS);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((prev) => (prev <= 0 ? WINDOW_SECONDS : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-600">
      <svg
        className="h-3.5 w-3.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="tabular-nums">{formatTime(remaining)} remaining</span>
    </div>
  );
}
