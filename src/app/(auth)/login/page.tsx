import { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import FormAlert from "@/components/ui/FormAlert";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

type Props = { searchParams: { next?: string; reset?: string } };

export default function LoginPage({ searchParams }: Props) {
  const next = searchParams.next ?? "";

  return (
    <>
      <div className="flex flex-col gap-2">
        <LogoMark className="mb-1 h-9 w-9 md:hidden" />
        <h1 className="font-display text-[26px] font-extrabold md:text-[32px]">Masuk ke akunmu</h1>
        <p className="text-[15px] text-ink-soft">Lanjutkan langganan &amp; cek status pesananmu.</p>
      </div>

      {searchParams.reset && <FormAlert variant="success">Password berhasil diubah. Silakan masuk dengan password baru.</FormAlert>}

      <LoginForm next={next} />

      <p className="text-sm text-ink-soft">
        Belum punya akun?{" "}
        <Link href={next ? `/register?next=${encodeURIComponent(next)}` : "/register"} className="font-bold text-accent-deep">
          Daftar di sini
        </Link>
      </p>
    </>
  );
}