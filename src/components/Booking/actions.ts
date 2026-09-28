"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/libs/api";
import { redirectSessionExpired } from "@/libs/auth-guard";
import { validateProof } from "@/libs/proof";
import { todayInJakarta } from "@/libs/format";
import { TBookingDetails } from "@/components/Packages/types";

export type TBookingState = {
  message?: string;
  errors?: Record<string, string>;
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createBookingAction(_prev: TBookingState, formData: FormData): Promise<TBookingState> {
  const slug = text(formData, "slug");
  const packageId = text(formData, "catering_package_id");
  const tierId = text(formData, "catering_tier_id");
  const startedAt = text(formData, "started_at");
  const address = text(formData, "address");
  const postCode = text(formData, "post_code");
  const notes = text(formData, "notes");
  const proof = formData.get("proof");

  // Cek ulang di server: isian dari browser tidak boleh dipercaya begitu saja.
  const errors: Record<string, string> = {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startedAt)) errors.started_at = "Pilih tanggal mulai.";
  else if (startedAt < todayInJakarta()) errors.started_at = "Tanggal mulai tidak boleh sebelum hari ini.";
  if (!address) errors.address = "Alamat wajib diisi.";
  if (!/^\d{5}$/.test(postCode)) errors.post_code = "Kode pos harus 5 angka.";
  if (!notes) errors.notes = "Catatan wajib diisi, misalnya patokan rumah.";
  const proofError = validateProof(proof);
  if (proofError) errors.proof = proofError;
  if (Object.keys(errors).length > 0) return { message: "Periksa kembali isian yang ditandai.", errors };

  const body = new FormData();
  body.append("catering_package_id", packageId);
  body.append("catering_tier_id", tierId);
  body.append("started_at", startedAt);
  body.append("address", address);
  body.append("post_code", postCode);
  body.append("notes", notes);
  body.append("proof", proof as File);

  const res = await apiFetch<{ data: TBookingDetails }>("/booking-transaction", { method: "POST", body, auth: true });

  if (!res.ok) {
    if (res.status === 401) redirectSessionExpired(`/packages/${slug}/booking?tier=${tierId}`);
    return { message: res.message, errors: res.errors };
  }

  redirect(`/orders/${encodeURIComponent(res.data.data.booking_trx_id)}/success`);
}
