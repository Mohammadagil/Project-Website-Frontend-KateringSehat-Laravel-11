"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/cn";

type TNavItem = {
  href: string;
  label: string;
  // Kapan menu ini dianggap "sedang dibuka". Link ke #bagian tidak pernah aktif.
  isActive?: (pathname: string) => boolean;
};

export default function MainNav({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();

  const items: TNavItem[] = [
    { href: "/", label: "Beranda", isActive: (p) => p === "/" },
    { href: "/#kategori", label: "Kategori" },
    { href: "/#terbaru", label: "Paket Terbaru" },
    { href: "/#testimoni", label: "Testimoni" },
  ];

  // "Pesanan Saya" hanya berguna untuk yang sudah login (endpoint /my-bookings wajib token).
  if (loggedIn) {
    items.push({ href: "/orders", label: "Pesanan Saya", isActive: (p) => p.startsWith("/orders") });
  }

  return (
    <nav aria-label="Menu utama" className="hidden items-center gap-8 text-[14.5px] font-medium text-ink-soft lg:flex">
      {items.map((item) => {
        const active = item.isActive?.(pathname) ?? false;
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("border-b-2 py-1 transition hover:text-accent", active ? "border-accent font-bold text-ink" : "border-transparent")}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
