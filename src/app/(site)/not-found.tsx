import NotFoundContent from "@/components/NotFoundContent";

// Dipakai saat halaman di dalam (site) memanggil notFound(), mis. slug paket/kategori tidak ada.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
