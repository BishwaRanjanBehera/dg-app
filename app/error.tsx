"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to the console/server so it's visible in Vercel's runtime logs
    // even though the user only ever sees the friendly message below.
    console.error("DG encountered an unexpected error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
        ⚠️
      </div>
      <h1 className="text-xl font-semibold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        DG couldn&apos;t load this page right now. This is unexpected — both
        the live Jira connection and the built-in sample-data fallback
        appear to be unavailable at the same time.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
