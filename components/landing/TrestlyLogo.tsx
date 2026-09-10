export function TrestlyLogo({
  className = 'h-8 w-8',
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#2563EB" />
      <path
        d="M7.5 9.5c0-.83.67-1.5 1.5-1.5h8.2c2.54 0 4.6 2.06 4.6 4.6v1.15h-5.35c-1.77 0-3.2 1.43-3.2 3.2V23.5H9c-.83 0-1.5-.67-1.5-1.5V9.5z"
        fill="white"
      />
      <path
        d="M14.2 15.2H23c.99 0 1.8.81 1.8 1.8V22c0 1.55-1.25 2.8-2.8 2.8h-5.1c-.99 0-1.8-.81-1.8-1.8v-5.1c0-1.49 1.21-2.7 2.7-2.7z"
        fill="#BFDBFE"
      />
      <path
        d="M16.4 17.6h5.6v5.6h-2.55v-3.05H16.4V17.6z"
        fill="#2563EB"
      />
    </svg>
  );
}
