import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFDBFE" />
              <stop offset="50%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BFDBFE" />
            </linearGradient>
          </defs>
          
          {/* Top bar */}
          <path 
            d="M 10 15 C 10 10 15 8 20 8 L 80 8 C 85 8 90 10 90 15 C 90 20 88 22 85 24 L 55 24 L 55 95 L 45 95 L 45 24 L 15 24 C 12 22 10 20 10 15 Z" 
            fill="url(#g1)"
          />
          
          {/* Highlight */}
          <ellipse cx="50" cy="12" rx="35" ry="6" fill="url(#g3)" opacity="0.6" />
          
          {/* Left shield */}
          <path d="M 15 30 Q 10 35 10 45 Q 10 60 15 70 Q 20 80 30 85 L 30 75 Q 25 70 22 60 Q 20 50 20 45 Q 20 38 25 32 L 15 30 Z" fill="url(#g2)" />
          <path d="M 25 32 Q 30 35 32 42 Q 34 50 32 58 Q 30 65 25 70 L 30 75 Q 38 68 40 58 Q 42 48 40 40 Q 38 32 32 28 L 25 32 Z" fill="url(#g1)" />
          
          {/* Right shield */}
          <path d="M 85 30 Q 90 35 90 45 Q 90 60 85 70 Q 80 80 70 85 L 70 75 Q 75 70 78 60 Q 80 50 80 45 Q 80 38 75 32 L 85 30 Z" fill="url(#g2)" />
          <path d="M 75 32 Q 70 35 68 42 Q 66 50 68 58 Q 70 65 75 70 L 70 75 Q 62 68 60 58 Q 58 48 60 40 Q 62 32 68 28 L 75 32 Z" fill="url(#g1)" />
          
          {/* Center stem */}
          <rect x="45" y="24" width="10" height="71" rx="2" fill="url(#g1)" />
          <rect x="46" y="24" width="4" height="71" rx="1" fill="url(#g3)" opacity="0.4" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
