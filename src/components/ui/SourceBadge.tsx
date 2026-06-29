import type { BookingSource } from "@/types";

interface SourceBadgeProps {
  source: BookingSource;
}

const sourceColors: Partial<Record<BookingSource, string>> = {
  "Website": "bg-blue-100 text-blue-800",
  "Phone Call": "bg-emerald-100 text-emerald-800",
  "Email": "bg-indigo-100 text-indigo-800",
  "Walk-in": "bg-amber-100 text-amber-800",
  "Referral": "bg-pink-100 text-pink-800",
  "Social Media": "bg-purple-100 text-purple-800",
  "Other": "bg-gray-100 text-gray-800",
};

const fallbackColor = "bg-gray-100 text-gray-800";

export default function SourceBadge({ source }: SourceBadgeProps) {
  const colorClass = sourceColors[source] ?? fallbackColor;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {source}
    </span>
  );
}
