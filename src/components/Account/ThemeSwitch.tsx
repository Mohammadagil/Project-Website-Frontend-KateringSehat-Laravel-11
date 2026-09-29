"use client";

import { useSyncExternalStore } from "react";
import { applyTheme } from "@/libs/theme";
import { cn } from "@/libs/cn";

// Pantau class "dark" di <html>, supaya saklar ini selalu sama dengan tombol tema di header.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");
const isDarkOnServer = () => false;

export default function ThemeSwitch({ labelledBy }: { labelledBy: string }) {
  const dark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-labelledby={labelledBy}
      onClick={() => applyTheme(dark ? "light" : "dark")}
      className={cn(
        "flex h-8 w-[52px] flex-none items-center rounded-full p-[3px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        dark ? "justify-end bg-primary" : "justify-start bg-line",
      )}
    >
      <span className="h-[26px] w-[26px] rounded-full bg-white shadow-sm" />
    </button>
  );
}
