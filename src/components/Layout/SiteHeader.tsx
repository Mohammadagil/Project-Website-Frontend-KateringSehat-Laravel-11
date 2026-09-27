import Link from "next/link";
import { getSessionUser } from "@/libs/session";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/Layout/Container";
import MainNav from "@/components/Layout/MainNav";
import UserMenu from "@/components/Layout/UserMenu";

export default function SiteHeader() {
  const user = getSessionUser();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex h-[68px] items-center justify-between gap-6 lg:h-[84px]">
        <Link href="/" aria-label="Katering Sehat, ke beranda" className="flex-none">
          <Logo markClassName="h-7 w-7 lg:h-[30px] lg:w-[30px]" textClassName="text-lg lg:text-[19px]" />
        </Link>

        <MainNav loggedIn={!!user} />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <UserMenu name={user.name} email={user.email} />
            ) : (
              <>
                <Link href="/login" className="px-2 text-[14.5px] font-semibold transition hover:text-accent">
                  Masuk
                </Link>
                <ButtonLink href="/register" size="sm" className="px-5">
                  Daftar
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}