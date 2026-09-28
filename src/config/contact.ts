// Nomor WhatsApp customer service dari .env (NEXT_PUBLIC_CS_WHATSAPP), format internasional
// tanpa tanda + (mis. 6281234567890). Kalau kosong, tombol "Hubungi CS" tidak ditampilkan.
export const CS_WHATSAPP = (process.env.NEXT_PUBLIC_CS_WHATSAPP ?? "").replace(/\D/g, "");

export function csWhatsappUrl(message: string) {
  return CS_WHATSAPP ? `https://wa.me/${CS_WHATSAPP}?text=${encodeURIComponent(message)}` : null;
}
