"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/libs/cn";

type TTab = { id: string; label: string; content: ReactNode };

// Tab Deskripsi / Bonus / Testimoni. Isi tiap tab dirender di server lalu dikirim sebagai props.
export default function DetailTabs({ tabs }: { tabs: TTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <section className="flex flex-col gap-6">
      <div role="tablist" aria-label="Informasi paket" className="flex gap-7 overflow-x-auto border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-[2.5px] px-1 pb-3 pt-2 text-[15px] font-bold transition",
              active === tab.id ? "border-accent text-accent-deep" : "border-transparent text-ink-faint hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} hidden={active !== tab.id}>
          {tab.content}
        </div>
      ))}
    </section>
  );
}
