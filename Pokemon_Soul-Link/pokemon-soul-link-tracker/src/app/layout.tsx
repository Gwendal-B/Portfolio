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
      <body className="relative min-h-full overflow-x-hidden bg-[#050816] text-white">
        {/* 🌌 Fond premium dark */}
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]" />
          <div className="absolute top-[10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[140px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-zinc-950/50" />

          <div className="absolute top-[20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
          <div className="absolute bottom-[-15%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
        </div>

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