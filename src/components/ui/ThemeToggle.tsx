"use client";

import { applyTheme, getCurrentTheme } from "@/libs/theme";
import { cn } from "@/libs/cn";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export default function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => applyTheme(getCurrentTheme() === "dark" ? "light" : "dark")}
      aria-label="Ganti mode terang/gelap"
      title="Ganti mode terang/gelap"
      className={cn(
        "inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line bg-card text-ink transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      {/* Ikon dipilih lewat CSS (class `dark`), jadi tidak ada beda tampilan server vs browser. */}
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
