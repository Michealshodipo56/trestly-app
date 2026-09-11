export function TrestlyLogo({
  className = 'h-8 w-8',
  showText = false,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <svg
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Trestly Logo"
      >
        <defs>
          <linearGradient id="trestlyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* Hourglass mark: time-gated escrow that releases, or comes back */}
        <path
          d="M46 38 L154 38 C154 38 154 70 100 94 C46 70 46 38 46 38 Z"
          fill="url(#trestlyGradient)"
        />
        <path
          d="M46 162 L154 162 C154 162 154 130 100 106 C46 130 46 162 46 162 Z"
          fill="url(#trestlyGradient)"
        />
      </svg>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Trestly
        </span>
      )}
    </div>
  );
}
