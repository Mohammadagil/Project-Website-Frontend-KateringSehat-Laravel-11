"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import LogoBCA from "@/assets/images/logo-bca.svg";
import LogoMandiri from "@/assets/images/logo-mandiri.svg";
import { createBookingAction, TBookingState } from "@/components/Booking/actions";
import CopyButton from "@/components/Booking/CopyButton";
import ProofInput from "@/components/Booking/ProofInput";
import Button, { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Field, Input, Textarea } from "@/components/ui/Field";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";
import { BANK_ACCOUNTS } from "@/config/payment";
import { addDays, formatDate, formatRupiah, todayInJakarta } from "@/libs/format";
import { priceSummary } from "@/libs/price";
import { validateProof } from "@/libs/proof";
import { cn } from "@/libs/cn";

type Props = {
  // Batas tanggal mulai paling awal (hari ini WIB), dihitung di server supaya sama di server & browser.
  minDate: string;
  user: { name: string; email: string; phone: string };
  pkg: { id: number; slug: string; name: string; image: string | null; category: string; city: string };
  tier: { id: number; name: string; price: number; quantity: number; duration: number };
};

const STEPS = ["Data & Jadwal", "Pengiriman", "Pembayaran"];
// Field mana ada di langkah mana, untuk lompat ke langkah yang berisi kesalahan.
const FIELD_STEP: Record<string, number> = { started_at: 0, address: 1, post_code: 1, notes: 1, proof: 2 };
const BANK_LOGOS = { BCA: LogoBCA, Mandiri: LogoMandiri };

const initialState: TBookingState = {};

