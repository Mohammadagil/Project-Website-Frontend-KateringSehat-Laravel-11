import Image from "next/image";
import Link from "next/link";
import { getCategories, getCities, getPackages, getTestimonials } from "@/libs/catalog";
import { getSessionUser } from "@/libs/session";
import { cheapestTier } from "@/libs/package";
import { formatRupiah } from "@/libs/format";
import { mediaUrl } from "@/libs/media";
import Container from "@/components/Layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/Catalog/SectionHeading";
import CategoryCard from "@/components/Catalog/CategoryCard";
import PackageCard from "@/components/Catalog/PackageCard";
import PackageRow from "@/components/Catalog/PackageRow";
import TestimonialCard from "@/components/Catalog/TestimonialCard";
import CityFilter from "@/components/Catalog/CityFilter";

type Props = { searchParams: { kota?: string } };

export default async function HomePage({ searchParams }: Props) {
  const [packages, categories, cities, testimonials] = await Promise.all([getPackages(), getCategories(), getCities(), getTestimonials()]);
  const user = getSessionUser();

  const allPackages = packages ?? [];
  const selectedCity = cities?.find((city) => city.slug === searchParams.kota) ?? null;
  const visiblePackages = selectedCity ? allPackages.filter((pkg) => pkg.city.slug === selectedCity.slug) : allPackages;
  const popular = visiblePackages.filter((pkg) => pkg.is_popular === 1);
  const newest = [...visiblePackages].sort((a, b) => b.id - a.id).slice(0, 6);

  const featured = allPackages.find((pkg) => pkg.is_popular === 1) ?? allPackages[0];
  const featuredTier = featured ? cheapestTier(featured.tiers) : null;
  const featuredImage = featured ? mediaUrl(featured.thumbnail) : null;

  const stats = [
    { value: allPackages.length, label: "Paket aktif" },
    { value: new Set(allPackages.map((pkg) => pkg.city.slug)).size, label: "Kota terjangkau" },
    { value: categories?.length ?? 0, label: "Kategori menu" },
  ];

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="grid items-center gap-10 py-8 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="flex flex-col gap-5 lg:gap-7">
            {user && <p className="text-sm font-semibold text-ink-soft">Halo, {user.name.split(" ")[0]}</p>}
            <span className="w-fit rounded-full bg-accent-tint px-3.5 py-1.5 text-[13px] font-semibold text-accent-deep">Katering langganan, bukan sekali pesan</span>
            <h1 className="font-display text-[32px] font-extrabold leading-[1.08] sm:text-5xl lg:text-[56px]">Makan sehat, tanpa ribet mikirin menu.</h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft lg:text-[17px]">
              Pilih paket, tentukan tier langganan, dan menu sehat diantar tiap hari ke rumahmu — diracik oleh dapur mitra terverifikasi di kotamu.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink href="#paket" size="lg">
                Lihat Paket Catering
              </ButtonLink>
              <Link href="#kategori" className="text-[15px] font-semibold transition hover:text-accent">
                Pilih kategori →
              </Link>
            </div>
            {packages && (
              <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="text-[13px] text-ink-faint">{stat.label}</dt>
                    <dd className="font-display text-2xl font-extrabold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="hidden justify-end lg:flex">
            {featured && featuredImage ? (
              <Link href={`/packages/${featured.slug}`} className="group relative block aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[32px] border border-line bg-surface-soft">
                <Image src={featuredImage} alt={featured.name} fill priority sizes="480px" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-card/95 p-4 backdrop-blur">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.04em] text-accent-deep">Paling banyak dipilih</span>
                    <span className="truncate font-display text-lg font-bold">{featured.name}</span>
                  </div>
                  {featuredTier && (
                    <span className="flex-none text-right">
                      <span className="block text-xs text-ink-faint">Mulai</span>
                      <span className="font-display text-base font-extrabold">{formatRupiah(featuredTier.price)}</span>
                    </span>
                  )}
                </div>
              </Link>
            ) : (
              <div className="relative aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[32px] border border-line bg-surface-soft">
                <Image src="/images/chef.png" alt="" fill sizes="480px" className="object-contain p-10" />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Kategori */}
      <section id="kategori" className="scroll-mt-24">
        <Container className="flex flex-col gap-6 pb-12 lg:pb-24">
          <SectionHeading title="Pilih sesuai tujuan sehatmu" subtitle={categories ? `${categories.length} kategori tersedia` : undefined} />
          {categories === null ? (
            <EmptyState title="Kategori belum bisa dimuat" description="Coba muat ulang halaman sebentar lagi." />
          ) : categories.length === 0 ? (
            <EmptyState title="Belum ada kategori" />
          ) : (
            <div className="-mx-5 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} className="w-40 flex-none snap-start sm:w-auto" />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Paket populer + filter kota */}
      <section id="paket" className="scroll-mt-24 bg-surface-soft">
        <Container className="flex flex-col gap-6 py-12 lg:py-20">
          <SectionHeading
            title="Paket paling banyak dipilih"
            subtitle={selectedCity ? `Dikirim dari dapur di ${selectedCity.name}` : "Dari semua kota"}
            action={cities && cities.length > 0 ? <CityFilter cities={cities} value={selectedCity?.slug ?? ""} /> : undefined}
          />

          {packages === null ? (
            <EmptyState title="Paket belum bisa dimuat" description="Server sedang tidak bisa dihubungi. Coba muat ulang halaman sebentar lagi." />
          ) : visiblePackages.length === 0 ? (
            <EmptyState
              title={selectedCity ? `Belum ada paket di ${selectedCity.name}` : "Belum ada paket"}
              description={selectedCity ? "Dapur mitra di kota ini segera hadir. Coba pilih kota lain." : "Paket katering akan tampil di sini setelah ditambahkan."}
              action={
                selectedCity && (
                  <ButtonLink href="/#paket" variant="secondary" size="sm">
                    Lihat semua kota
                  </ButtonLink>
                )
              }
            />
          ) : popular.length === 0 ? (
            <EmptyState title="Belum ada paket unggulan" description="Lihat paket terbaru di bawah ini." />
          ) : (
            <div className="-mx-5 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-6">
              {popular.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} className="w-[78%] flex-none snap-start sm:w-auto" />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Paket terbaru */}
      {newest.length > 0 && (
        <section id="terbaru" className="scroll-mt-24">
          <Container className="flex flex-col gap-6 py-12 lg:py-20">
            <SectionHeading title="Baru dari dapur" subtitle="Paket yang paling baru ditambahkan dapur mitra" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {newest.map((pkg) => (
                <PackageRow key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimoni */}
      {testimonials && testimonials.length > 0 && (
        <section id="testimoni" className="scroll-mt-24 bg-surface-soft">
          <Container className="flex flex-col gap-6 py-12 lg:py-20">
            <SectionHeading title="Kata mereka yang sudah langganan" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
