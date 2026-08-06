import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hebergeur Jeu — Serveurs de jeu provisionnés automatiquement",
  description:
    "Choisis un jeu, paie ton abonnement, et ton serveur est provisionné automatiquement sur notre infrastructure Pterodactyl.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <header className="border-b border-brand-border bg-brand-bg text-brand-text">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
            >
              <span
                aria-hidden
                className="status-dot inline-block h-2 w-2 rounded-full bg-brand-ember"
              />
              HEBERGEUR<span className="text-brand-ember">JEU</span>
            </Link>
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wide">
              <Link href="/games" className="text-brand-muted hover:text-brand-text">
                Jeux
              </Link>
              <Link href="/dashboard" className="text-brand-muted hover:text-brand-text">
                Dashboard
              </Link>
              <Link href="/login" className="text-brand-muted hover:text-brand-text">
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-ember px-4 py-1.5 font-semibold text-brand-bg normal-case tracking-normal hover:opacity-90"
              >
                S&apos;inscrire
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-brand-border bg-brand-bg text-brand-text">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display font-bold tracking-tight">
                HEBERGEUR<span className="text-brand-ember">JEU</span>
              </p>
              <p className="mt-2 text-sm text-brand-muted">
                Serveurs de jeu, provisionnés automatiquement.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-brand-muted">
                Produit
              </p>
              <Link href="/games" className="hover:text-brand-ember">
                Jeux
              </Link>
              <Link href="/dashboard" className="hover:text-brand-ember">
                Dashboard
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-brand-muted">
                Compte
              </p>
              <Link href="/login" className="hover:text-brand-ember">
                Connexion
              </Link>
              <Link href="/register" className="hover:text-brand-ember">
                Inscription
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-brand-muted">
                Support
              </p>
              <Link href="/dashboard/support" className="hover:text-brand-ember">
                Ouvrir un ticket
              </Link>
            </div>
          </div>
          <div className="border-t border-brand-border px-6 py-4">
            <p className="mx-auto flex max-w-6xl items-center gap-2 font-mono text-xs uppercase tracking-wide text-brand-muted">
              <span
                aria-hidden
                className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-teal"
              />
              Système opérationnel
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
