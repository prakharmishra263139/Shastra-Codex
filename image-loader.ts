/**
 * Image loader for the GitHub Pages build.
 *
 * Pages serves the site from a repository sub-path, and Next does not prepend
 * `basePath` to a `next/image` source when there is no optimiser behind it —
 * so every photograph would resolve to /images/... and 404. This prepends the
 * sub-path explicitly.
 *
 * There is no resizing to do: the files in `public/images` are already sized
 * and encoded as webp at build time, so `width` is deliberately ignored and
 * every candidate in the srcset resolves to the same file.
 */
export default function pagesImageLoader({ src }: { src: string }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
