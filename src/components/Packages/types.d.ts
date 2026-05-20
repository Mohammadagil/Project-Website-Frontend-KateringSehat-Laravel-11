import { TCategory } from "@/components/Categories/types";
import { TCity } from "@/components/Cities/types";
import { TTier } from "@/components/Tiers/types";
import { TKitchen } from "@/components/Kitchen/types";

export type TShow = "popular" | "newest";

export type TPackage = {
  id: number;
  name: string;
  slug: string;
  is_popular: 0 | 1;
  thumbnail: string;
  about: string;
  city: TCity;
  category: TCategory;
  kitchen: TKitchen;
  tiers: TTier[];
};
