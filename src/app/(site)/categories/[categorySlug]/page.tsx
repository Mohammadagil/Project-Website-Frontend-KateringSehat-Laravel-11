import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findCategoryDetail, getCategories, getCategoryDetail, getCities } from "@/libs/catalog";
import { mediaUrl } from "@/libs/media";
import Container from "@/components/Layout/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/Catalog/SectionHeading";
import PackageCard from "@/components/Catalog/PackageCard";
import CityFilter from "@/components/Catalog/CityFilter";
import { cn } from "@/libs/cn";

type Props = {
  params: { categorySlug: string };
  searchParams: { kota?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await findCategoryDetail(params.categorySlug);
  if(!category) return { title: "Kategori tidak ditemukan" };
  
  return { title: `Katering ${category.name}` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [category, categories, cities] = await Promise.all([getCategoryDetail(params.categorySlug), getCategories(), getCities()]);

  const packages = category.catering_packages ?? [];
  const selectedCity = cities?.find((city) => city.slug === searchParams.kota) ?? null;
  const visible = selectedCity ? packages.filter((pkg) => pkg.city?.slug === selectedCity.slug) : packages;
  const icon = mediaUrl(category.photo);

  return (
    <Container className="flex flex-col gap-8 py-6 lg:gap-12 lg:py-10">
      <div className="flex flex-col gap-5">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Kategori", href: "/#kategori" }, { label: category.name }]} />
        <div className="flex items-center gap-4">
          <span className="relative flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-2xl bg-accent-tint lg:h-16 lg:w-16">
            {icon && <Image src={icon} alt="" fill sizes="64px" className="object-contain p-2.5" />}
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-[28px] font-extrabold leading-tight lg:text-[36px]">Katering {category.name}</h1>
            <p className="text-sm text-ink-soft">{packages.length > 0 ? `${packages.length} paket tersedia` : "Paket segera hadir"}</p>
          </div>
        </div>
      </div>

      <section id="paket" className="flex scroll-mt-24 flex-col gap-6">
        <SectionHeading
          title="Pilihan paket"
          subtitle={selectedCity ? `Dikirim dari dapur di ${selectedCity.name}` : "Dari semua kota"}
          action={cities && cities.length > 0 && packages.length > 0 ? <CityFilter cities={cities} value={selectedCity?.slug ?? ""} /> : undefined}
        />
        {visible.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visible.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={selectedCity ? `Belum ada paket ${category.name} di ${selectedCity.name}` : `Belum ada paket ${category.name}`}
            description={selectedCity ? "Coba pilih kota lain." : "Dapur mitra sedang menyiapkan menu untuk kategori ini. Lihat kategori lain di bawah."}
            action={
              selectedCity ? (
                <ButtonLink href={`/categories/${category.slug}#paket`} variant="secondary" size="sm">
                  Lihat semua kota
                </ButtonLink>
              ) : undefined
            }
          />
        )}
      </section>

      {categories && categories.length > 1 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold lg:text-2xl">Kategori lain</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/categories/${item.slug}`}
                aria-current={item.slug === category.slug ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  item.slug === category.slug ? "border-primary bg-primary text-primary-on" : "border-line bg-card text-ink-soft hover:border-accent hover:text-ink",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
