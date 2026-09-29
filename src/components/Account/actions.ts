"use server";

import { apiFetch } from "@/libs/api";
import { redirectSessionExpired } from "@/libs/auth-guard";
import { TSessionUser, updateSessionUser } from "@/libs/session";

export type TAccountState = {
  message?: string;
  errors?: Record<string, string>;
  success?: boolean;
  // Berubah setiap kali berhasil; dipakai form untuk mengosongkan isian.
  savedAt?: number;
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateProfileAction(_prev: TAccountState, formData: FormData): Promise<TAccountState> {
  const name = text(formData, "name");
  const email = text(formData, "email");
  const phone = text(formData, "phone");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Nama wajib diisi.";
  if (!email) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email tidak valid.";
  if (!phone) errors.phone = "No. HP wajib diisi.";
  if (Object.keys(errors).length > 0) return { errors };

  const res = await apiFetch<{ data: TSessionUser }>("/profile", { method: "PUT", body: { name, email, phone }, auth: true });

  if (!res.ok) {
    if (res.status === 401) redirectSessionExpired("/account");
    return { message: res.message, errors: res.errors };
  }

  // Mengubah cookie di Server Action membuat Next.js memuat ulang halaman, jadi header ikut menampilkan nama baru.
  updateSessionUser(res.data.data);
  return { success: true, message: "Profil berhasil disimpan.", savedAt: Date.now() };
}

export async function updatePasswordAction(_prev: TAccountState, formData: FormData): Promise<TAccountState> {
  const current_password = String(formData.get("current_password") ?? "");
  const password = String(formData.get("password") ?? "");
  const password_confirmation = String(formData.get("password_confirmation") ?? "");

  const errors: Record<string, string> = {};
  if (!current_password) errors.current_password = "Masukkan password saat ini.";
  if (password.length < 8) errors.password = "Password baru minimal 8 karakter.";
  else if (password === current_password) errors.password = "Password baru harus berbeda dari password saat ini.";
  if (password !== password_confirmation) errors.password_confirmation = "Konfirmasi password tidak sama.";
  if (Object.keys(errors).length > 0) return { errors };

  const res = await apiFetch("/profile/password", { method: "PUT", body: { current_password, password, password_confirmation }, auth: true });

  if (!res.ok) {
    if (res.status === 401) redirectSessionExpired("/account");
    return { message: res.message, errors: res.errors };
  }

  return { success: true, message: "Password berhasil diganti. Gunakan password baru saat masuk berikutnya.", savedAt: Date.now() };
}
