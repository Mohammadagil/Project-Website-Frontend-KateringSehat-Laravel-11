import { ReactNode } from "react";
import SiteHeader from "@/components/Layout/SiteHeader";
import SiteFooter from "@/components/Layout/SiteFooter";
import MobileNav from "@/components/Layout/MobileNav";

// Kerangka situs (header, isi, footer, bottom bar). Dipakai layout (site) dan halaman 404 global.
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {/* pb-24: ruang agar konten paling bawah tidak tertutup bottom bar di mobile */}
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
