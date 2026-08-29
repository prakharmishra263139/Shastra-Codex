import type { NextConfig } from "next";

/**
 * GitHub Pages cannot run a Node server and serves this repository from a
 * sub-path, so the Pages build is a static export rather than the normal
 * server build.
 *
 * Every difference is gated behind GITHUB_PAGES, which only the deploy
 * workflow sets. `next dev` and `next start` locally are untouched — otherwise
 * every local URL would gain a /Shastra-Codex prefix and stop matching what
 * the site actually looks like in production on a real host.
 */
const isPages = process.env.GITHUB_PAGES === "true";

/** The repository name; Pages serves the site from this sub-path. */
const REPO = "/Shastra-Codex";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath: REPO,
      // Exposed to the image loader, which has to prepend the sub-path itself.
      env: { NEXT_PUBLIC_BASE_PATH: REPO },
      // Pages has no image optimiser, so a custom loader stands in for it. It
      // returns the original file with the sub-path prepended; `unoptimized`
      // is deliberately not set, because that bypasses the loader entirely and
      // would drop the prefix again.
      images: {
        loader: "custom",
        loaderFile: "./image-loader.ts",
      },
      // Emit `/browse/index.html` rather than `/browse.html`, which is what a
      // plain static file server resolves cleanly.
      trailingSlash: true,
    }
  : {};

export default nextConfig;
