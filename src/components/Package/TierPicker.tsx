"use client";

import { useState } from "react";
import { TTier } from "@/components/Tiers/types";
import { ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { CheckIcon } from "@/components/ui/icons";
import { formatRupiah } from "@/libs/format";
import { priceSummary } from "@/libs/price";
import { cn } from "@/libs/cn";

type Props = {
  slug: string;
  tiers: TTier[];
  initialTierId?: number;
};

// Pilih tier → benefit & ringkasan biaya ikut berganti → tombol Booking membawa tier terpilih.
export default function TierPicker({ slug, tiers, initialTierId }: Props) {
  const [selectedId, setSelectedId] = useState(initialTierId && tiers.some((t) => t.id === initialTierId) ? initialTierId : tiers[0]?.id);

  if (tiers.length === 0) {
    return <EmptyState title="Tier belum tersedia" description="Dapur mitra sedang menyiapkan pilihan tier untuk paket ini." />;
  }

  const tier = tiers.find((t) => t.id === selectedId) ?? tiers[0];
  const { price, tax, total } = priceSummary(tier.price);

  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[13px] font-bold">Pilih tier</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {tiers.map((t) => {
            const checked = t.id === tier.id;
            return (
              <label
                key={t.id}
                className={cn(
                  "flex cursor-pointer flex-col gap-1 rounded-2xl border-[1.5px] p-3.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40",
                  checked ? "border-accent bg-accent-tint" : "border-line bg-card hover:border-accent/60",
                )}
              >
                <input type="radio" name="tier" value={t.id} checked={checked} onChange={() => setSelectedId(t.id)} className="sr-only" />
                <span className={cn("text-[15px] font-bold", checked && "text-accent-deep")}>{t.name}</span>
                <span className="text-xs text-ink-soft">
                  {t.quantity} orang · {t.duration} hari
                </span>
                <span className="text-sm font-extrabold">{formatRupiah(t.price)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {(tier.tagline || tier.benefits.length > 0) && (
        <div className="flex flex-col gap-2.5 rounded-2xl border border-line p-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-bold">Yang kamu dapat di tier {tier.name}</p>
            {tier.tagline && <p className="text-[13px] text-ink-soft">{tier.tagline}</p>}
          </div>
          {tier.benefits.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {tier.benefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start gap-2 text-sm">
                  <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-good" />
                  {benefit.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <dl className="flex flex-col gap-2 rounded-2xl border border-line bg-surface-soft px-[18px] py-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">
            Harga tier ({tier.quantity} orang · {tier.duration} hari)
          </dt>
          <dd className="font-bold">{formatRupiah(price)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Ongkos kirim</dt>
          <dd className="font-bold text-good">Gratis</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">PPN 11%</dt>
          <dd className="font-bold">{formatRupiah(tax)}</dd>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-line pt-2.5">
          <dt className="font-bold">Total</dt>
          <dd className="font-display text-xl font-extrabold">{formatRupiah(total)}</dd>
        </div>
      </dl>

      <ButtonLink href={`/packages/${slug}/booking?tier=${tier.id}`} size="lg" block>
        Booking Sekarang
      </ButtonLink>
      <p className="-mt-2 text-center text-[12.5px] text-ink-faint">Bayar via transfer bank, diverifikasi tim kami maksimal 1x24 jam.</p>
    </div>
  );
}
