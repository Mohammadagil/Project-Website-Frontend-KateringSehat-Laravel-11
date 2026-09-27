import Image from "next/image";
import Link from "next/link";
import { TTestimonial } from "@/components/Testimonials/types";
import Avatar from "@/components/ui/Avatar";
import { mediaUrl } from "@/libs/media";

export default function TestimonialCard({ testimonial }: { testimonial: TTestimonial }) {
  const photo = mediaUrl(testimonial.photo);
  const pkg = testimonial.cateringPackage;

  return (
    <figure className="flex h-full flex-col gap-4 rounded-[18px] border border-line bg-card p-5 lg:p-6">
      <span aria-hidden="true" className="font-display text-4xl font-extrabold leading-none text-accent">
        &ldquo;
      </span>
      <blockquote className="flex-1 text-[14.5px] leading-relaxed">{testimonial.message}</blockquote>
      <figcaption className="flex items-center gap-3">
        {photo ? (
          <span className="relative h-10 w-10 flex-none overflow-hidden rounded-full bg-surface-soft">
            <Image src={photo} alt="" fill sizes="40px" className="object-cover" />
          </span>
        ) : (
          <Avatar name={testimonial.name} className="h-10 w-10" />
        )}
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold">{testimonial.name}</span>
          {pkg && (
            <Link href={`/packages/${pkg.slug}`} className="truncate text-[13px] text-ink-soft transition hover:text-accent">
              {pkg.name}
            </Link>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
