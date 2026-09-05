import Image from "next/image";
import type { Entry } from "@/content/schema";

type ImageRef = Entry["images"][number];

function Credit({ image }: { image: ImageRef }) {
  return (
    <p className="mt-2 font-mono text-[10.5px] text-ink-3 leading-relaxed">
      {image.sourceUrl ? (
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 ease-soft hover:text-accent"
        >
          {image.credit}
        </a>
      ) : (
        image.credit
      )}
      <span className="mx-1.5 text-rule" aria-hidden>
        ·
      </span>
      {image.license}
    </p>
  );
}

/** Everything after the lead image. */
export function ImageGallery({ images }: { images: ImageRef[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-rule bg-surface-2">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{image.alt}</p>
            <Credit image={image} />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Small thumbnail used on browse cards. Credit lives on the entry page.
 * The card owns the rounding and the border; this only fills its slot.
 */
export function CardThumbnail({ image }: { image: Pick<ImageRef, "src"> }) {
  return (
    <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-rule bg-surface-2">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
      />
    </div>
  );
}

/**
 * Stand-in for a card whose entry has no photograph yet.
 *
 * It fills exactly the slot a thumbnail would, because a grid mixing cards
 * that have a picture with cards that do not leaves a hole in the middle of
 * every second card. Deliberately a drawing rather than a stock photograph:
 * the site does not put a picture of the wrong aeroplane on an entry to
 * even the grid up.
 */
export function CardThumbnailPlaceholder() {
  return (
    <div
      aria-hidden
      className="blueprint relative flex aspect-[16/9] shrink-0 items-center justify-center overflow-hidden border-b border-rule bg-surface-2/50"
    >
      <svg viewBox="0 0 16 16" fill="none" className="h-7 w-7 opacity-25">
        <path
          d="M8 1.2 14 4v4.6c0 3.2-2.4 5.6-6 6.9-3.6-1.3-6-3.7-6-6.9V4l6-2.8Z"
          stroke="var(--ink-3)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M8 5.2v5.4M5.6 7.6h4.8" stroke="var(--ink-3)" strokeWidth="1.1" />
      </svg>
    </div>
  );
}
