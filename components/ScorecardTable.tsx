"use client";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge, ProgressBar, Text, Flex } from "@tremor/react";
import { StockSignal } from "@/lib/types";

export default function ScorecardTable({ stocks }: { stocks: StockSignal[] }) {
  const getStatusColor = (score: number) => score >= 43 ? "emerald" : score >= 38 ? "blue" : "amber";

  return (
    <Table className="mt-4">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Ticker</TableHeaderCell>
          <TableHeaderCell>Weighted Score</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Analyst Catalyst</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stocks.map((item) => (
          <TableRow key={item.ticker}>
            <TableCell className="font-mono font-bold">{item.ticker}</TableCell>
            <TableCell>
              <Flex>
                <Text>{item.score}/50</Text>
                <Text className="text-xs text-slate-400">{((item.score/50)*100).toFixed(0)}%</Text>
              </Flex>
              <ProgressBar value={(item.score/50)*100} color={getStatusColor(item.score)} className="mt-2" />
            </TableCell>
            <TableCell><Badge color={getStatusColor(item.score)}>{item.recommendation}</Badge></TableCell>
            <TableCell className="italic text-sm truncate max-w-xs">{item.signal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
