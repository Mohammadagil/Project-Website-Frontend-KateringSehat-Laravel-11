// Backend memakai APP_LOCALE=en, jadi pesan validasi Laravel berbahasa Inggris.
// Di sini pesan yang umum muncul diterjemahkan; yang tidak dikenali ditampilkan apa adanya.
const rules: Array<[RegExp, string | ((m: RegExpMatchArray) => string)]> = [
  [/credentials are incorrect/i, "Email atau password salah."],
  [/field is required/i, "Wajib diisi."],
  [/has already been taken/i, "Sudah terdaftar, gunakan yang lain."],
  [/must be a valid email address/i, "Format email tidak valid."],
  [/must be at least (\d+) characters/i, (m) => `Minimal ${m[1]} karakter.`],
  [/confirmation does not match/i, "Konfirmasi password tidak sama."],
  [/password is incorrect/i, "Password saat ini salah."],
  [/reset token is invalid/i, "Link reset sudah tidak berlaku. Minta link baru."],
  [/can't find a user with that email/i, "Email tidak terdaftar."],
  [/please wait before retrying/i, "Tunggu sebentar sebelum mencoba lagi."],
  [/must be a file of type/i, "Format file harus JPG atau PNG."],
  [/must not be greater than 2048 kilobytes/i, "Ukuran file maksimal 2 MB."],
  [/must be a valid date/i, "Tanggal tidak valid."],
  [/already have an active booking/i, "Kamu sudah punya pesanan paket & tier ini di rentang tanggal yang sama. Pilih tanggal mulai lain."],
  [/tier package not found/i, "Tier yang dipilih sudah tidak tersedia. Pilih tier lain."],
  [/catering package not found/i, "Paket sudah tidak tersedia."],
  [/booking not found/i, "Pesanan tidak ditemukan."],
  [/not in a rejected state/i, "Pesanan ini tidak sedang ditolak, jadi bukti bayar tidak perlu dikirim ulang."],
];

export function translateError(message: string): string {
  for (const [pattern, result] of rules) {
    const match = message.match(pattern);
    if (match) return typeof result === "function" ? result(match) : result;
  }
  return message;
}