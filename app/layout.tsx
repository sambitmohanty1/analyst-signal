// app/layout.tsx
import './globals.css'; // Make sure this points to your Tailwind CSS file
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analyst Signal Pro',
  description: 'Weekly Weighted Analyst Scorecard',
};

// You can also enforce the Sydney region globally here
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
