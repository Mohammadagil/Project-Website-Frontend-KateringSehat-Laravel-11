import { Metadata } from "next";
import Link from "next/link";
import FormAlert from "@/components/ui/FormAlert";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Buat Password Baru" };

type Props = { searchParams: { token?: string; email?: string } };

export default function ResetPasswordPage({ searchParams }: Props) {
  const { token, email } = searchParams;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[26px] font-extrabold md:text-[32px]">Buat password baru</h1>
        {email && <p className="text-[15px] text-ink-soft">Untuk akun {email}</p>}
      </div>

      {token && email ? (
        <ResetPasswordForm token={token} email={email} />
      ) : (
        <FormAlert>Link reset tidak lengkap atau rusak. Minta link baru dari halaman Lupa Password.</FormAlert>
      )}

      <Link href="/forgot-password" className="text-sm font-bold text-accent-deep">
        Minta link reset baru
      </Link>
    </>
  );
}