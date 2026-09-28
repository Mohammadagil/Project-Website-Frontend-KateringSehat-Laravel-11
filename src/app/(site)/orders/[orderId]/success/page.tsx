import { Metadata } from "next";
import Image from "next/image";
import { requireUser } from "@/libs/auth-guard";
import { getMyBooking } from "@/libs/bookings";
import { formatDate, formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";
import Container from "@/components/Layout/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import CopyButton from "@/components/Booking/CopyButton";

export const metadata: Metadata = { title: "Pesanan Terkirim" };

type Props = { params: { orderId: string } };

export default async function BookingSuccessPage({ params }: Props) {
  const path = `/orders/${params.orderId}/success`;
  const user = requireUser(path);
  const booking = await getMyBooking(params.orderId, path);
  const image = mediaUrl(booking.cateringPackage?.thumbnail);

  return (
    <Container className="flex justify-center py-10 lg:py-16">
      <Card className="flex w-full max-w-[600px] flex-col items-center gap-6 p-6 text-center sm:p-10">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-good-tint text-good">
          <CheckIcon className="h-10 w-10" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[28px] font-extrabold lg:text-[32px]">Pesanan terkirim!</h1>
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Tim kami memverifikasi bukti bayarmu maksimal 1x24 jam. Konfirmasi juga dikirim ke <span className="font-semibold text-ink">{booking.email || user.email}</span>.
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface-soft px-5 py-4 text-left">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] text-ink-soft">ID Transaksi Booking</span>
            <span className="font-display text-2xl font-extrabold tracking-wide">{booking.booking_trx_id}</span>
          </div>
          <CopyButton value={booking.booking_trx_id} />
        </div>

        <div className="flex w-full items-center gap-4 text-left">
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-[14px] bg-surface-soft">
            {image && <Image src={image} alt="" fill sizes="64px" className="object-cover" />}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate font-bold">{booking.cateringPackage?.name}</span>
            <span className="text-[13px] text-ink-soft">
              Tier {booking.cateringTier?.name} · mulai {formatDate(booking.started_at)}
            </span>
            <Badge variant="pending">Menunggu verifikasi</Badge>
          </div>
          <span className="flex-none font-display text-lg font-extrabold">{formatRupiah(Number(booking.total_amount))}</span>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <ButtonLink href="/" variant="secondary">
            Pesan Paket Lain
          </ButtonLink>
          <ButtonLink href={`/orders/${booking.booking_trx_id}`}>Lihat Detail Pesanan</ButtonLink>
        </div>
      </Card>
    </Container>
  );
}
