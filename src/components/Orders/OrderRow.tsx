import Image from "next/image";
import Link from "next/link";
import { TBookingDetails } from "@/components/Packages/types";
import Badge from "@/components/ui/Badge";
import { ChevronRightIcon } from "@/components/ui/icons";
import { bookingStatus, STATUS_BADGE, STATUS_LABEL } from "@/libs/booking-status";
import { formatDate, formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";
import { cn } from "@/libs/cn";

// Satu baris di daftar "Pesanan Saya". Pesanan yang ditolak ditonjolkan karena butuh tindakan pelanggan.
export default function OrderRow({ booking }: { booking: TBookingDetails }) {
  const status = bookingStatus(booking);
  const image = mediaUrl(booking.cateringPackage?.thumbnail);
  const rejected = status === "rejected";

  return (
    <Link
      href={`/orders/${booking.booking_trx_id}`}
      className={cn(
        "grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-[18px] border p-4 transition hover:border-accent sm:grid-cols-[64px_minmax(0,1fr)_auto_auto]",
        rejected ? "border-bad/50 bg-bad-tint" : "border-line bg-card",
      )}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-surface-soft sm:h-16 sm:w-16">
        {image && <Image src={image} alt="" fill sizes="64px" className="object-cover" />}
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[15px] font-bold">{booking.cateringPackage?.name ?? "Paket katering"}</span>
        <span className="truncate text-[13px] text-ink-soft">
          Tier {booking.cateringTier?.name} · {booking.quantity} orang · {booking.duration} hari
        </span>
        <span className="truncate text-xs text-ink-faint">
          {booking.booking_trx_id} · {formatDate(booking.started_at)} – {formatDate(booking.ended_at)}
        </span>
      </div>

      <div className="col-span-2 col-start-2 row-start-2 flex flex-wrap items-center justify-between gap-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end sm:justify-center">
        <Badge variant={rejected ? "rejected-on-tint" : STATUS_BADGE[status]}>{STATUS_LABEL[status]}</Badge>
        <span className="text-[15px] font-extrabold">{formatRupiah(Number(booking.total_amount))}</span>
      </div>

      <ChevronRightIcon className="col-start-3 row-start-1 h-4 w-4 justify-self-end text-ink-faint sm:col-start-4" />

      {rejected && (
        <p className="col-span-3 text-[13px] font-semibold text-bad sm:col-span-4">
          {booking.rejectionReason ? `Alasan: ${booking.rejectionReason}. ` : ""}Buka untuk kirim ulang bukti bayar.
        </p>
      )}
    </Link>
  );
}
