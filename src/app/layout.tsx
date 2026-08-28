import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="h-3.5 w-3.5 rounded-[2px] bg-accent" aria-hidden />
              <span className="font-display font-bold tracking-tight text-[15px]">
                Shastra Codex
              </span>
            </Link>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">
              Defence Equipment Reference
            </span>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-rule mt-16">
          <div className="mx-auto max-w-6xl px-6 py-8 font-mono text-[11px] text-ink-3 leading-relaxed">
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
