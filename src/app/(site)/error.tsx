"use client";

import Container from "@/components/Layout/Container";
import Button, { ButtonLink } from "@/components/ui/Button";

// Tampil saat halaman gagal dirender, mis. backend tidak bisa dihubungi.
export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="font-display text-2xl font-extrabold lg:text-3xl">Terjadi kesalahan</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">Data belum bisa dimuat. Periksa koneksi internetmu lalu coba lagi.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Coba Lagi</Button>
        <ButtonLink href="/" variant="secondary">
          Ke Beranda
        </ButtonLink>
      </div>
    </Container>
  );
}
