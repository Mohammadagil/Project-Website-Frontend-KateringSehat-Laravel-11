import { cn } from "@/libs/cn";

type MarkProps = {
  className?: string;
  // Warna garis kilau di mangkuk; samakan dengan warna latar di belakang logo.
  shineClassName?: string;
};

export function LogoMark({ className = "h-8 w-8", shineClassName = "stroke-surface" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path d="M32 33C30 21 36 11 49 7C51 19 45 29 32 33Z" className="fill-leaf" />
      <path d="M32 33C28 25 22 21 13 21C14 29 21 34 32 33Z" className="fill-leaf-light" />
      <path d="M6 32H58C58 46.4 46.4 56 32 56C17.6 56 6 46.4 6 32Z" className="fill-accent" />
      <path d="M23 60H41" className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
      <path d="M14 40C17 46 23 50 30 51" className={shineClassName} strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  shineClassName?: string;
};

export default function Logo({ className, markClassName = "h-8 w-8", textClassName = "text-lg", shineClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} shineClassName={shineClassName} />
      <span className={cn("translate-y-[0.20em] font-display font-bold tracking-tight text-ink", textClassName)}>katering sehat</span>
    </span>
  );
}
