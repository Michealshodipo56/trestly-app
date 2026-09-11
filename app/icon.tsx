import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>

          <rect width="200" height="200" rx="44" fill="url(#bg)" />

          {/* Hourglass mark */}
          <path
            d="M56 46 L144 46 C144 46 144 74 100 96 C56 74 56 46 56 46 Z"
            fill="url(#g)"
          />
          <path
            d="M56 154 L144 154 C144 154 144 126 100 104 C56 126 56 154 56 154 Z"
            fill="url(#g)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
