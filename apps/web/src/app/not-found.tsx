import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold font-outfit text-emerald-400">404</h1>
      <h2 className="text-xl font-bold mt-4">Page Not Found</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-sm">
        The requested page could not be found on ViaItalia.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 bg-brand-800 hover:bg-brand-900 text-white rounded-xl font-bold text-xs shadow-lg transition-all"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
