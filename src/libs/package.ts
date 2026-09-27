import { TTier } from "@/components/Tiers/types";

// Tier termurah sebuah paket, untuk label "Mulai Rp ...". null kalau paket belum punya tier.
export function cheapestTier(tiers: TTier[] = []) {
  return tiers.length > 0 ? tiers.reduce((min, tier) => (tier.price < min.price ? tier : min)) : null;
}
