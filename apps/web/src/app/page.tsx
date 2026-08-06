import Link from "next/link";
import { getGames } from "@/lib/games";

const BOOT_LINES = [
  { text: "$ provision --game minecraft-java", tone: "muted" as const },
  { text: "✓ compte authentifié · jwt", tone: "teal" as const },
  { text: "✓ paiement confirmé · stripe", tone: "teal" as const },
  { text: "✓ serveur alloué · node-1 · alloc #482", tone: "teal" as const },
  { text: "✓ egg minecraft-java déployé", tone: "teal" as const },
  { text: "● mon-serveur — RUNNING", tone: "ember" as const },
];

const STEPS = [
  {
    n: "01",
    title: "Choisis ton jeu",
    body: "Minecraft, Valheim, Rust... chaque jeu a ses ressources minimales et son prix affiché clairement, sans surprise.",
  },
  {
    n: "02",
    title: "Paie ton abonnement",
    body: "Paiement mensuel sécurisé par Stripe, directement dans la page — pas de redirection, pas de compte tiers à créer.",
  },
  {
    n: "03",
    title: "Ton serveur est en ligne",
    body: "Dès la confirmation du paiement, le serveur est provisionné automatiquement sur notre infrastructure Pterodactyl.",
  },
];

const FEATURES = [
  {
    title: "Provisioning automatique",
    body: "Aucune intervention manuelle : le serveur est créé sur le panel dès que le paiement est confirmé.",
  },
  {
    title: "Paiement sécurisé",
    body: "Abonnement mensuel géré par Stripe, avec renouvellement et facturation automatiques.",
  },
  {
    title: "Contrôle total",
    body: "Démarre, redémarre ou arrête ton serveur depuis le dashboard, à tout moment.",
  },
  {
    title: "Compte sécurisé",
    body: "Authentification par cookie httpOnly — ton jeton de session n'est jamais exposé au JavaScript.",
  },
  {
    title: "Support par ticket",
    body: "Chaque ticket ouvert notifie notre équipe en temps réel sur Discord.",
  },
  {
    title: "Renouvellement clair",
    body: "Date d'expiration visible sur chaque serveur, sans reconduction surprise.",
  },
];

export default async function Home() {
  const games = await getGames();

  return (
    <div className="flex flex-1 flex-col bg-brand-bg text-brand-text">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-teal">
            <span aria-hidden className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Provisioning automatique · Pterodactyl
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Ton serveur de jeu,
            <br />
            en ligne <span className="text-brand-ember">à la seconde</span> du
            paiement.
          </h1>
          <p className="mt-6 max-w-md text-lg text-brand-muted">
            Choisis un jeu, paie ton abonnement mensuel, et regarde ton
            serveur se provisionner automatiquement — sans ticket, sans
            attente.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/games"
              className="rounded-full bg-brand-ember px-6 py-3 font-semibold text-brand-bg hover:opacity-90"
            >
              Voir les jeux
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-brand-border px-6 py-3 font-semibold text-brand-text hover:border-brand-muted"
            >
              Créer un compte
            </Link>
          </div>
        </div>

        {/* Signature : le "boot log" de provisioning, tel qu'il se produit réellement */}
        <div className="rounded-lg border border-brand-border bg-brand-surface p-6 font-mono text-sm shadow-2xl shadow-black/40">
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
          </div>
          <div className="flex flex-col gap-2">
            {BOOT_LINES.map((line, i) => (
              <p
                key={line.text}
                className={`boot-line ${
                  line.tone === "teal"
                    ? "text-brand-teal"
                    : line.tone === "ember"
                      ? "text-brand-ember"
                      : "text-brand-muted"
                }`}
                style={{ animationDelay: `${i * 0.35 + 0.2}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 font-display text-2xl font-bold tracking-tight">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <p className="mb-3 font-mono text-sm text-brand-ember">
                  {step.n}
                </p>
                <h3 className="mb-2 font-display font-bold">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Jeux disponibles
            </h2>
            <Link
              href="/games"
              className="font-mono text-xs uppercase tracking-wide text-brand-teal hover:underline"
            >
              Tout voir →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {games.slice(0, 3).map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}/checkout`}
                className="flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-surface p-6 transition hover:border-brand-muted"
              >
                <p className="font-display font-bold">
                  {game.name}
                </p>
                <p className="font-mono text-xs text-brand-muted">
                  {game.ramMinGo}GB RAM · {game.cpuMinCores} VCPU ·{" "}
                  {game.diskMinGo}GB DISK
                </p>
                <p className="mt-auto font-mono text-lg text-brand-ember">
                  {game.monthlyPrice}€<span className="text-xs text-brand-muted">/mois</span>
                </p>
              </Link>
            ))}
            {games.length === 0 && (
              <p className="text-sm text-brand-muted">
                Aucun jeu disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 font-display text-2xl font-bold tracking-tight">
            Fait pour durer
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title}>
                <h3 className="mb-2 font-display font-bold">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-muted">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support / CTA finale */}
      <section className="border-t border-brand-border bg-brand-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-2 font-display text-2xl font-bold tracking-tight">
              Prêt à lancer ton serveur ?
            </h2>
            <p className="text-brand-muted">
              Crée ton compte, choisis ton jeu, et joue en quelques minutes.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 rounded-full bg-brand-ember px-6 py-3 font-semibold text-brand-bg hover:opacity-90"
          >
            Créer un compte
          </Link>
        </div>
      </section>
    </div>
  );
}
