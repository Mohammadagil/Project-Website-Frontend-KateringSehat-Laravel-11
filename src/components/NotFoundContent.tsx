import Image from "next/image";
import Container from "@/components/Layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFoundContent() {
  return (
    <Container className="flex flex-col items-center gap-5 py-16 text-center lg:py-24">
      <div className="relative h-40 w-56 lg:h-48 lg:w-64">
        <Image src="/images/chef.png" alt="" fill sizes="256px" className="object-contain" />
      </div>
      <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-accent-deep">Error 404</p>
      <h1 className="font-display text-3xl font-extrabold lg:text-4xl">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">Paket atau halaman yang kamu cari mungkin sudah dihapus, atau alamatnya salah ketik.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Ke Beranda</ButtonLink>
        <ButtonLink href="/#paket" variant="secondary">
          Lihat Paket
        </ButtonLink>
      </div>
    </Container>
  );
}
