import { cache } from "react";
import { notFound } from "next/navigation";
import { apiFetch } from "@/libs/api";
import { TPackage, TPackageDetails } from "@/components/Packages/types";
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

// `cache` membuat generateMetadata dan page berbagi satu panggilan API per request.
const fetchDetail = cache((path: string) => apiFetch<{ data: unknown }>(path));

// Untuk page: 404 → halaman "tidak ditemukan", error lain → halaman error.
async function detail<T>(path: string): Promise<T> {
  const res = await fetchDetail(path);
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error(res.message);
  }
  return res.data.data as T;
}

// Untuk generateMetadata: jangan panggil notFound() di sana. Di Next.js 14 itu membuat
// halaman 404 tampil kosong. Kembalikan null saja, biarkan page yang memanggil notFound().
async function peek<T>(path: string): Promise<T | null> {
  const res = await fetchDetail(path);
  return res.ok ? (res.data.data as T) : null;
}

const packagePath = (slug: string) => `/catering-package/${encodeURIComponent(slug)}`;
const categoryPath = (slug: string) => `/category/${encodeURIComponent(slug)}`;

export const getPackageDetail = (slug: string) => detail<TPackageDetails>(packagePath(slug));
export const findPackageDetail = (slug: string) => peek<TPackageDetails>(packagePath(slug));
export const getCategoryDetail = (slug: string) => detail<TCategory>(categoryPath(slug));
export const findCategoryDetail = (slug: string) => peek<TCategory>(categoryPath(slug));
