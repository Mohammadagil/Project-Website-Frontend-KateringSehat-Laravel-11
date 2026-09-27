import Image from "next/image";
import Link from "next/link";
import { TPackage } from "@/components/Packages/types";
import { cheapestTier } from "@/libs/package";
import { formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";
import { cn } from "@/libs/cn";

// Kartu paket bergambar (bagian "Paket paling banyak dipilih").
export default function PackageCard({ pkg, className }: { pkg: TPackage; className?: string }) {
  const tier = cheapestTier(pkg.tiers);
  const image = mediaUrl(pkg.thumbnail);

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[20px] border border-line bg-card transition hover:border-accent hover:shadow-[0_12px_28px_-18px_rgba(20,32,26,0.35)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
        {image && (
          <Image src={image} alt={pkg.name} fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 80vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 lg:p-5">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.04em] text-accent-deep">
          {pkg.category.name} · {pkg.city.name}
        </span>
        <h3 className="font-display text-lg font-bold leading-snug">{pkg.name}</h3>
        <p className="line-clamp-2 text-[13.5px] leading-relaxed text-ink-soft">{pkg.about}</p>
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-2">
          {tier ? (
            <>
              <span className="font-display text-[17px] font-extrabold">
                <span className="font-sans text-xs font-medium text-ink-faint">Mulai </span>
                {formatRupiah(tier.price)}
              </span>
              <span className="text-xs text-ink-faint">
                {tier.quantity} orang · {tier.duration} hari
              </span>
            </>
          ) : (
            <span className="text-sm text-ink-faint">Harga segera hadir</span>
          )}
        </div>
      </div>
    </Link>
  );
}
