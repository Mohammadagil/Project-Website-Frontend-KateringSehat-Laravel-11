"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { UploadIcon } from "@/components/ui/icons";
import { validateProof } from "@/libs/proof";
import { cn } from "@/libs/cn";

type TPicked = { name: string; size: number; url: string };

// Pilih foto bukti transfer + pratinjau. Input file-nya sendiri ikut terkirim bersama form.
export default function ProofInput({ error }: { error?: string }) {
  const [picked, setPicked] = useState<TPicked | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  // true = pengguna sudah memilih file setelah pesan error terakhir dari form, jadi hasil cek file itu yang ditampilkan.
  const [pickedAfterError, setPickedAfterError] = useState(false);
  const [prevError, setPrevError] = useState(error);

  // Pesan error baru dari form (kirim ulang) → tampilkan lagi pesan itu.
  if (error !== prevError) {
    setPrevError(error);
    setPickedAfterError(false);
  }

  // Lepaskan URL pratinjau lama supaya tidak menumpuk di memori.
  useEffect(() => {
    return () => {
      if (picked) URL.revokeObjectURL(picked.url);
    };
  }, [picked]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPickedAfterError(true);
    if (!file) {
      setPicked(null);
      setLocalError(null);
      return;
    }
    setLocalError(validateProof(file));
    setPicked({ name: file.name, size: file.size, url: URL.createObjectURL(file) });
  }

  const shownError = pickedAfterError ? localError : (error ?? localError);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="proof"
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-[1.5px] border-dashed bg-surface-soft p-6 text-center transition hover:border-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40",
          shownError ? "border-bad" : "border-line",
        )}
      >
        {picked && !localError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau file lokal (blob:), bukan gambar dari server */}
            <img src={picked.url} alt="Pratinjau bukti transfer" className="max-h-44 w-auto max-w-full rounded-xl object-contain" />
            <span className="max-w-full truncate text-sm font-bold">{picked.name}</span>
            <span className="text-xs text-ink-faint">{(picked.size / 1024 / 1024).toFixed(2)} MB · klik untuk ganti</span>
          </>
        ) : (
          <>
            <UploadIcon className="h-7 w-7 text-accent-deep" />
            <span className="text-sm font-bold text-accent-deep">Pilih foto bukti transfer</span>
            <span className="text-xs text-ink-faint">JPG atau PNG, maksimal 2 MB</span>
          </>
        )}
        <input
          id="proof"
          name="proof"
          type="file"
          accept="image/jpeg,image/png"
          onChange={onChange}
          aria-invalid={shownError ? true : undefined}
          aria-describedby={shownError ? "proof-error" : undefined}
          className="sr-only"
        />
      </label>
      {shownError && (
        <p id="proof-error" role="alert" className="text-[12.5px] font-semibold text-bad">
          {shownError}
        </p>
      )}
    </div>
  );
}
