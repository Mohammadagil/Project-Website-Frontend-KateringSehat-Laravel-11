// Sama dengan perhitungan backend (CateringSubscriptionController@store): harga tier + PPN 11%, ongkir gratis.
export const TAX_RATE = 0.11;

export function priceSummary(price: number) {
  const tax = Math.round(price * TAX_RATE);
  return { price, tax, total: price + tax };
}
