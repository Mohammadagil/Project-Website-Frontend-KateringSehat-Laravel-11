// Layout sementara untuk halaman desain lama (khusus mobile, lebar maks. 384px).
// Hapus folder (legacy) setelah semua halaman pindah ke desain baru.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative bg-white text-color4">{children}</main>;
}
