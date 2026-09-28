import { TBadgeVariant } from "@/components/ui/Badge";
import { TBookingDetails } from "@/components/Packages/types";

// Status pesanan menurut backend:
// - rejected: admin menolak bukti bayar (isRejected), pelanggan bisa kirim ulang bukti
// - approved: pembayaran diterima (isPaid)
// - pending : menunggu verifikasi admin
export type TBookingStatus = "pending" | "approved" | "rejected";

export const BOOKING_STATUSES: TBookingStatus[] = ["pending", "approved", "rejected"];

export function bookingStatus(booking: Pick<TBookingDetails, "isPaid" | "isRejected">): TBookingStatus {
  if (booking.isRejected) return "rejected";
  if (booking.isPaid) return "approved";
  return "pending";
}

export const STATUS_LABEL: Record<TBookingStatus, string> = {
  pending: "Menunggu verifikasi",
  approved: "Disetujui",
  rejected: "Ditolak",
};

// Label singkat untuk tombol filter
export const STATUS_FILTER_LABEL: Record<TBookingStatus, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
};

export const STATUS_BADGE: Record<TBookingStatus, TBadgeVariant> = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};

// Backend menyimpan waktu antar dalam bahasa Inggris ("Lunch time").
export function deliveryTimeLabel(value?: string | null) {
  if (!value) return "-";
  return /lunch/i.test(value) ? "Makan siang" : value;
}
