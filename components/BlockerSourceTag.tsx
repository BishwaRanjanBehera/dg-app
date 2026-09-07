import { BlockerSource } from "@/lib/types";

// Distinct colors per source, per Day 5 Blueprint step. "Unspecified"
// (edge case from transform.ts) gets its own neutral style rather than
// being lumped in with a real source.
const SOURCE_STYLES: Record<string, string> = {
  Business: "bg-purple-100 text-purple-800 border-purple-300",
  Engineering: "bg-orange-100 text-orange-800 border-orange-300",
  Vendor: "bg-teal-100 text-teal-800 border-teal-300",
  Unspecified: "bg-gray-100 text-gray-600 border-gray-300",
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
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium ${style}`}
    >
      🏷 {source}
    </span>
  );
}
