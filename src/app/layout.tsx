import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { allEntries, navTree } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { AppHeader } from "@/components/nav/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Shastra Codex · Indian Defence Equipment & Order of Battle",
    template: "%s · Shastra Codex",
  },
  description:
    "A browsable, comparable reference of Indian defence equipment for SSB aspirants.",
};

/**
 * One header, one footer, and nothing between them. Pages own their own
 * measure — there is no shared content column here, because a full-bleed hero
 * and a spec table want very different widths.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const tree = navTree();
  const items = toBrowseItems(allEntries);

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppHeader tree={tree} items={items} />
        <main className="min-w-0 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
