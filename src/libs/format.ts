const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

// 3500000 → "Rp 3.500.000"
export function formatRupiah(value: number) {
  return rupiah.format(value);
}
