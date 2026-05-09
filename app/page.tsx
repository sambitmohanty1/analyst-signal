// app/page.tsx
import { kv } from '@vercel/kv';
// Removed unused 'Metric' import to prevent ESLint build errors
import { Title, Text, Grid, Card } from "@tremor/react";
import ScorecardTable from "@/components/ScorecardTable";
import { StockSignal } from "@/lib/types";

export const dynamic = 'force-dynamic'; 
export const preferredRegion = 'syd1';

export default async function Dashboard() {
  const data = await kv.get<{ us: StockSignal[], asx: StockSignal[], updatedAt: string }>('latest_signals');

  if (!data) {
    return <div className="p-10 text-slate-500">Initializing Engine... Run Cron to see data.</div>;
  }

  // Force strict timezone formatting to prevent Next.js hydration errors
  const formattedDate = new Date(data.updatedAt).toLocaleString('en-AU', {
    timeZone: 'Australia/Sydney',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Title className="text-3xl font-bold text-slate-900">Analyst Signal Pro</Title>
        <Text className="text-slate-500">Last Refresh: {formattedDate}</Text>

        <Grid numItemsLg={1} className="gap-8 mt-8">
          <Card decoration="top" decorationColor="blue">
            <Text className="font-bold uppercase tracking-widest text-slate-500 mb-4">
              US Market High-Conviction
            </Text>
            <ScorecardTable stocks={data.us} />
          </Card>

          <Card decoration="top" decorationColor="orange">
            <Text className="font-bold uppercase tracking-widest text-slate-500 mb-4">
              ASX Market High-Conviction
            </Text>
            <ScorecardTable stocks={data.asx} />
          </Card>
        </Grid>
      </div>
    </main>
  );
}
