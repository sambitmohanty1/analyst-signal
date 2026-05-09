import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analyst Signal Pro',
  description: 'Weekly Weighted Analyst Scorecard',
};

// Enforce Sydney region for sovereign cloud compliance
export const preferredRegion = 'syd1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
