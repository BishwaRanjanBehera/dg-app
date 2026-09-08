interface StatCardProps {
  label: string;
  value: number | string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-6 shadow-sm">
      <span className="text-4xl font-bold text-gray-900">{value}</span>
      <span className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-500">
        {label}
      </span>
    </div>
  );
}
