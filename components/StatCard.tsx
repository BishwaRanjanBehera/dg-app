interface StatCardProps {
  label: string;
  value: number | string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-10 py-7 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-5xl font-bold tabular-nums text-gray-900">
        {value}
      </span>
      <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
    </div>
  );
}
