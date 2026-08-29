import Image from "next/image";
import { Wrap } from "@/components/layout/section";

export interface MastheadImage {
  src: string;
  alt: string;
  /** The band shows only a slice of the frame; this picks which slice. */
  position?: string;
}

/**
 * A full-bleed photographic band behind a page title.
 *
 * The scrims use literal `rgb()` rather than a theme token, and the band opts
 * into `on-photo`, so the panel stays dark in both themes — a light-mode scrim
 * over a photograph washes the picture out and takes the title's contrast with
 * it. It pulls up under the sticky header, which is why the content carries a
 * generous top padding.
 */
export function PhotoMasthead({
  image,
  children,
  minHeight = "min-h-[24rem] sm:min-h-[28rem]",
  priority = true,
}: {
  image: MastheadImage;
  children: React.ReactNode;
  minHeight?: string;
  priority?: boolean;
}) {
  return (
    <section
      className={`on-photo relative -mt-16 flex flex-col justify-end overflow-hidden ${minHeight}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="100vw"
        style={{ objectPosition: image.position ?? "50% 50%" }}
        className="object-cover"
      />

      {/* Seat the photograph into the band; guarantee contrast under the title;
          and, below `lg` where the copy runs full width, replace the side
          gradient with a flat wash. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_13_16/0.88)_0%,rgb(10_13_16/0.15)_32%,rgb(10_13_16/0.6)_74%,rgb(10_13_16/0.92)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_13_16/0.88)_0%,rgb(10_13_16/0.45)_50%,transparent_84%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[rgb(10_13_16/0.5)] lg:hidden" />

      <Wrap wide className="relative pb-12 pt-28">
        {children}
      </Wrap>
    </section>
  );
}
