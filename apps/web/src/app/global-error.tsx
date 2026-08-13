'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-extrabold text-amber-400 font-outfit">Something went wrong!</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-2.5 bg-brand-800 hover:bg-brand-900 text-white rounded-xl font-bold text-xs transition-all shadow-lg"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
