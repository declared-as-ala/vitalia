import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VIAITALIA - Study & University Applications in Italy',
  description: 'Production platform for higher education applications, university deadline tracking, dossier management, and visa guidance in Italy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
