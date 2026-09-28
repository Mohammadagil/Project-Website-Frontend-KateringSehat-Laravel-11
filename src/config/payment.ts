// Rekening tujuan transfer. Backend belum punya data rekening, jadi disimpan di sini
// (nilai diambil dari frontend lama). GANTI dengan rekening resmi sebelum aplikasi dipakai sungguhan.
export const BANK_ACCOUNTS = [
  { bank: "BCA", holder: "Angga Katerina Kitchen", number: "8008129839" },
  { bank: "Mandiri", holder: "Angga Katerina Kitchen", number: "12379834983281" },
] as const;

export type TBankName = (typeof BANK_ACCOUNTS)[number]["bank"];
