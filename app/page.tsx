// app/page.tsx
import { kv } from '@vercel/kv';
import { Title, Text, Grid, Card, Metric } from "@tremor/react";
import ScorecardTable from "@/components/ScorecardTable";
import { StockSignal } from "@/lib/types";

export const dynamic = 'force-dynamic'; // Ensures we always fetch latest KV
export const preferredRegion = 'syd1';

export default async function Dashboard() {
  const data = await kv.get<{ us: StockSignal[], asx: StockSignal[], updatedAt: string }>('latest_signals');

  if (!data) return <div className="p-10">Initializing Engine... Run Cron to see data.</div>;

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Title className="text-3xl font-bold">Analyst Signal Pro</Title>
        <Text>Last Refresh: {new Date(data.updatedAt).toLocaleString('en-AU')}</Text>

        <Grid numItemsLg={1} className="gap-8 mt-8">
          <Card decoration="top" decorationColor="blue">
            <Text className="font-bold uppercase tracking-widest text-slate-500">US Market High-Conviction</Text>
            <ScorecardTable stocks={data.us} />
          </Card>

          <Card decoration="top" decorationColor="orange">
            <Text className="font-bold uppercase tracking-widest text-slate-500">ASX Market High-Conviction</Text>
            <ScorecardTable stocks={data.asx} />
          </Card>
        </Grid>
      </div>
    </main>
  );
}
