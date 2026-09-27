"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  cities: { slug: string; name: string }[];
  value: string;
};

// Pilih kota → URL berubah jadi ?kota=slug, lalu server menyaring paket.
// Filter tersimpan di URL, jadi bisa dibagikan dan tetap ada saat halaman di-refresh.
export default function CityFilter({ cities, value }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="kota" className="whitespace-nowrap text-[13px] font-semibold text-ink-soft">
        Kota pengiriman
      </label>
      <select
        id="kota"
        value={value}
        onChange={(event) => {
          const slug = event.target.value;
          router.push(slug ? `${pathname}?kota=${slug}#paket` : `${pathname}#paket`, { scroll: false });
        }}
        className="h-11 min-w-[150px] rounded-xl border border-line bg-surface-soft px-3 text-sm font-semibold text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      >
        <option value="">Semua kota</option>
        {cities.map((city) => (
          <option key={city.slug} value={city.slug}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
