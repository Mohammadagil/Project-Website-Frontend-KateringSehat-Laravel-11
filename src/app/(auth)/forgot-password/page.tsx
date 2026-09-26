import { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = { title: "Lupa Password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-extrabold md:text-[32px]">Lupa password?</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft">Masukkan email akunmu. Kami kirim link untuk membuat password baru.</p>
      </div>

      <ForgotPasswordForm />

      <Link href="/login" className="text-sm font-bold text-accent-deep">
        Kembali ke Masuk
      </Link>
    </>
  );
}