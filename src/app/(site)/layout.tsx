import SiteHeader from "@/components/Layout/SiteHeader";
import SiteFooter from "@/components/Layout/SiteFooter";
import MobileNav from "@/components/Layout/MobileNav";

// Kerangka untuk semua halaman desain baru (beranda, paket, booking, pesanan, akun).
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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