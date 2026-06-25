import { Activity } from "lucide-react";

const palettes = [
  ["from-sky-100", "to-blue-200"],
  ["from-blue-100", "to-indigo-200"],
  ["from-cyan-100", "to-sky-200"],
  ["from-indigo-100", "to-blue-200"],
  ["from-sky-50", "to-blue-100"],
];

export function ProductImage({
  name,
  imageUrl,
  className = "",
  seed = 0,
}: {
  name: string;
  imageUrl?: string;
  className?: string;
  seed?: number;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  const [a, b] = palettes[seed % palettes.length];
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${a} ${b} p-6 text-center ${className}`}
    >
      <Activity className="mb-3 size-10 text-primary" strokeWidth={1.5} />
      <span className="font-display text-sm font-semibold text-primary leading-tight">
        {name}
      </span>
    </div>
  );
}
