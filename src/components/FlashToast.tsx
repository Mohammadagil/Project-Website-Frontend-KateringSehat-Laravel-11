"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { FLASH_COOKIE, FLASH_MESSAGES, TFlash } from "@/libs/flash";

// Membaca flash message dari cookie setiap pindah halaman, menampilkannya sebagai toast, lalu menghapusnya.
export default function FlashToast() {
  const pathname = usePathname();

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${FLASH_COOKIE}=([^;]+)`));
    if (!match) return;

    document.cookie = `${FLASH_COOKIE}=; path=/; max-age=0`;

    const message = FLASH_MESSAGES[match[1] as TFlash];
    if (message) toast.success(message);
  }, [pathname]);

  return null;
}
