import { ReactNode } from "react";
import { cn } from "@/libs/cn";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

// Pengganti daftar yang kosong atau gagal dimuat.
export default function EmptyState({ title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-line px-6 py-10 text-center", className)}>
      <p className="font-display text-lg font-bold">{title}</p>
      {description && <p className="max-w-md text-sm leading-relaxed text-ink-soft">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
