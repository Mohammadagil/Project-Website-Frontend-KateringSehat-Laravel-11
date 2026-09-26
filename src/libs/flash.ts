// Pesan singkat yang ditampilkan sekali setelah redirect (flash message).
// File ini dipakai di server dan browser, jadi jangan import `next/headers` di sini.
export const FLASH_COOKIE = "ks_flash";

export const FLASH_MESSAGES = {
  registered: "Pendaftaran berhasil! Kamu sudah otomatis masuk.",
  "logged-in": "Berhasil masuk. Selamat datang kembali!",
  "logged-out": "Kamu sudah keluar dari akun.",
} as const;

export type TFlash = keyof typeof FLASH_MESSAGES;
