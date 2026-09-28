import { redirect } from "next/navigation";
import { getSessionUser } from "@/libs/session";

// Untuk halaman yang wajib login. Middleware sudah menjaga saat halaman dibuka langsung;
// ini lapisan kedua untuk navigasi di dalam aplikasi.
export function requireUser(nextPath: string) {
  const user = getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

// Token ditolak backend (401): kedaluwarsa atau sudah dicabut.
// Cookie hanya bisa dihapus di Route Handler, jadi lewat /session-expired dulu.
export function redirectSessionExpired(nextPath: string): never {
  redirect(`/session-expired?next=${encodeURIComponent(nextPath)}`);
}
