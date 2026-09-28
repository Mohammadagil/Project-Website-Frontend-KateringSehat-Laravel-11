import SiteShell from "@/components/Layout/SiteShell";

// Kerangka untuk semua halaman desain baru (beranda, paket, booking, pesanan, akun).
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
