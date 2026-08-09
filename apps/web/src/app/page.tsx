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

const STATS = [
  { value: "99,9 %", label: "Disponibilité visée" },
  { value: "< 20 ms", label: "Latence en France" },
  { value: "< 60 s", label: "Provisioning après paiement" },
  { value: "24/7", label: "Support par ticket" },
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

const CAPABILITIES = [
  {
    n: "01",
    title: "Panel Pterodactyl complet",
    body: "Console en temps réel, gestionnaire de fichiers, planificateur de tâches et redémarrage du serveur depuis ton dashboard — tout ce qu'il faut pour piloter ton serveur depuis le navigateur.",
  },
  {
    n: "02",
    title: "Provisioning automatique",
    body: "Aucune intervention manuelle : dès que le paiement Stripe est confirmé, le serveur est créé et démarré sur le panel, sans ticket ni attente.",
  },
  {
    n: "03",
    title: "Paiement mensuel sans engagement",
    body: "Abonnement géré par Stripe, avec renouvellement et facturation automatiques. La date d'expiration reste visible sur chaque serveur, sans reconduction surprise.",
  },
  {
    n: "04",
    title: "Support par ticket",
    body: "Chaque ticket ouvert depuis le dashboard notifie notre équipe en temps réel, et l'historique de la conversation reste consultable à tout moment.",
  },
];

// Localisations à confirmer avec l'infrastructure réelle avant mise en production.
const LOCATIONS = [
  { city: "Paris, France", region: "EU Ouest · GRA", ping: "6 ms" },
  { city: "Roubaix, France", region: "EU Ouest · RBX", ping: "5 ms" },
  { city: "Francfort, Allemagne", region: "EU Centre · FRA", ping: "11 ms" },
  { city: "Londres, Royaume-Uni", region: "EU Ouest · LHR", ping: "9 ms" },
];

// Témoignages illustratifs — à remplacer par de vrais retours clients.
const TESTIMONIALS = [
  {
    quote:
      "Migration de notre serveur Minecraft sans une seconde de coupure. Le panel Pterodactyl est un vrai plaisir à utiliser.",
    name: "Lucas M.",
    role: "Admin — SkyBloc Network",
    initials: "LM",
  },
  {
    quote:
      "Le provisioning automatique change tout : plus besoin d'attendre un ticket pour avoir un serveur qui tourne.",
    name: "Amina K.",
    role: "Développeuse — botfactory.io",
    initials: "AK",
  },
  {
    quote:
      "Serveur Valheim en ligne en quelques minutes pour jouer avec mes amis le soir même. Rapport qualité-prix imbattable.",
    name: "Thomas D.",
    role: "Joueur — communauté privée",
    initials: "TD",
  },
];

// Barres illustratives — à connecter à un vrai monitoring d'infrastructure.
const STATUS_METRICS = [
  { label: "Réseau de jeu", value: "99,9 %", percent: 99.9 },
  { label: "Panel Pterodactyl", value: "100 %", percent: 100 },
  { label: "Paiements Stripe", value: "99,9 %", percent: 99.9 },
];

const FAQ = [
  {
    q: "Qu'est-ce que le panel Pterodactyl ?",
    a: "Pterodactyl est un panneau de contrôle open-source pour gérer ton serveur de jeu depuis le navigateur : console en direct, fichiers, planificateur et redémarrage. Chaque serveur est isolé dans son propre conteneur.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "L'abonnement est mensuel et géré directement sur la page via Stripe, sans redirection ni compte tiers à créer. Le renouvellement est automatique jusqu'à résiliation.",
  },
  {
    q: "Que se passe-t-il si mon abonnement expire ?",
    a: "La date d'expiration est visible sur chaque serveur depuis ton dashboard. Sans renouvellement, le serveur est suspendu — tes données restent conservées pendant une période de grâce avant suppression.",
  },
  {
    q: "Comment fonctionne le support ?",
    a: "Ouvre un ticket depuis ton dashboard : notre équipe est notifiée en temps réel et répond directement dans la conversation, consultable à tout moment.",
  },
];

export default async function Home() {
  const games = await getGames();
  const featuredGames = games.slice(0, 6);

  return (
    <div className="flex flex-1 flex-col bg-brand-bg text-brand-text">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-ember">
            <span aria-hidden className="h-px w-8 bg-brand-ember" />
            Hébergement de serveurs de jeu · Pterodactyl
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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
          <p className="mt-8 flex items-center gap-2 font-mono text-xs text-brand-muted">
            <span aria-hidden className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Tous les systèmes opérationnels
          </p>
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

      {/* Bande de statistiques */}
      <section className="border-y border-brand-border bg-brand-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-brand-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="border-b border-brand-border">
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

      {/* Ce qui est inclus */}
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 font-display text-2xl font-bold tracking-tight">
            Ce qui est inclus
          </h2>
          <div className="flex flex-col">
            {CAPABILITIES.map((cap, i) => (
              <div
                key={cap.n}
                className={`grid grid-cols-1 gap-3 py-7 sm:grid-cols-[80px_1fr] sm:gap-8 lg:grid-cols-[80px_320px_1fr] ${
                  i > 0 ? "border-t border-brand-border" : ""
                }`}
              >
                <p className="font-mono text-sm text-brand-ember">{cap.n}</p>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {cap.title}
                </h3>
                <p className="max-w-xl text-sm text-brand-muted">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="border-b border-brand-border">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}/checkout`}
                className="group flex flex-col gap-4 rounded-lg border border-brand-border bg-brand-surface p-5 transition hover:-translate-y-1 hover:border-brand-muted"
              >
                <div className="flex aspect-16/10 items-center justify-center rounded-md border border-brand-border bg-brand-bg font-display text-2xl font-bold text-brand-ember">
                  {game.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-display font-bold">{game.name}</p>
                  <p className="mt-1 font-mono text-xs text-brand-muted">
                    {game.ramMinGo}GB RAM · {game.cpuMinCores} VCPU ·{" "}
                    {game.diskMinGo}GB DISK
                  </p>
                </div>
                <p className="font-mono text-lg text-brand-ember">
                  {game.monthlyPrice}€
                  <span className="text-xs text-brand-muted">/mois</span>
                </p>
              </Link>
            ))}
            {featuredGames.length === 0 && (
              <p className="text-sm text-brand-muted">
                Aucun jeu disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Localisations */}
      <section className="border-b border-brand-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
              Au plus près de tes joueurs
            </h2>
            <p className="max-w-sm text-sm text-brand-muted">
              Choisis la région la plus proche de ta communauté. Chaque
              datacenter est supervisé en continu.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-brand-border">
            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.city}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 transition hover:bg-white/5 ${
                  i > 0 ? "border-t border-brand-border" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">{loc.city}</p>
                  <p className="mt-0.5 text-xs text-brand-muted">{loc.region}</p>
                </div>
                <span className="font-mono text-sm tabular-nums">{loc.ping}</span>
                <span
                  aria-hidden
                  className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-teal"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 font-display text-2xl font-bold tracking-tight">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col gap-4 rounded-lg border border-brand-border bg-brand-surface p-6"
              >
                <blockquote className="text-sm leading-relaxed text-brand-text">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-bg font-mono text-xs text-brand-ember">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-brand-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Statut */}
      <section id="statut" className="border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-lg border border-brand-border bg-brand-surface p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                aria-hidden
                className="status-dot inline-block h-2.5 w-2.5 rounded-full bg-brand-teal"
              />
              <h2 className="font-display text-xl font-bold tracking-tight">
                Tous les systèmes sont opérationnels
              </h2>
              <span className="ml-auto rounded-full border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-brand-muted">
                Mis à jour à l&apos;instant
              </span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {STATUS_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-2 flex justify-between font-mono text-xs">
                    <span>{metric.label}</span>
                    <span className="text-brand-muted">{metric.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-brand-border">
                    <div
                      className="h-2 rounded-full bg-brand-teal"
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-brand-muted">
              Disponibilité sur les 90 derniers jours.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl border-b border-brand-border px-6 py-20">
        <h2 className="mb-10 font-display text-2xl font-bold tracking-tight">
          Questions fréquentes
        </h2>
        <div className="flex flex-col">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              className={`group py-5 ${i > 0 ? "border-t border-brand-border" : ""}`}
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 font-display font-bold [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{item.q}</span>
                <span className="text-xl text-brand-ember transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="rounded-lg border border-brand-border bg-brand-surface px-8 py-16 text-center">
          <h2 className="mx-auto max-w-lg font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Lance ton serveur en quelques secondes.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-brand-muted">
            Sans engagement. Crée ton compte, choisis ton jeu, et joue dès
            aujourd&apos;hui.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
      </section>
    </div>
  );
}
