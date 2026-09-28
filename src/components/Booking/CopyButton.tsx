"use client";

import { useState } from "react";

// Salin teks (no. rekening, ID transaksi) ke clipboard.
export default function CopyButton({ value, label = "Salin" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Browser menolak akses clipboard: biarkan pengguna menyalin manual.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="h-9 flex-none rounded-full border border-line bg-card px-3.5 text-[13px] font-bold transition hover:border-accent"
    >
      {copied ? "Tersalin" : label}
    </button>
  );
}
