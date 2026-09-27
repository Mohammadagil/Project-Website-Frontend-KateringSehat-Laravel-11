import { apiFetch } from "@/libs/api";
import { TPackage } from "@/components/Packages/types";
import { TCategory } from "@/components/Categories/types";
import { TCity } from "@/components/Cities/types";
import { TTestimonial } from "@/components/Testimonials/types";

// Data katalog publik (tanpa login). Mengembalikan null kalau API gagal,
// supaya halaman bisa membedakan "gagal dimuat" dengan "memang kosong".
async function list<T>(path: string): Promise<T[] | null> {
  const res = await apiFetch<{ data: T[] }>(path);
  return res.ok ? res.data.data : null;
}

export const getPackages = () => list<TPackage>("/catering-packages");
export const getCategories = () => list<TCategory>("/categories");
export const getCities = () => list<TCity>("/cities");
export const getTestimonials = () => list<TTestimonial>("/testimonials");
