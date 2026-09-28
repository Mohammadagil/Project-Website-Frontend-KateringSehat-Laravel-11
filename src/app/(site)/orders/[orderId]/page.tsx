import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireUser } from "@/libs/auth-guard";
import { getMyBooking } from "@/libs/bookings";
import { bookingStatus, deliveryTimeLabel, STATUS_BADGE, STATUS_LABEL } from "@/libs/booking-status";
import { formatDate, formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";
import { csWhatsappUrl } from "@/config/contact";
import Container from "@/components/Layout/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { ChatIcon } from "@/components/ui/icons";
import CopyButton from "@/components/Booking/CopyButton";
import StatusBanner from "@/components/Orders/StatusBanner";
import InfoCard from "@/components/Orders/InfoCard";
import ResubmitProofForm from "@/components/Orders/ResubmitProofForm";

type Props = {
  params: { orderId: string };
  searchParams: { resubmitted?: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return { title: `Pesanan ${params.orderId}` };
}

export default async function OrderDetailPage({ params, searchParams }: Props) {
  const path = `/orders/${params.orderId}`;
  requireUser(path);
  const booking = await getMyBooking(params.orderId, path);

  const status = bookingStatus(booking);
  const pkg = booking.cateringPackage;
  const tier = booking.cateringTier;
  const image = mediaUrl(pkg?.thumbnail);
  const proof = mediaUrl(booking.proof);
  const csUrl = csWhatsappUrl(`Halo, saya ingin bertanya tentang pesanan ${booking.booking_trx_id}.`);

  return (
    <Container className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-10">
      <div className="flex flex-col gap-3">
        <Breadcrumb items={[{ label: "Pesanan Saya", href: "/orders" }, { label: booking.booking_trx_id }]} />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[28px] font-extrabold leading-tight lg:text-[34px]">Detail Pesanan</h1>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-display text-lg font-bold tracking-wide">{booking.booking_trx_id}</span>
              <CopyButton value={booking.booking_trx_id} label="Salin ID" />
              <Badge variant={STATUS_BADGE[status]}>{STATUS_LABEL[status]}</Badge>
            </div>
          </div>
          {csUrl && (
            <a href={csUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-card px-5 text-sm font-bold transition hover:border-accent">
              <ChatIcon className="h-[18px] w-[18px]" />
              Hubungi Customer Service
            </a>
          )}
        </div>
      </div>

      <StatusBanner status={status} reason={booking.rejectionReason} startedAt={booking.started_at} endedAt={booking.ended_at} resubmitted={!!searchParams.resubmitted && status === "pending"} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-6">
        <div className="flex flex-col gap-5">
          <Card className="flex items-center gap-4 p-4 lg:p-5">
            <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl bg-surface-soft lg:h-24 lg:w-24">
              {image && <Image src={image} alt="" fill sizes="96px" className="object-cover" />}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate font-display text-lg font-bold lg:text-xl">{pkg?.name ?? "Paket katering"}</span>
              <span className="text-[13px] text-ink-soft">
                {[pkg?.category?.name, booking.city, pkg?.kitchen?.name && `Dapur ${pkg.kitchen.name}`].filter(Boolean).join(" · ")}
              </span>
              <Badge variant="accent" className="mt-0.5">
                Tier {tier?.name} · {booking.quantity} orang · {booking.duration} hari
              </Badge>
            </div>
            {pkg?.slug && (
              <Link href={`/packages/${pkg.slug}`} className="hidden flex-none text-sm font-bold text-accent-deep sm:block">
                Lihat paket
              </Link>
            )}
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard
              title="Jadwal & Pengiriman"
              rows={[
                ["Periode", `${formatDate(booking.started_at)} – ${formatDate(booking.ended_at)}`],
                ["Waktu antar", deliveryTimeLabel(booking.delivery_time)],
                ["Kota", booking.city],
                ["Alamat", booking.address],
                ["Kode pos", booking.post_code],
                ["Catatan", booking.notes || "-"],
              ]}
            />
            <InfoCard
              title="Data Pemesan"
              rows={[
                ["Nama", booking.name],
                ["Email", booking.email],
                ["No. HP", booking.phone],
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <InfoCard
            title="Rincian Pembayaran"
            rows={[
              ["Harga paket", formatRupiah(Number(booking.price))],
              ["Durasi · jumlah", `${booking.duration} hari · ${booking.quantity} orang`],
              ["Ongkos kirim", <span key="ongkir" className="text-good">Gratis</span>],
              ["PPN 11%", formatRupiah(Number(booking.total_tax_amount))],
            ]}
            footer={
              <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                <span className="font-bold">Total</span>
                <span className="font-display text-xl font-extrabold">{formatRupiah(Number(booking.total_amount))}</span>
              </div>
            }
          />

          <Card className="flex flex-col gap-3 p-5 lg:p-6">
            <h2 className="font-display text-lg font-bold">Bukti Pembayaran</h2>
            {proof ? (
              <a href={proof} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video overflow-hidden rounded-2xl border border-line bg-surface-soft" aria-label="Buka foto bukti pembayaran ukuran penuh">
                <Image src={proof} alt="Bukti pembayaran" fill sizes="420px" className="object-contain transition group-hover:scale-[1.02]" />
              </a>
            ) : (
              <p className="text-sm text-ink-soft">Belum ada bukti pembayaran.</p>
            )}
          </Card>

          {status === "rejected" && (
            <Card id="kirim-ulang" className="flex scroll-mt-28 flex-col gap-4 border-[1.5px] border-bad p-5 lg:p-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-lg font-bold">Kirim Ulang Bukti Pembayaran</h2>
                <p className="text-sm text-ink-soft">Unggah foto bukti transfer yang jelas. Status pesanan akan kembali menjadi &ldquo;Menunggu verifikasi&rdquo;.</p>
              </div>
              <ResubmitProofForm trxId={booking.booking_trx_id} />
            </Card>
          )}

          {pkg?.slug && status !== "rejected" && (
            <ButtonLink href={`/packages/${pkg.slug}`} variant="secondary" block>
              Pesan paket ini lagi
            </ButtonLink>
          )}
        </div>
      </div>
    </Container>
  );
}
