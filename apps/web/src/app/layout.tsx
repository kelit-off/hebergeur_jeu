import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenith — Hébergement de serveurs de jeu Pterodactyl",
  description:
    "Déployez Minecraft, Rust, Palworld ou un bot Discord en un clic. Panel Pterodactyl, stockage NVMe, anti-DDoS et support 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Phosphor icons — used across the panel and site chrome */}
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
