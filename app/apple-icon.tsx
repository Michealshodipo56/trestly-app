import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

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
          background: 'white',
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
              <stop offset="0%" stopColor="#3B9EF6" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B9EF6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          
          <path 
            d="M 10 15 C 10 10 12 8 17 8 L 83 8 C 88 8 90 10 90 15 L 90 25 C 90 28 88 30 85 30 L 55 30 C 53 30 52 31 52 33 L 52 42 L 48 42 L 48 33 C 48 31 47 30 45 30 L 15 30 C 12 30 10 28 10 25 L 10 15 Z"
            fill="url(#g2)"
          />
          <path 
            d="M 10 35 C 10 33 11 32 13 32 L 42 32 C 44 32 45 33 45 35 L 45 87 C 45 89 44 90 42 90 L 13 90 C 11 90 10 89 10 87 L 10 35 Z"
            fill="url(#g1)"
          />
          <path 
            d="M 55 35 C 55 33 56 32 58 32 L 87 32 C 89 32 90 33 90 35 L 90 87 C 90 89 89 90 87 90 L 58 90 C 56 90 55 89 55 87 L 55 35 Z"
            fill="url(#g1)"
          />
          <path 
            d="M 50 40 L 52 46 L 58 46 L 53 50 L 55 56 L 50 52 L 45 56 L 47 50 L 42 46 L 48 46 Z"
            fill="#2563EB"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
