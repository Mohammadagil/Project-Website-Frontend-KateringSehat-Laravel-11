# Katering Sehat — Frontend

Aplikasi web customer untuk platform KateringSehat, layanan katering makanan sehat berbasis langganan (subscription). Customer bisa menjelajah paket katering per kategori dan kota, memilih tier langganan, mengisi data pengiriman, mengunggah bukti pembayaran, lalu memantau status pesanannya.

Dibangun dengan Next.js (App Router) dan Tailwind CSS, dengan tampilan mobile-first. Semua data diambil dari REST API di repo `kateringsehatbackend` (Laravel).

## Tech Stack

- Next.js 14 (App Router, Server Components, Server Actions)
- React 18 + TypeScript
- Tailwind CSS 3
- `@svgr/webpack` — import file SVG sebagai komponen React
- Swiper — slider kategori, paket, dan testimoni
- `@uidotdev/usehooks` — `useLocalStorage` untuk menyimpan data checkout antar-langkah
- `react-toastify` — notifikasi error/sukses
- `nextjs-toploader` / `next-nprogress-bar` — progress bar saat navigasi
- `date-fns` — format tanggal

## Fitur

- **Homepage** — slider kategori, daftar paket katering, dan testimoni customer
- **Halaman kategori** — daftar paket per kategori, dengan filter kota lewat modal
- **Detail paket** — foto, deskripsi, dapur (kitchen), bonus, dan testimoni paket
- **Pilih tier** — pilihan tier langganan (durasi, porsi, harga, benefit), detail tier tampil dalam modal
- **Checkout 3 langkah** — informasi customer → alamat pengiriman → pembayaran (upload bukti transfer BCA/Mandiri)
- **Halaman sukses** — menampilkan `booking_trx_id` setelah booking berhasil dibuat
- **Cek pesanan** — cari pesanan pakai nomor telepon + `booking_trx_id`, lihat status, dan unggah ulang bukti pembayaran kalau booking ditolak admin

## Struktur Folder

```
src/
├── app/                          # Routing (App Router)
│   ├── page.tsx                  # Homepage
│   ├── @modal/                   # Parallel route untuk modal (dikontrol lewat query ?modal=...)
│   ├── categories/[categorySlug]/
│   ├── packages/[packageSlug]/
│   │   ├── tiers/                # Pilih tier
│   │   ├── informations/         # Checkout langkah 1
│   │   ├── shipping/             # Checkout langkah 2
│   │   ├── payments/             # Checkout langkah 3
│   │   └── success/
│   └── orders/                   # Cek pesanan + detail + resubmit bukti bayar
├── components/                   # Komponen UI per domain (Categories, Packages, Tiers, ...)
│   └── <Domain>/actions.ts       # Server Actions untuk fetch/submit ke API backend
├── assets/                       # CSS global & ikon SVG
└── libs/                         # Helper (format ribuan, query params)
```

Tiap domain di `components/` punya `types.d.ts` untuk tipe data dari API dan `actions.ts` (`"use server"`) untuk memanggil backend. Semua request ke API dijalankan dari sisi server, jadi alamat backend tidak perlu diekspos ke browser.

## Menjalankan Project dari Awal

### Prasyarat

- Node.js 18 (lihat `.nvmrc`) + npm
- Backend `kateringsehatbackend` sudah jalan dan bisa diakses. Ikuti README di repo backend untuk setup-nya. Dengan Laravel Herd, backend otomatis ter-serve di `http://kateringsehatbackend.test`.

### Instalasi

```bash
# 1. Install dependency
npm install

# 2. Buat file environment
#    (Windows PowerShell: New-Item .env)
touch .env
```

### Konfigurasi `.env`

```
HOST_API=http://kateringsehatbackend.test
NEXT_PUBLIC_HOST_API=http://kateringsehatbackend.test
```

- `HOST_API` — base URL backend, dipakai oleh Server Actions untuk memanggil API.
- `NEXT_PUBLIC_HOST_API` — base URL yang sama, versi yang bisa dibaca di browser. Saat ini belum dipakai di kode, disiapkan kalau nanti ada request dari Client Component.

