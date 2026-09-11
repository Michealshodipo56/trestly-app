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
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Trestly Logo"
      >
        <defs>
          <linearGradient id="trestlyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        
        {/* Top horizontal bar (T top) */}
        <path 
          d="M 18 18 L 18 28 L 82 28 L 82 18 C 82 18 77 23 72 23 L 28 23 C 23 23 18 18 18 18 Z" 
          fill="url(#trestlyGradient)"
        />
        
        {/* Vertical stem (T stem) */}
        <rect 
          x="45" 
          y="28" 
          width="10" 
          height="54" 
          rx="1"
          fill="url(#trestlyGradient)"
        />
        
        {/* Left shield panel */}
        <path 
          d="M 18 33 L 18 70 C 18 72 22 78 32 82 L 42 42 L 18 33 Z" 
          fill="url(#trestlyGradient)"
        />
        
        {/* Right shield panel */}
        <path 
          d="M 82 33 L 58 42 L 68 82 C 78 78 82 72 82 70 L 82 33 Z" 
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
