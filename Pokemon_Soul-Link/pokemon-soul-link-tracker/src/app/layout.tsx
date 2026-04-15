import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéChallenge Tracker",
  description: "Suis tes challenges Pokémon simplement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-zinc-950 text-white">
        {/* 🎥 Vidéo de fond */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="fixed inset-0 -z-20 hidden h-full w-full object-cover opacity-30 md:block"
        >
          <source src="/videos/pokemon-bg.mp4" type="video/mp4" />
          Ton navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* 🌑 Overlay sombre pour la lisibilité */}
        <div className="fixed inset-0 -z-10 bg-black/15" />

        {/* 📌 Contenu global */}
        <div className="relative z-10 flex min-h-screen flex-col">
          
          {/* 🔝 Navbar */}
          <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-white"
              >
                PokéChallenge Tracker
              </Link>

              <div className="flex items-center gap-6 text-sm text-zinc-400">
                <Link href="/" className="hover:text-white transition">
                  Accueil
                </Link>
                <Link href="/rules" className="hover:text-white transition">
                  Règles
                </Link>
                <Link href="/pokedex" className="hover:text-white transition">
                  Pokédex
                </Link>
                <Link
                  href="/tracker/new"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  Nouvelle run
                </Link>
              </div>
            </nav>
          </header>

          {/* 📄 Contenu des pages */}
          <main className="flex-1">{children}</main>

          {/* 🔻 Footer */}
          <footer className="border-t border-zinc-800 bg-zinc-950/80 py-4 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} PokéChallenge Tracker — Projet fan-made
          </footer>
        </div>
      </body>
    </html>
  );
}