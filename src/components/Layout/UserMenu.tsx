"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { ChevronDownIcon } from "@/components/ui/icons";
import { logoutAction } from "@/components/Auth/actions";
import { cn } from "@/libs/cn";

export default function UserMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup menu saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!open) return;

    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass = "block px-4 py-3 text-sm font-semibold transition hover:bg-surface-soft";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 rounded-full border border-line bg-card py-1 pl-1 pr-3.5 transition hover:border-accent"
      >
        <Avatar name={name} />
        <span className="max-w-[140px] truncate text-sm font-semibold">{name}</span>
        <ChevronDownIcon className={cn("h-4 w-4 text-ink-faint transition", open && "rotate-180")} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-bold">{name}</p>
            <p className="truncate text-xs text-ink-faint">{email}</p>
          </div>
          <Link role="menuitem" href="/orders" onClick={() => setOpen(false)} className={itemClass}>
            Pesanan Saya
          </Link>
          <Link role="menuitem" href="/account" onClick={() => setOpen(false)} className={itemClass}>
            Akun Saya
          </Link>
          <form action={logoutAction} className="border-t border-line">
            <button role="menuitem" type="submit" className="w-full px-4 py-3 text-left text-sm font-semibold text-bad transition hover:bg-bad-tint">
              Keluar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}