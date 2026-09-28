import { Metadata } from "next";
import { redirect } from "next/navigation";
import { findPackageDetail, getPackageDetail } from "@/libs/catalog";
import { requireUser } from "@/libs/auth-guard";
import { mediaUrl } from "@/libs/media";
import { todayInJakarta } from "@/libs/format";
import Container from "@/components/Layout/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BookingForm from "@/components/Booking/BookingForm";

type Props = {
  params: { packageSlug: string };
  searchParams: { tier?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await findPackageDetail(params.packageSlug);
  return { title: pkg ? `Booking ${pkg.name}` : "Booking" };
}

export default async function BookingPage({ params, searchParams }: Props) {
  const user = requireUser(`/packages/${params.packageSlug}/booking${searchParams.tier ? `?tier=${searchParams.tier}` : ""}`);
  const pkg = await getPackageDetail(params.packageSlug);

  // Tier wajib milik paket ini. Kalau tidak ada / tidak cocok, kembali ke halaman paket untuk memilih.
  const tier = pkg.tiers.find((t) => String(t.id) === searchParams.tier);
  if (!tier) redirect(`/packages/${pkg.slug}`);

  return (
    <Container className="flex flex-col gap-6 py-6 lg:gap-8 lg:py-10">
      <div className="flex flex-col gap-3">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: pkg.name, href: `/packages/${pkg.slug}?tier=${tier.id}` }, { label: "Booking" }]} />
        <h1 className="font-display text-[28px] font-extrabold leading-tight lg:text-[34px]">Booking &amp; Pembayaran</h1>
      </div>

      <BookingForm
        minDate={todayInJakarta()}
        user={{ name: user.name, email: user.email, phone: user.phone }}
        pkg={{ id: pkg.id, slug: pkg.slug, name: pkg.name, image: mediaUrl(pkg.thumbnail), category: pkg.category.name, city: pkg.city.name }}
        tier={{ id: tier.id, name: tier.name, price: tier.price, quantity: tier.quantity, duration: tier.duration }}
      />
    </Container>
  );
}
