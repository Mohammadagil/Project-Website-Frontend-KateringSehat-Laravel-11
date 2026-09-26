import { Metadata } from "next";
import Logo, { LogoMark } from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button, { ButtonLink } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

// Halaman sementara untuk mengecek fondasi desain (CP1). Dihapus di CP9.
export const metadata: Metadata = {
  title: "Pratinjau UI",
  robots: { index: false },
};

const swatches = [
  ["surface", "bg-surface"],
  ["surface-soft", "bg-surface-soft"],
  ["card", "bg-card"],
  ["ink", "bg-ink"],
  ["accent", "bg-accent"],
  ["accent-tint", "bg-accent-tint"],
  ["primary", "bg-primary"],
  ["line", "bg-line"],
  ["leaf", "bg-leaf"],
  ["good", "bg-good"],
  ["warn", "bg-warn"],
  ["bad", "bg-bad"],
];

export default function UiPreviewPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:px-8">
      <header className="flex items-center justify-between gap-4">
        <Logo />
        <ThemeToggle />
      </header>

      <section className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">Pratinjau fondasi desain</h1>
        <p className="text-ink-soft">Tekan tombol bulan/matahari di kanan atas untuk mencoba mode gelap.</p>
      </section>

      <Card className="flex flex-wrap items-end gap-6 p-6">
        <LogoMark className="h-20 w-20" />
        <LogoMark className="h-10 w-10" />
        <LogoMark className="h-6 w-6" />
        <Logo markClassName="h-10 w-10" textClassName="text-2xl" />
      </Card>

      <section className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {swatches.map(([name, cls]) => (
          <div key={name} className="flex flex-col gap-1.5">
            <span className={`h-14 rounded-xl border border-line ${cls}`} />
            <span className="text-xs text-ink-soft">{name}</span>
          </div>
        ))}
      </section>

      <Card className="flex flex-wrap items-center gap-3 p-6">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <ButtonLink href="/" variant="secondary" size="sm">
          Link ke beranda
        </ButtonLink>
      </Card>

      <Card className="flex flex-wrap gap-2 p-6">
        <Badge>Netral</Badge>
        <Badge variant="accent">Baru</Badge>
        <Badge variant="pending">Menunggu verifikasi</Badge>
        <Badge variant="approved">Disetujui</Badge>
        <Badge variant="rejected">Ditolak</Badge>
      </Card>

      <Card className="grid gap-4 p-6 md:grid-cols-2">
        <Field id="demo-email" label="Email">
          <Input id="demo-email" type="email" placeholder="nama@email.com" />
        </Field>
        <Field id="demo-phone" label="No. HP" error="No. HP wajib diisi.">
          <Input id="demo-phone" type="tel" invalid />
        </Field>
        <Field id="demo-notes" label="Catatan" hint="Contoh: titip di satpam lobi" className="md:col-span-2">
          <Textarea id="demo-notes" rows={3} />
        </Field>
      </Card>
    </main>
  );
}
