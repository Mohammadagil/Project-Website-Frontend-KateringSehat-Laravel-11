import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = { title: "Daftar" };

type Props = { searchParams: { next?: string } };

export default function RegisterPage({ searchParams }: Props) {
  const next = searchParams.next ?? "";

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-extrabold md:text-[32px]">Buat akun baru</h1>
        <p className="text-[15px] text-ink-soft">Satu akun untuk booking, bayar, dan pantau semua pesanan.</p>
      </div>

      <RegisterForm next={next} />

      <p className="text-sm text-ink-soft">
        Sudah punya akun?{" "}
        <Link href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"} className="font-bold text-accent-deep">
          Masuk
        </Link>
      </p>
    </>
  );
}