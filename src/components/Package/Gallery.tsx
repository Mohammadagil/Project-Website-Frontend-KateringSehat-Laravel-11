"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/libs/cn";

// Foto utama + deretan thumbnail. Klik thumbnail untuk mengganti foto utama.
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[4/3] rounded-[24px] border border-line bg-surface-soft" />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-line bg-surface-soft">
        <Image src={images[index]} alt={alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Lihat foto ${i + 1} dari ${images.length}`}
              aria-pressed={i === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[14px] border-2 bg-surface-soft transition",
                i === index ? "border-accent" : "border-transparent opacity-75 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 140px, 25vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
