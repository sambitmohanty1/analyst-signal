import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import { calculateScore } from '@/lib/engine';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // 1. Security Check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Data Aggregation (Mocked for review - replace with API fetches)
  const usData = [
    calculateScore({
      ticker: "META", market: "US", recommendation: "Strong Buy",
      signal: "AI monetization leader; Ad revenue growth",
      breakdown: { authority: 10, moat: 9, sentiment: 9, technical: 8, catalyst: 10 }
    }),
    // ... add other 9 US stocks
  ];

  const asxData = [
    calculateScore({
      ticker: "IFT.AX", market: "ASX", recommendation: "Strong Buy",
      signal: "Largest 30-year Renewable Contract in AU",
      breakdown: { authority: 8, moat: 9, sentiment: 9, technical: 8, catalyst: 10 }
    }),
    // ... add other 9 ASX stocks
  ];

  // 3. Persist to Vercel KV
  const payload = { updatedAt: new Date().toISOString(), us: usData, asx: asxData };
  await kv.set('latest_signals', payload);

  // 4. Send Email Report
  await resend.emails.send({
    from: 'Watchdog <signals@yourdomain.com>',
    to: 'mail2sambit@gmail.com',
    subject: 'Weekly Weighted Signal Report',
    html: `<h2>Top Signal: ${usData[0].ticker} (Score: ${usData[0].score})</h2>`
  });

  return NextResponse.json({ success: true });
}
