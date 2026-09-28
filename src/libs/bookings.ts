import { notFound } from "next/navigation";
import { apiFetch } from "@/libs/api";
import { redirectSessionExpired } from "@/libs/auth-guard";
import { TBookingDetails } from "@/components/Packages/types";

// Satu pesanan milik pengguna yang login. 404 → halaman tidak ditemukan, 401 → sesi habis.
export async function getMyBooking(trxId: string, currentPath: string): Promise<TBookingDetails> {
  const res = await apiFetch<{ data: TBookingDetails }>(`/my-bookings/${encodeURIComponent(trxId)}`, { auth: true });
  if (!res.ok) {
    if (res.status === 404) notFound();
    if (res.status === 401) redirectSessionExpired(currentPath);
    throw new Error(res.message);
  }
  return res.data.data;
}
