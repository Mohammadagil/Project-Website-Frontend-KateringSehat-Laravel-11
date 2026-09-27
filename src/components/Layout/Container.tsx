import { HTMLAttributes } from "react";
import { cn } from "@/libs/cn";

// Pembatas lebar + jarak kiri-kanan yang sama di semua halaman.
// Desktop mengikuti desain: 72px di kiri-kanan pada layar lebar.
export default function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-[72px]", className)} {...props} />;
}