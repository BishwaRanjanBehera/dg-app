import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center gap-6 border-b border-gray-200 px-6 py-4">
      <span className="font-bold text-lg">DG</span>
      <Link href="/dependencies" className="text-sm font-medium hover:underline">
        Dependency Map
      </Link>
      <Link href="/rollup" className="text-sm font-medium hover:underline">
        Management Rollup
      </Link>
    </nav>
  );
}