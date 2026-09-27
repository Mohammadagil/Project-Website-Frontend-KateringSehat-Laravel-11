import Image from "next/image";
import Link from "next/link";
import { TPackage } from "@/components/Packages/types";
import Badge from "@/components/ui/Badge";
import { cheapestTier } from "@/libs/package";
import { formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";

// Kartu paket versi baris (bagian "Baru dari dapur").
export default function PackageRow({ pkg }: { pkg: TPackage }) {
  const tier = cheapestTier(pkg.tiers);
  const image = mediaUrl(pkg.thumbnail);

  return (
    <Link href={`/packages/${pkg.slug}`} className="flex items-center gap-4 rounded-[18px] border border-line bg-card p-3.5 transition hover:border-accent">
      <div className="relative h-20 w-20 flex-none overflow-hidden rounded-[14px] bg-surface-soft lg:h-24 lg:w-24">
        {image && <Image src={image} alt="" fill sizes="96px" className="object-cover" />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Badge variant="accent" className="px-2 py-0.5 text-[11px]">
          Baru
        </Badge>
        <h3 className="truncate font-display text-base font-bold lg:text-[16.5px]">{pkg.name}</h3>
        <span className="truncate text-[13px] text-ink-faint">
          {pkg.category.name} · {pkg.city.name}
        </span>
        <span className="text-sm font-extrabold">{tier ? `Mulai ${formatRupiah(tier.price)}` : "Harga segera hadir"}</span>
      </div>
    </Link>
  );
}
