import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { requireUser } from "@/libs/auth-guard";
import { getCurrentUser } from "@/libs/account";
import { logoutAction } from "@/components/Auth/actions";
import Container from "@/components/Layout/Container";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/icons";
import ProfileForm from "@/components/Account/ProfileForm";
import PasswordForm from "@/components/Account/PasswordForm";
import ThemeSwitch from "@/components/Account/ThemeSwitch";

export const metadata: Metadata = { title: "Akun Saya" };

export default async function AccountPage() {
  requireUser("/account");
  const user = await getCurrentUser("/account");

  return (
    <Container className="flex flex-col gap-6 py-6 lg:py-10">
      <h1 className="font-display text-[28px] font-extrabold leading-tight lg:text-[34px]">Akun Saya</h1>

      <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
          <Card className="flex items-center gap-4 p-5 lg:flex-col lg:p-6 lg:text-center">
            <Avatar name={user.name} className="h-14 w-14 text-lg lg:h-20 lg:w-20 lg:text-2xl" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-display text-lg font-bold">{user.name}</span>
              <span className="truncate text-[13.5px] text-ink-soft">{user.email}</span>
            </div>
          </Card>

          <Card className="flex flex-col p-2">
            <nav aria-label="Menu akun" className="flex flex-col">
              <AsideLink href="#profil">Profil</AsideLink>
              <AsideLink href="#password">Ubah Password</AsideLink>
              <AsideLink href="#tampilan">Tampilan</AsideLink>
              <AsideLink href="/orders">Pesanan Saya</AsideLink>
            </nav>
          </Card>

          <form action={logoutAction}>
            <Button type="submit" variant="danger" block>
              Keluar
            </Button>
          </form>
        </aside>

        <div className="flex flex-col gap-5">
          <Section id="profil" title="Profil" description="Nama, email, dan no. HP ini dipakai untuk setiap pesanan baru.">
            <ProfileForm user={user} />
          </Section>

          <Section id="password" title="Ubah Password" description="Masukkan password saat ini untuk memastikan ini memang kamu.">
            <PasswordForm />
          </Section>

          <Section id="tampilan" title="Tampilan">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span id="dark-mode-label" className="text-[15px] font-bold">
                  Mode gelap
                </span>
                <span className="text-[13px] text-ink-faint">Nyaman dipakai malam hari. Pilihan disimpan di perangkat ini.</span>
              </div>
              <ThemeSwitch labelledBy="dark-mode-label" />
            </div>
          </Section>
        </div>
      </div>
    </Container>
  );
}

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <Card id={id} className="flex scroll-mt-28 flex-col gap-5 p-5 lg:p-7">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {description && <p className="text-sm text-ink-soft">{description}</p>}
      </div>
      {children}
    </Card>
  );
}

function AsideLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl px-4 py-3 text-[14.5px] font-semibold transition hover:bg-surface-soft">
      {children}
      <ChevronRightIcon className="h-4 w-4 text-ink-faint" />
    </Link>
  );
}
