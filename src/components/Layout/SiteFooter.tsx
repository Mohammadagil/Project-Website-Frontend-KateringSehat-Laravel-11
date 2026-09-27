import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Container from "@/components/Layout/Container";
import { getSessionUser } from "@/libs/session";

type TColumn = { title: string; links: [label: string, href: string][] };

const exploreColumn: TColumn = {
  title: "Jelajahi",
  links: [
    ["Beranda", "/"],
    ["Kategori", "/#kategori"],
    ["Paket Terbaru", "/#terbaru"],
  ],
};

// Kolom akun menyesuaikan status login, sama seperti header.
const memberColumn: TColumn = {
  title: "Akun",
  links: [
    ["Pesanan Saya", "/orders"],
    ["Akun Saya", "/account"],
  ],
};

const guestColumn: TColumn = {
  title: "Akun",
  links: [
    ["Masuk", "/login"],
    ["Daftar", "/register"],
  ],
};

export default function SiteFooter() {
  const columns = [exploreColumn, getSessionUser() ? memberColumn : guestColumn];

  return (
    <footer className="hidden border-t border-line lg:block">
      <Container className="flex items-start justify-between gap-10 py-14">
        <div className="flex max-w-xs flex-col gap-3">
          <Logo markClassName="h-6 w-6" textClassName="text-base" />
          <p className="text-sm leading-relaxed text-ink-soft">Katering sehat langganan dari dapur mitra terverifikasi, diantar tiap hari saat jam makan siang.</p>
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} Katering Sehat</p>
        </div>

        <div className="flex gap-16 text-[13.5px] text-ink-soft">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <span className="font-bold text-ink">{column.title}</span>
              {column.links.map(([label, href]) => (
                <Link key={href} href={href} className="transition hover:text-accent">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}