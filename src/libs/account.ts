import { apiFetch } from "@/libs/api";
import { redirectSessionExpired } from "@/libs/auth-guard";
import { TSessionUser } from "@/libs/session";

// Data akun terbaru langsung dari backend (bukan dari cookie), untuk halaman Akun.
// Sekaligus memastikan token masih berlaku: 401 → sesi habis.
export async function getCurrentUser(currentPath: string): Promise<TSessionUser> {
  const res = await apiFetch<TSessionUser>("/user", { auth: true });
  if (!res.ok) {
    if (res.status === 401) redirectSessionExpired(currentPath);
    throw new Error(res.message);
  }
  const { id, name, email, phone } = res.data;
  return { id, name, email, phone };
}
