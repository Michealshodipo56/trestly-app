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
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>

          {/* Hourglass mark */}
          <path
            d="M46 38 L154 38 C154 38 154 70 100 94 C46 70 46 38 46 38 Z"
            fill="url(#g)"
          />
          <path
            d="M46 162 L154 162 C154 162 154 130 100 106 C46 130 46 162 46 162 Z"
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