export default function BookingForm({ minDate, user, pkg, tier }: Props) {
  const [state, formAction] = useFormState(createBookingAction, initialState);
  const [step, setStep] = useState(0);
  const [startDate, setStartDate] = useState("");
  // null = tampilkan kesalahan dari server; objek = hasil cek terakhir di browser.
  const [clientErrors, setClientErrors] = useState<Record<string, string> | null>(null);
  const [prevState, setPrevState] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Balasan baru dari server → tampilkan kesalahannya dan lompat ke langkah pertama yang bermasalah.
  // Disesuaikan saat render (bukan di useEffect) sesuai anjuran React, jadi tidak ada render ganda.
  if (state !== prevState) {
    setPrevState(state);
    setClientErrors(null);
    const steps = Object.keys(state.errors ?? {})
      .map((field) => FIELD_STEP[field])
      .filter((s) => s !== undefined);
    if (steps.length > 0) setStep(Math.min(...steps));
  }

  // Menggulir layar ke atas form saat server menolak (efek samping ke DOM, tanpa setState).
  useEffect(() => {
    if (state.message) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state]);

  const errors = clientErrors ?? state.errors ?? {};
  const showServerMessage = clientErrors === null && !!state.message;
  const { price, tax, total } = priceSummary(tier.price);

  // Cek isian sampai langkah `upTo` (0, 1, atau 2).
  function validate(upTo: number) {
    const data = new FormData(formRef.current!);
    const found: Record<string, string> = {};
    const date = String(data.get("started_at") ?? "");
    if (!date) found.started_at = "Pilih tanggal mulai.";
    else if (date < todayInJakarta()) found.started_at = "Tanggal mulai tidak boleh sebelum hari ini.";
    if (upTo >= 1) {
      if (!String(data.get("address") ?? "").trim()) found.address = "Alamat wajib diisi.";
      if (!/^\d{5}$/.test(String(data.get("post_code") ?? "").trim())) found.post_code = "Kode pos harus 5 angka.";
      if (!String(data.get("notes") ?? "").trim()) found.notes = "Catatan wajib diisi, misalnya patokan rumah.";
    }
    if (upTo >= 2) {
      const proofError = validateProof(data.get("proof"));
      if (proofError) found.proof = proofError;
    }
    return found;
  }

  function goTo(target: number) {
    setStep(target);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    const found = validate(step);
    setClientErrors(found);
    if (Object.keys(found).length === 0) goTo(step + 1);
  }

  // Cek terakhir sebelum form benar-benar dikirim ke Server Action.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validate(2);
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setStep(Math.min(...Object.keys(found).map((field) => FIELD_STEP[field])));
    }
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
      <input type="hidden" name="slug" value={pkg.slug} />
      <input type="hidden" name="catering_package_id" value={pkg.id} />
      <input type="hidden" name="catering_tier_id" value={tier.id} />

      <div ref={topRef} className="flex scroll-mt-28 flex-col gap-5">
        <ol className="grid grid-cols-3 gap-2.5">
          {STEPS.map((label, i) => (
            <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-1.5">
              <span className={cn("h-1 rounded-full transition", i <= step ? "bg-accent" : "bg-line")} />
              <span className={cn("text-[12.5px] font-bold", i <= step ? "text-ink" : "text-ink-faint")}>
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ol>

        {showServerMessage && <FormAlert>{state.message}</FormAlert>}

        {/* Langkah 1: data pemesan & jadwal. Semua langkah tetap ada di DOM (hanya disembunyikan) supaya isian tidak hilang. */}
        <div className={cn("flex flex-col gap-5", step !== 0 && "hidden")}>
          <Section title="Data Pemesan" aside={<Link href="/account" className="text-[13.5px] font-bold text-accent-deep">Ubah di Akun</Link>}>
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoTile label="Nama" value={user.name} />
              <InfoTile label="Email" value={user.email} />
              <InfoTile label="No. HP" value={user.phone} />
            </div>
            <p className="text-[12.5px] text-ink-faint">Diambil otomatis dari akunmu dan dipakai kurir untuk konfirmasi.</p>
          </Section>

          <Section title="Jadwal Langganan">
            <div className="grid items-start gap-3 sm:grid-cols-3">
              <Field id="started_at" label="Tanggal mulai" error={errors.started_at}>
                {/* relative: ikon kalender bawaan browser dibuat menutupi input (lihat index.css) */}
                <div className="relative">
                  <Input id="started_at" name="started_at" type="date" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)} invalid={!!errors.started_at} />
                </div>
              </Field>
              <InfoTile label="Selesai" value={startDate ? formatDate(addDays(startDate, tier.duration)) : "-"} className="sm:mt-[26px]" />
              <InfoTile label="Waktu antar" value="Makan siang" className="sm:mt-[26px]" />
            </div>
          </Section>
        </div>

        {/* Langkah 2: alamat pengiriman */}
        <div className={cn("flex flex-col gap-5", step !== 1 && "hidden")}>
          <Section title="Alamat Pengiriman">
            <InfoTile label="Kota" value={`${pkg.city} (kota dapur mitra)`} />
            <Field id="address" label="Alamat lengkap" error={errors.address}>
              <Textarea id="address" name="address" rows={3} autoComplete="street-address" placeholder="Jl. Merdeka No. 1, RT 01/RW 02, Kel. Gambir" invalid={!!errors.address} />
            </Field>
            <Field id="post_code" label="Kode pos" error={errors.post_code} className="sm:max-w-[220px]">
              <Input id="post_code" name="post_code" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="10110" invalid={!!errors.post_code} />
            </Field>
            <Field id="notes" label="Catatan untuk kurir & dapur" error={errors.notes} hint="Wajib diisi. Contoh: patokan rumah, titip di satpam, atau pantangan makanan.">
              <Textarea id="notes" name="notes" rows={2} placeholder="Titip di satpam lobi, tanpa micin" invalid={!!errors.notes} />
            </Field>
          </Section>
        </div>

        {/* Langkah 3: pembayaran */}
        <div className={cn("flex flex-col gap-5", step !== 2 && "hidden")}>
          <Section title="Transfer ke salah satu rekening">
            <div className="grid gap-3 md:grid-cols-2">
              {BANK_ACCOUNTS.map((account) => {
                const Logo = BANK_LOGOS[account.bank];
                return (
                  <div key={account.bank} className="flex items-center gap-3 rounded-2xl border border-line p-3.5">
                    <Logo aria-label={account.bank} role="img" className="h-10 w-[57px] flex-none rounded-lg" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[12.5px] text-ink-soft">{account.holder}</span>
                      <span className="text-[15px] font-bold tracking-wide">{account.number}</span>
                    </div>
                    <CopyButton value={account.number} />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-accent-tint px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[12.5px] font-semibold text-accent-deep">Nominal transfer</span>
                <span className="font-display text-lg font-extrabold">{formatRupiah(total)}</span>
              </div>
              <CopyButton value={String(total)} label="Salin nominal" />
            </div>
          </Section>

          <Section title="Bukti Pembayaran">
            <ProofInput error={errors.proof} />
          </Section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => goTo(step - 1)}>
              Kembali
            </Button>
          ) : (
            <ButtonLink href={`/packages/${pkg.slug}?tier=${tier.id}`} variant="secondary">
              Ganti tier
            </ButtonLink>
          )}
          {step < 2 ? (
            <Button onClick={next}>Lanjut ke {STEPS[step + 1]}</Button>
          ) : (
            <SubmitButton pendingText="Mengirim pesanan...">Kirim Pesanan</SubmitButton>
          )}
        </div>
      </div>

      {/* Ringkasan: di HP tampil di atas form, di desktop menempel di kanan */}
      <aside className="order-first lg:sticky lg:top-28 lg:order-none">
        <Card className="flex flex-col gap-4 p-5 lg:p-6">
          <div className="flex gap-3.5">
            <div className="relative h-[72px] w-[72px] flex-none overflow-hidden rounded-[14px] bg-surface-soft">
              {pkg.image && <Image src={pkg.image} alt="" fill sizes="72px" className="object-cover" />}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-[0.04em] text-accent-deep">Tier {tier.name}</span>
              <span className="truncate font-display text-base font-bold">{pkg.name}</span>
              <span className="text-[13px] text-ink-faint">
                {pkg.category} · {pkg.city}
              </span>
            </div>
          </div>
          <dl className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <Row label="Harga paket" value={formatRupiah(price)} />
            <Row label="Durasi · jumlah" value={`${tier.duration} hari · ${tier.quantity} orang`} />
            <Row label="Ongkos kirim" value={<span className="text-good">Gratis</span>} />
            <Row label="PPN 11%" value={formatRupiah(tax)} />
            <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <dt className="font-bold">Total</dt>
              <dd className="font-display text-xl font-extrabold">{formatRupiah(total)}</dd>
            </div>
          </dl>
          <p className="text-[12.5px] leading-relaxed text-ink-faint">Pesanan diverifikasi tim kami maksimal 1x24 jam setelah bukti transfer dikirim.</p>
        </Card>
      </aside>
    </form>
  );
}

function Section({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-4 p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {aside}
      </div>
      {children}
    </Card>
  );
}

function InfoTile({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-0.5 rounded-xl bg-surface-soft px-4 py-3", className)}>
      <span className="text-xs text-ink-soft">{label}</span>
      <span className="truncate text-[15px] font-semibold">{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
