import Image from "next/image";
import Link from "next/link";
import { TCategory } from "@/components/Categories/types";
import { mediaUrl } from "@/libs/media";
import { cn } from "@/libs/cn";

export default function CategoryCard({ category, className }: { category: TCategory; className?: string }) {
  const image = mediaUrl(category.photo);
  // /api/categories menyertakan daftar paket per kategori; jumlahnya dipakai sebagai keterangan.
  const count = category.catering_packages?.length ?? 0;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-[18px] border border-line bg-card p-4 transition hover:border-accent hover:shadow-[0_12px_28px_-18px_rgba(20,32,26,0.3)] lg:p-5",
        className,
      )}
    >
      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-accent-tint">
        {image && <Image src={image} alt="" fill sizes="44px" className="object-contain p-2" />}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-bold">{category.name}</span>
        <span className="text-[13px] text-ink-faint">{count > 0 ? `${count} paket` : "Segera hadir"}</span>
      </span>
    </Link>
  );
}
