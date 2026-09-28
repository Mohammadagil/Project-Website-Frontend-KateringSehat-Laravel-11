import Link from "next/link";

type TCrumb = { label: string; href?: string };

// Jejak halaman: Beranda / Kategori / Nama paket. Item terakhir = halaman saat ini (tanpa link).
export default function Breadcrumb({ items }: { items: TCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13.5px] text-ink-faint">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
