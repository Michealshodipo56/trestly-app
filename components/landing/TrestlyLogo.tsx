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
          {/* Main gradient - light to medium blue */}
          <linearGradient id="trestlyMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFDBFE" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          
          {/* Dark gradient for depth */}
          <linearGradient id="trestlyDarkGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          
          {/* Light gradient for highlights */}
          <linearGradient id="trestlyLightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
        </defs>
        
        {/* Top horizontal bar with rounded edges */}
        <path 
          d="M 10 15 C 10 10 15 8 20 8 L 80 8 C 85 8 90 10 90 15 C 90 20 88 22 85 24 L 55 24 L 55 95 L 45 95 L 45 24 L 15 24 C 12 22 10 20 10 15 Z" 
          fill="url(#trestlyMainGradient)"
        />
        
        {/* Top bar highlight/light effect */}
        <ellipse 
          cx="50" 
          cy="12" 
          rx="35" 
          ry="6" 
          fill="url(#trestlyLightGradient)"
          opacity="0.6"
        />
        
        {/* Left curved shield with flowing design */}
        <path 
          d="M 15 30 Q 10 35 10 45 Q 10 60 15 70 Q 20 80 30 85 L 30 75 Q 25 70 22 60 Q 20 50 20 45 Q 20 38 25 32 L 15 30 Z" 
          fill="url(#trestlyDarkGradient)"
        />
        
        {/* Left shield inner curve - flowing element */}
        <path 
          d="M 25 32 Q 30 35 32 42 Q 34 50 32 58 Q 30 65 25 70 L 30 75 Q 38 68 40 58 Q 42 48 40 40 Q 38 32 32 28 L 25 32 Z" 
          fill="url(#trestlyMainGradient)"
        />
        
        {/* Right curved shield with flowing design */}
        <path 
          d="M 85 30 Q 90 35 90 45 Q 90 60 85 70 Q 80 80 70 85 L 70 75 Q 75 70 78 60 Q 80 50 80 45 Q 80 38 75 32 L 85 30 Z" 
          fill="url(#trestlyDarkGradient)"
        />
        
        {/* Right shield inner curve - flowing element */}
        <path 
          d="M 75 32 Q 70 35 68 42 Q 66 50 68 58 Q 70 65 75 70 L 70 75 Q 62 68 60 58 Q 58 48 60 40 Q 62 32 68 28 L 75 32 Z" 
          fill="url(#trestlyMainGradient)"
        />
        
        {/* Center stem with gradient */}
        <rect 
          x="45" 
          y="24" 
          width="10" 
          height="71" 
          rx="2"
          fill="url(#trestlyMainGradient)"
        />
        
        {/* Center stem highlight */}
        <rect 
          x="46" 
          y="24" 
          width="4" 
          height="71" 
          rx="1"
          fill="url(#trestlyLightGradient)"
          opacity="0.4"
        />
      </svg>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          Trestly
        </span>
      )}
    </div>
  );
}
