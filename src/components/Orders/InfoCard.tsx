import { ReactNode } from "react";
import Card from "@/components/ui/Card";

type TRow = [label: string, value: ReactNode];

// Kartu berjudul berisi pasangan label–nilai (jadwal, data pemesan, rincian biaya).
export default function InfoCard({ title, rows, footer }: { title: string; rows: TRow[]; footer?: ReactNode }) {
  return (
    <Card className="flex flex-col gap-3 p-5 lg:p-6">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <dl className="flex flex-col gap-2.5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="flex-none text-ink-soft">{label}</dt>
            <dd className="min-w-0 break-words text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      {footer}
    </Card>
  );
}
