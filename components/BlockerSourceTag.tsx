import { BlockerSource } from "@/lib/types";

// Distinct colors per source, per Day 5 Blueprint step. "Unspecified"
// (edge case from transform.ts) gets its own neutral style rather than
// being lumped in with a real source.
const SOURCE_STYLES: Record<string, string> = {
  Business: "bg-purple-50 text-purple-700 border-purple-200",
  Engineering: "bg-orange-50 text-orange-700 border-orange-200",
  Vendor: "bg-teal-50 text-teal-700 border-teal-200",
  Unspecified: "bg-gray-50 text-gray-600 border-gray-200",
};

interface BlockerSourceTagProps {
  source: BlockerSource;
}

export default function BlockerSourceTag({ source }: BlockerSourceTagProps) {
  // Not blocked -> blockerSource is null -> render nothing.
  if (!source) return null;

  const style = SOURCE_STYLES[source] ?? SOURCE_STYLES.Unspecified;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium ${style}`}
      aria-label={`Blocker source: ${source}`}
    >
      <span aria-hidden="true">🏷</span> {source}
    </span>
  );
}
