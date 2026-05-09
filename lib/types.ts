export interface StockSignal {
  ticker: string;
  market: 'US' | 'ASX';
  recommendation: string;
  signal: string;
  score: number;
  breakdown: {
    authority: number; // 10pts
    moat: number;      // 10pts
    sentiment: number; // 10pts
    technical: number; // 10pts
    catalyst: number;  // 10pts
  };
}
