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
          className="hover:text-accent transition-colors"
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

/** Lead image on an entry page. Sits between the hero text and the headline stats. */
export function HeroImage({ image }: { image: ImageRef }) {
  return (
    <figure>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-rule bg-surface-2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1088px"
          className="object-cover"
        />
      </div>
      <figcaption>
        <Credit image={image} />
      </figcaption>
    </figure>
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

/** Small thumbnail used on browse cards. */
export function CardThumbnail({ image }: { image: ImageRef }) {
  return (
    <div className="relative -mx-5 -mt-5 mb-1 aspect-[16/9] overflow-hidden rounded-t-md border-b border-rule bg-surface-2">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
