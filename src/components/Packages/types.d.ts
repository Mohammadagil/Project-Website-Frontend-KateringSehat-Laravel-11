import { TCategory } from "@/components/Categories/types";
import { TCity } from "@/components/Cities/types";
import { TTier } from "@/components/Tiers/types";
import { TKitchen } from "@/components/Kitchen/types";
import { TTestimonial } from "../Testimonials/types";
import { TBonus } from "../Bonuses/types";

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

export type TPackageDetails = {
  photos: {
    id: number;
    photo: string;
    catering_package_id: number;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
  }[];
  bonuses: TBonus[];
  testimonials: TTestimonial[];
} & TPackage;

export type TBookingDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  past_codes: null;
  city: string;
  address: string;
  notes: string;
  started_at: string;
  ended_at: string;
  booking_trx_id: string;
  price: number;
  total_tax_amount: number;
  total_amount: number;
  delivery_time: string;
  quantity: number;
  duration: number;
  isPaid: 0 | 1;
  proof: string;
  cateringPackage: TPackage;
  cateringTier: TTier;
};
