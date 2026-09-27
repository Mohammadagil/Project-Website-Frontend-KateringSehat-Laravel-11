"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, SVGProps } from "react";
import { HomeIcon, ReceiptIcon, UserIcon } from "@/components/ui/icons";
import { cn } from "@/libs/cn";

type TItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isActive: (pathname: string) => boolean;
};

const items: TItem[] = [
  { href: "/", label: "Beranda", icon: HomeIcon, isActive: (p) => p === "/" },
  { href: "/orders", label: "Pesanan", icon: ReceiptIcon, isActive: (p) => p.startsWith("/orders") },
  { href: "/account", label: "Akun", icon: UserIcon, isActive: (p) => p.startsWith("/account") },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi utama" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-3 pt-2.5 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4">
        {items.map(({ href, label, icon: Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn("flex flex-col items-center gap-1 rounded-2xl py-2 text-xs transition", active ? "bg-accent-tint font-bold text-accent-deep" : "font-semibold text-ink-soft")}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}