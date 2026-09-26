import { cookies } from "next/headers";
import { FLASH_COOKIE, TFlash } from "@/libs/flash";

// Dipanggil dari Server Action sebelum redirect.
export function setFlash(type: TFlash) {
  // Sengaja TIDAK httpOnly: browser perlu membaca lalu menghapusnya. Isinya bukan data rahasia.
  cookies().set(FLASH_COOKIE, type, { path: "/", maxAge: 30, sameSite: "lax" });
}
