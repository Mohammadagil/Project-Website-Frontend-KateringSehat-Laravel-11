import { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/libs/auth-guard";
import { getMyBookings } from "@/libs/bookings";
import { BOOKING_STATUSES, bookingStatus, STATUS_FILTER_LABEL, TBookingStatus } from "@/libs/booking-status";
import Container from "@/components/Layout/Container";
import EmptyState from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import OrderRow from "@/components/Orders/OrderRow";
import { cn } from "@/libs/cn";

export const metadata: Metadata = { title: "Pesanan Saya" };

type Props = { searchParams: { status?: string } };

export default async function OrdersPage({ searchParams }: Props) {
  requireUser("/orders");
  const bookings = await getMyBookings("/orders");

  // ?status= yang tidak dikenal dianggap "semua"
  const filter = BOOKING_STATUSES.includes(searchParams.status as TBookingStatus) ? (searchParams.status as TBookingStatus) : "all";
  const withStatus = bookings.map((booking) => ({ booking, status: bookingStatus(booking) }));
  const visible = filter === "all" ? withStatus : withStatus.filter((item) => item.status === filter);
  const count = (status: TBookingStatus | "all") => (status === "all" ? bookings.length : withStatus.filter((item) => item.status === status).length);

  const chips: { value: TBookingStatus | "all"; label: string }[] = [
    { value: "all", label: "Semua" },
    ...BOOKING_STATUSES.map((status) => ({ value: status, label: STATUS_FILTER_LABEL[status] })),
  ];

  return (
    <Container className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-[28px] font-extrabold leading-tight lg:text-[34px]">Pesanan Saya</h1>
        <p className="text-sm text-ink-soft">{bookings.length > 0 ? `${bookings.length} pesanan, terbaru di atas` : "Belum ada pesanan"}</p>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          title="Kamu belum punya pesanan"
          description="Pilih paket katering sehat, tentukan tier, lalu pesan. Semua pesananmu akan tampil di sini."
          action={<ButtonLink href="/#paket">Cari Paket Katering</ButtonLink>}
        />
      ) : (
        <>
          <nav aria-label="Filter status pesanan" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
            {chips.map((chip) => {
              const active = filter === chip.value;
              return (
                <Link
                  key={chip.value}
                  href={chip.value === "all" ? "/orders" : `/orders?status=${chip.value}`}
                  aria-current={active ? "page" : undefined}
                  scroll={false}
                  className={cn(
                    "flex h-10 flex-none items-center rounded-full border px-4 text-sm font-bold transition",
                    active ? "border-primary bg-primary text-primary-on" : "border-line bg-card text-ink-soft hover:border-accent hover:text-ink",
                  )}
                >
                  {chip.label} ({count(chip.value)})
                </Link>
              );
            })}
          </nav>

          {visible.length > 0 ? (
            <div className="flex flex-col gap-3">
              {visible.map(({ booking }) => (
                <OrderRow key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <EmptyState title="Tidak ada pesanan dengan status ini" action={<ButtonLink href="/orders" variant="secondary" size="sm">Lihat semua pesanan</ButtonLink>} />
          )}
        </>
      )}
    </Container>
  );
}
