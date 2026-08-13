import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ViaItalia | Italian University Application & Admissions Platform',
  description: 'Official agency platform for study in Italy, pre-enrollment, dossier tracking, and payment receipts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
