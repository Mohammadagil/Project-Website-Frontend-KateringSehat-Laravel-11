const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

// 3500000 → "Rp 3.500.000"
export function formatRupiah(value: number) {
  return rupiah.format(value);
}

// "2026-09-28" atau "2026-09-28T00:00:00.000000Z" → Date lokal.
// Hanya bagian tanggal yang dipakai, supaya tidak bergeser sehari karena zona waktu.
export function parseDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Date → "2026-09-28" (format <input type="date">)
export function toDateInput(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Sama dengan backend: ended_at = started_at + durasi (hari).
export function addDays(value: string, days: number) {
  const date = parseDate(value);
  date.setDate(date.getDate() + days);
  return toDateInput(date);
}

const shortDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });

// "2026-09-28" → "28 Sep 2026"
export function formatDate(value: string) {
  return shortDate.format(parseDate(value));
}

// Tanggal hari ini di Indonesia (WIB), format "2026-09-28". Dipakai untuk batas minimal tanggal mulai.
export function todayInJakarta() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
}
