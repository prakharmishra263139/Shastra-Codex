import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { allEntries, navTree } from "@/content";
import { toBrowseItems } from "@/lib/browse";
import { AppHeader } from "@/components/nav/app-header";
import { SidebarNav } from "@/components/nav/sidebar-nav";
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
    default: "Shastra Codex",
    template: "%s · Shastra Codex",
  },
  description:
    "A browsable, comparable reference of Indian defence equipment for SSB aspirants.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const tree = navTree();
  const items = toBrowseItems(allEntries);

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppHeader tree={tree} items={items} />

        <div className="mx-auto flex w-full max-w-[1400px] flex-1">
          <SidebarNav tree={tree} />
          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <footer className="border-t border-rule mt-16">
          <div className="mx-auto max-w-[1400px] px-6 py-8 font-mono text-[11px] text-ink-3 leading-relaxed">
            <p>
              Compiled from publicly available sources. Every figure carries a
              confidence marker and a verification date.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
