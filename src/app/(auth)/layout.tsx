import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ChevronLeftIcon } from "@/components/ui/icons";

// Layout bersama untuk Masuk, Daftar, Lupa Password, dan Reset Password.
// Desktop: dua kolom (panel brand kiri, form kanan). Mobile: form saja.
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <aside className="hidden flex-col justify-between gap-10 bg-accent-tint p-12 md:flex lg:px-16">
        <Link href="/" aria-label="Kembali ke beranda" className="w-fit">
          <Logo markClassName="h-[30px] w-[30px]" textClassName="text-[19px]" shineClassName="stroke-accent-tint" />
        </Link>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-4xl font-extrabold leading-[1.08] lg:text-[44px]">Makan sehat, tanpa ribet mikirin menu.</h2>
          <p className="max-w-[44ch] text-base leading-relaxed text-ink-soft">Pilih paket, bayar via transfer, dan pantau status pesananmu dari satu akun.</p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface-soft">
          <Image src="/images/chef.png" alt="" fill sizes="(min-width: 768px) 40vw, 0px" className="object-contain p-6" />
        </div>
      </aside>

      <main className="flex flex-col px-6 py-5 sm:px-10 md:px-16 md:py-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Kembali ke beranda" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-ink md:invisible">
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center gap-7 py-8">{children}</div>
      </main>
    </div>
  );
}