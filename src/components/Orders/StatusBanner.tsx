import { ComponentType, SVGProps } from "react";
import { CheckCircleIcon, ClockCircleIcon, XCircleIcon } from "@/components/ui/icons";
import { TBookingStatus } from "@/libs/booking-status";
import { formatDate, todayInJakarta } from "@/libs/format";
import { cn } from "@/libs/cn";

type Props = {
  status: TBookingStatus;
  reason?: string | null;
  startedAt: string;
  endedAt: string;
  resubmitted?: boolean;
};

const styles: Record<TBookingStatus, { box: string; icon: ComponentType<SVGProps<SVGSVGElement>>; title: string }> = {
  pending: { box: "bg-warn-tint text-warn", icon: ClockCircleIcon, title: "Menunggu verifikasi" },
  approved: { box: "bg-good-tint text-good", icon: CheckCircleIcon, title: "Pembayaran diterima" },
  rejected: { box: "bg-bad-tint text-bad", icon: XCircleIcon, title: "Pembayaran ditolak" },
};

function description({ status, reason, startedAt, endedAt, resubmitted }: Props) {
  if (status === "pending") {
    return resubmitted
      ? "Bukti baru sudah terkirim. Tim kami memverifikasi ulang maksimal 1x24 jam."
      : "Tim kami sedang memeriksa bukti bayarmu, maksimal 1x24 jam.";
  }
  if (status === "rejected") {
    return `${reason ? `Alasan: ${reason}. ` : ""}Kirim ulang bukti bayar di bawah — tidak perlu booking dari awal.`;
  }
  // Disetujui: jelaskan posisi langganan terhadap hari ini.
  const today = todayInJakarta();
  const start = startedAt.slice(0, 10);
  const end = endedAt.slice(0, 10);
  if (today < start) return `Pesananmu siap diantar mulai ${formatDate(start)}.`;
  if (today <= end) return `Langganan sedang berjalan hingga ${formatDate(end)}.`;
  return `Langganan selesai pada ${formatDate(end)}.`;
}

export default function StatusBanner(props: Props) {
  const style = styles[props.status];
  const Icon = style.icon;

  return (
    <div role="status" className={cn("flex items-start gap-3.5 rounded-[18px] px-5 py-4", style.box)}>
      <Icon className="mt-0.5 h-6 w-6 flex-none" />
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-extrabold">{style.title}</span>
        <span className="text-sm leading-relaxed">{description(props)}</span>
      </div>
    </div>
  );
}
