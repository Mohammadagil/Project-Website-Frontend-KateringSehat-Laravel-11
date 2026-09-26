"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/libs/api";
import { clearSession, setSession, TSessionUser } from "@/libs/session";
import { setFlash } from "@/libs/flash-server";

export type TFormState = {
  message?: string;
  errors?: Record<string, string>;
  success?: boolean;
};

type TAuthResponse = { user: TSessionUser; token: string };

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

// Hanya izinkan redirect ke halaman di situs ini (cegah open redirect ke situs lain).
function safeNext(formData: FormData) {
  const next = text(formData, "next");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function loginAction(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Email wajib diisi.";
  if (!password) errors.password = "Password wajib diisi.";
  if (Object.keys(errors).length > 0) return { errors };

  const res = await apiFetch<TAuthResponse>("/login", { method: "POST", body: { email, password } });
  if (!res.ok) return { message: res.message, errors: res.errors };

  setSession(res.data.token, res.data.user);
  setFlash("logged-in");
  redirect(safeNext(formData));
}

export async function registerAction(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const name = text(formData, "name");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const password = String(formData.get("password") ?? "");
  const password_confirmation = String(formData.get("password_confirmation") ?? "");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Nama wajib diisi.";
  if (!email) errors.email = "Email wajib diisi.";
  if (!phone) errors.phone = "No. HP wajib diisi.";
  if (password.length < 8) errors.password = "Password minimal 8 karakter.";
  if (password !== password_confirmation) errors.password_confirmation = "Konfirmasi password tidak sama.";
  if (Object.keys(errors).length > 0) return { errors };

  const res = await apiFetch<TAuthResponse>("/register", {
    method: "POST",
    body: { name, email, phone, password, password_confirmation },
  });
  if (!res.ok) return { message: res.message, errors: res.errors };

  setSession(res.data.token, res.data.user);
  setFlash("registered");
  redirect(safeNext(formData));
}

export async function logoutAction() {
  // Hapus token di backend juga. Kalau gagal (mis. token sudah kedaluwarsa), tetap lanjut keluar.
  await apiFetch("/logout", { method: "POST", auth: true });
  clearSession();
  setFlash("logged-out");
  redirect("/login");
}

export async function forgotPasswordAction(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const email = text(formData, "email");
  if (!email) return { errors: { email: "Email wajib diisi." } };

  const res = await apiFetch("/forgot-password", { method: "POST", body: { email } });
  if (!res.ok) return { message: res.message, errors: res.errors };

  return { success: true };
}

export async function resetPasswordAction(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const token = text(formData, "token");
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const password_confirmation = String(formData.get("password_confirmation") ?? "");

  const errors: Record<string, string> = {};
  if (password.length < 8) errors.password = "Password minimal 8 karakter.";
  if (password !== password_confirmation) errors.password_confirmation = "Konfirmasi password tidak sama.";
  if (Object.keys(errors).length > 0) return { errors };

  const res = await apiFetch("/reset-password", {
    method: "POST",
    body: { token, email, password, password_confirmation },
  });
  if (!res.ok) return { message: res.message, errors: res.errors };

  redirect("/login?reset=1");
}