import { getToken } from "@/libs/session";
import { translateError } from "@/libs/translate-error";

type TApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  // FormData untuk upload file, objek biasa dikirim sebagai JSON.
  // Catatan: PHP tidak membaca FormData pada PUT, jadi PUT selalu pakai objek (JSON).
  body?: FormData | Record<string, unknown>;
  // true = sertakan token login (untuk endpoint auth:sanctum)
  auth?: boolean;
};

export type TApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string; errors: Record<string, string> };

// Semua pemanggilan API Laravel lewat fungsi ini, dan hanya dijalankan di server.
export async function apiFetch<T = unknown>(path: string, { method = "GET", body, auth = false }: TApiOptions = {}): Promise<TApiResult<T>> {
  const headers: Record<string, string> = { Accept: "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(`${process.env.HOST_API}/api${path}`, { method, headers, body: payload, cache: "no-store" });
  } catch {
    return { ok: false, status: 0, message: "Tidak bisa terhubung ke server. Coba lagi sebentar.", errors: {} };
  }

  const json = await res.json().catch(() => null);

  if (res.ok) {
    return { ok: true, status: res.status, data: json as T };
  }

  const errors = firstErrors(json?.errors);
  return { ok: false, status: res.status, message: errorMessage(res.status, json?.message, errors), errors };
}

// Laravel mengirim { errors: { email: ["pesan 1", "pesan 2"] } } → ambil pesan pertama per field.
function firstErrors(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object") return {};
  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(raw as Record<string, string[]>)) {
    if (Array.isArray(messages) && messages[0]) result[field] = translateError(messages[0]);
  }
  return result;
}

function errorMessage(status: number, message: unknown, errors: Record<string, string>): string {
  if (status === 401) return "Sesi kamu sudah berakhir. Silakan masuk lagi.";
  if (status === 429) return "Terlalu banyak percobaan. Tunggu 1 menit lalu coba lagi.";
  if (status >= 500) return "Terjadi kesalahan di server. Coba lagi nanti.";
  if (Object.keys(errors).length > 0) return "Periksa kembali isian yang ditandai.";
  return typeof message === "string" && message ? translateError(message) : "Permintaan gagal diproses.";
}