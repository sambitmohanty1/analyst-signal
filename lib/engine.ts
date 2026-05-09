import { StockSignal } from './types';

export const calculateScore = (s: Omit<StockSignal, 'score'>): StockSignal => {
  const total = Object.values(s.breakdown).reduce((a, b) => a + b, 0);
  return { ...s, score: total };
};
