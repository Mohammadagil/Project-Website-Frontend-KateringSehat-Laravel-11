import { ReactNode } from "react";
import { cn } from "@/libs/cn";

export type TBadgeVariant = "neutral" | "accent" | "pending" | "approved" | "rejected";

const variants: Record<TBadgeVariant, string> = {
  neutral: "bg-surface-soft text-ink-soft",
  accent: "bg-accent-tint text-accent-deep",
  pending: "bg-warn-tint text-warn",
  approved: "bg-good-tint text-good",
  rejected: "bg-bad-tint text-bad",
};

export default function Badge({ variant = "neutral", className, children }: { variant?: TBadgeVariant; className?: string; children: ReactNode }) {
  return <span className={cn("inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold", variants[variant], className)}>{children}</span>;
}
