import { ReactNode } from "react";
import { cn } from "@/libs/cn";

type Props = { variant?: "error" | "success"; children: ReactNode };

export default function FormAlert({ variant = "error", children }: Props) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn("rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed", variant === "error" ? "bg-bad-tint text-bad" : "bg-good-tint text-good")}
    >
      {children}
    </div>
  );
}