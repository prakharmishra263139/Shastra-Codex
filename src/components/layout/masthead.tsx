import Image from "next/image";
import { Wrap } from "@/components/layout/section";
import { SharedPhoto } from "@/components/layout/page-transition";

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
 *
 * Where the band belongs to a service it also takes that service's tone: a
 * fourth scrim tints the photograph towards the service's field colour, and the
 * band closes on a hairline in its line colour. That is what makes an Air Force
 * page recognisable as one from across the room.
 */
export function PhotoMasthead({
  image,
  children,
  force,
  photoName,
  minHeight = "min-h-[24rem] sm:min-h-[28rem]",
  priority = true,
}: {
  image: MastheadImage;
  children: React.ReactNode;
  /** Tones the whole band with that service's pair. */
  force?: string;
  /** Names the photograph so it can travel from the card that was clicked. */
  photoName?: string;
  minHeight?: string;
  priority?: boolean;
}) {
  const photo = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes="100vw"
      style={{ objectPosition: image.position ?? "50% 50%" }}
      className="settle object-cover"
    />
  );

  return (
    <section
      data-force={force}
      className={`on-photo relative -mt-16 flex flex-col justify-end overflow-hidden ${minHeight}`}
    >
      {photoName ? <SharedPhoto name={photoName}>{photo}</SharedPhoto> : photo}

      {/* Seat the photograph into the band; guarantee contrast under the title;
          and, below `lg` where the copy runs full width, replace the side
          gradient with a flat wash. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(8_11_14/0.88)_0%,rgb(8_11_14/0.15)_32%,rgb(8_11_14/0.6)_74%,rgb(8_11_14/0.92)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(8_11_14/0.88)_0%,rgb(8_11_14/0.45)_50%,transparent_84%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[rgb(8_11_14/0.5)] lg:hidden" />

      {/* The service tint, skipped entirely on untoned bands. */}
      {force && <div aria-hidden className="tone-scrim absolute inset-0" />}

      <Wrap wide className="relative pb-12 pt-28">
        {children}
      </Wrap>

      {/* The band closes on its own colour. */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px ${force ? "tone-rule" : "bg-rule"}`}
      />
    </section>
  );
}
