import { cn } from "@/libs/cn";

export function initials(name:string) {
    return (
        name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("") || "?"
    );
}

export default function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent-tint text-[13px] font-extrabold text-accent-deep", className)}
    >
      {initials(name)}
    </span>
  );
}