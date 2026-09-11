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
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          
          {/* Top bar */}
          <path 
            d="M 18 18 L 18 28 L 82 28 L 82 18 C 82 18 77 23 72 23 L 28 23 C 23 23 18 18 18 18 Z" 
            fill="url(#g)"
          />
          
          {/* Stem */}
          <rect x="45" y="28" width="10" height="54" rx="1" fill="url(#g)" />
          
          {/* Left shield */}
          <path d="M 18 33 L 18 70 C 18 72 22 78 32 82 L 42 42 L 18 33 Z" fill="url(#g)" />
          
          {/* Right shield */}
          <path d="M 82 33 L 58 42 L 68 82 C 78 78 82 72 82 70 L 82 33 Z" fill="url(#g)" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