Kalau backend tidak jalan di `kateringsehatbackend.test` (misalnya pakai `php artisan serve` di `http://127.0.0.1:8000`), ubah kedua nilai di atas **dan** tambahkan hostname-nya ke `images.remotePatterns` di `next.config.mjs`. Tanpa itu, komponen `next/image` akan menolak memuat foto dari backend.

### Menjalankan server development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Pastikan data (kategori, kota, paket, tier) sudah diisi lewat panel admin backend (`/admin`), karena homepage kosong kalau database backend masih kosong.

### Build production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Alur Penggunaan (Customer)

1. Buka homepage, pilih kategori atau langsung pilih paket katering.
2. Di halaman kategori, gunakan filter kota untuk mempersempit pilihan paket.
3. Buka detail paket, lalu klik untuk memilih **tier** langganan.
4. **Informations** — isi nama, email, telepon, dan tanggal mulai langganan.
5. **Shipping** — isi alamat, kode pos, dan catatan pengiriman.
6. **Payments** — transfer ke rekening yang tertera, lalu unggah foto bukti transfer (JPG/PNG, maks. 2 MB).
7. Setelah submit, catat **Booking Transaction ID** yang muncul di halaman sukses.
8. Pantau status pesanan di menu **Orders** pakai nomor telepon + Booking Transaction ID. Kalau pembayaran ditolak admin, alasan penolakan tampil di sana dan bukti pembayaran bisa diunggah ulang.

Data dari langkah 4–5 disimpan sementara di `localStorage` (key `checkout`), lalu digabung dan dikirim sekaligus ke endpoint `POST /api/booking-transaction` di langkah 6.

## Alur Pembuatan Project

Urutan pengerjaan dari awal sampai kondisi terkini:

1. **Inisialisasi** — project dibuat dengan `create-next-app`, lalu disiapkan Tailwind CSS, konfigurasi `@svgr/webpack` untuk ikon SVG, font, dan aset gambar.
2. **Homepage** — layout mobile-first, header, bottom bar, slider kategori/paket/testimoni dengan Swiper, dan Server Actions pertama untuk fetch data dari API backend.
3. **Halaman kategori & detail paket** — routing dinamis `categories/[categorySlug]` dan `packages/[packageSlug]`, modal filter kota memakai parallel route `@modal` yang dikontrol lewat query string.
4. **Halaman tier** — daftar tier per paket beserta modal detail benefit tiap tier.
5. **Halaman informations** — langkah pertama checkout, dengan validasi field lewat Server Action dan penyimpanan data ke `localStorage`.
6. **Shipping, payments, success, dan cek pesanan** — melengkapi alur checkout sampai upload bukti pembayaran, halaman sukses dengan `booking_trx_id`, serta halaman pencarian dan detail pesanan.
7. **Resubmit bukti pembayaran** (sedang dikerjakan) — form unggah ulang bukti bayar di halaman detail pesanan untuk booking yang ditolak admin, menampilkan alasan penolakan, dan loader saat form sedang diproses.

## Catatan: Belum Sinkron dengan Backend

Backend sudah berkembang lebih jauh dari frontend. Beberapa hal yang perlu disesuaikan supaya alur booking berjalan end-to-end:

- **Autentikasi belum ada di frontend.** Backend sekarang mewajibkan login (token Sanctum) untuk `booking-transaction`, `resubmit-proof`, dan `my-bookings`. Frontend belum punya halaman register/login dan belum mengirim header `Authorization: Bearer <token>`, jadi submit pembayaran akan ditolak dengan status `401`.
- **Endpoint `check-booking` sudah dihapus di backend.** Halaman Orders masih memanggil `POST /api/check-booking` (cari pesanan pakai telepon + trx ID). Penggantinya di backend adalah `GET /api/my-bookings` dan `GET /api/my-bookings/{bookingTrxId}`, yang butuh login.
- **Belum ada halaman profil / lupa password**, padahal endpoint-nya (`/api/profile`, `/api/forgot-password`, `/api/reset-password`) sudah tersedia di backend. Link reset password dari email backend mengarah ke `FRONTEND_URL`, jadi frontend perlu menyediakan halaman untuk menerimanya.

Daftar lengkap endpoint ada di README repo `kateringsehatbackend`.
