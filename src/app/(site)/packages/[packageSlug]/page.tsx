import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findPackageDetail, getPackageDetail } from "@/libs/catalog";
import { mediaUrl } from "@/libs/media";
import Container from "@/components/Layout/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";
import { CheckIcon } from "@/components/ui/icons";
import Gallery from "@/components/Package/Gallery";
import TierPicker from "@/components/Package/TierPicker";
import DetailTabs from "@/components/Package/DetailTabs";
import TestimonialCard from "@/components/Catalog/TestimonialCard";

type Props = {
  params: { packageSlug: string };
  searchParams: { tier?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await findPackageDetail(params.packageSlug);
  if (!pkg) return { title: "Paket tidak ditemukan" };
  return { title: pkg.name, description: pkg.about.slice(0, 160) };
}

export default async function PackageDetailPage({ params, searchParams }: Props) {
  const pkg = await getPackageDetail(params.packageSlug);
  const kitchen = pkg.kitchen as typeof pkg.kitchen & { catering_packages_count?: number };

  const images = [pkg.thumbnail, ...pkg.photos.map((p) => p.photo)].map((path) => mediaUrl(path)).filter((url): url is string => !!url);
  const kitchenPhoto = mediaUrl(kitchen?.photo);

  const description = (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
      <div className="flex flex-col gap-5">
        <p className="whitespace-pre-line text-[15px] leading-[1.75] text-ink-soft">{pkg.about}</p>
        <ul className="flex flex-col gap-2 text-[14.5px] text-ink-soft">
          {[`Dikirim setiap hari saat jam makan siang`, `Ongkos kirim gratis untuk area ${pkg.city.name}`, "Bayar via transfer bank, diverifikasi maksimal 1x24 jam"].map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckIcon className="mt-1 h-4 w-4 flex-none text-good" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      {kitchen && (
        <div className="flex h-fit items-center gap-4 rounded-[18px] border border-line bg-card p-4">
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-[14px] bg-surface-soft">
            {kitchenPhoto && <Image src={kitchenPhoto} alt="" fill sizes="64px" className="object-cover" />}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-[0.04em] text-ink-faint">Dapur mitra</span>
            <span className="font-display text-lg font-bold">{kitchen.name}</span>
            <span className="text-[13px] text-ink-soft">
              Berdiri sejak {kitchen.year}
              {kitchen.catering_packages_count ? ` · ${kitchen.catering_packages_count} paket` : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const bonuses = pkg.bonuses.length > 0 && (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pkg.bonuses.map((bonus) => {
        const photo = mediaUrl(bonus.photo);
        return (
          <div key={bonus.id} className="flex items-center gap-4 rounded-[18px] border border-line bg-card p-4">
            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-[14px] bg-surface-soft">
              {photo && <Image src={photo} alt="" fill sizes="64px" className="object-cover" />}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold">{bonus.name}</span>
              <span className="text-[13px] text-ink-soft">Gratis untuk langganan paket ini</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const testimonials = pkg.testimonials.length > 0 && (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pkg.testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );

  const tabs = [
    { id: "deskripsi", label: "Deskripsi", content: description },
    ...(bonuses ? [{ id: "bonus", label: `Bonus (${pkg.bonuses.length})`, content: bonuses }] : []),
    {
      id: "testimoni",
      label: `Testimoni (${pkg.testimonials.length})`,
      content: testimonials || <EmptyState title="Belum ada testimoni" description="Jadilah pelanggan pertama yang memberi ulasan untuk paket ini." />,
    },
  ];

  return (
    <Container className="flex flex-col gap-6 py-6 lg:gap-10 lg:py-10">
      <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: pkg.category.name, href: `/categories/${pkg.category.slug}` }, { label: pkg.name }]} />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Gallery images={images} alt={pkg.name} />

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href={`/categories/${pkg.category.slug}`} className="rounded-full bg-accent-tint px-3 py-1.5 text-xs font-bold text-accent-deep transition hover:brightness-95">
              {pkg.category.name}
            </Link>
            <span className="text-[13px] text-ink-faint">
              {pkg.city.name}
              {kitchen ? ` · Dapur ${kitchen.name}` : ""}
            </span>
          </div>
          <h1 className="font-display text-[28px] font-extrabold leading-[1.15] lg:text-[34px]">{pkg.name}</h1>
          <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-soft">{pkg.about}</p>
          <TierPicker slug={pkg.slug} tiers={pkg.tiers} initialTierId={Number(searchParams.tier) || undefined} />
        </div>
      </div>

      <DetailTabs tabs={tabs} />
    </Container>
  );
}
