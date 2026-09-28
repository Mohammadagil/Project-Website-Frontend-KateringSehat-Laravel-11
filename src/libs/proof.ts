// Aturan file bukti bayar, sama dengan backend: mimes:jpg,jpeg,png | max:2048 (KB).
// Dipakai di browser (cek cepat sebelum kirim) dan di Server Action (cek ulang).
export const PROOF_TYPES = ["image/jpeg", "image/png"];
export const PROOF_MAX_BYTES = 2 * 1024 * 1024;

export function validateProof(value: FormDataEntryValue | File | null | undefined): string | null {
  if (!value || typeof value === "string" || value.size === 0) return "Unggah foto bukti transfer.";
  if (!PROOF_TYPES.includes(value.type)) return "Format file harus JPG atau PNG.";
  if (value.size > PROOF_MAX_BYTES) return "Ukuran file maksimal 2 MB.";
  return null;
}
