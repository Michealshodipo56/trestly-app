import { TrestlyMark } from './TrestlyMark';

export function TrestlyLogo({
  className = 'h-8 w-8',
  showText = false,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <TrestlyMark className={className} label="Trestly Logo" />
      {showText && (
        <span className="text-xl font-bold text-slate-900">
          Trestly
        </span>
      )}
    </div>
  );
}
