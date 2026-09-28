import { Metadata } from "next";
import SiteShell from "@/components/Layout/SiteShell";
import NotFoundContent from "@/components/NotFoundContent";

export const metadata: Metadata = { title: "Halaman tidak ditemukan" };

// Dipakai untuk URL yang sama sekali tidak ada (di luar route mana pun).
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
