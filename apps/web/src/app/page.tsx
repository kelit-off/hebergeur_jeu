import Link from "next/link";
import { css } from "@/lib/css";
import SiteNav from "@/components/SiteNav";
import { FullFooter } from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";

const kicker =
  "display:inline-flex;align-items:center;gap:14px;font-family:var(--font-heading);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent);";
const kickerLine = "width:34px;height:1px;background:var(--color-accent);";
const h2 =
  "font-family:var(--font-heading);font-weight:600;font-size:clamp(28px,3.4vw,40px);letter-spacing:-.015em;";

const stats = [
  { value: "99,99 %", label: "Disponibilité garantie" },
  { value: "< 20 ms", label: "Latence en Europe" },
  { value: "8", label: "Régions mondiales" },
  { value: "24/7", label: "Support humain" },
];

const features = [
  {
    n: "01",
    title: "Panel Pterodactyl complet",
    body: "Console en temps réel, gestionnaire de fichiers, planificateur de tâches, sauvegardes automatiques et gestion des sous-utilisateurs. Tout ce qu'il faut pour piloter votre serveur depuis le navigateur.",
  },
  {
    n: "02",
    title: "Protection anti-DDoS incluse",
    body: "Mitigation automatique jusqu'à plusieurs Tbps sur toutes nos régions, sans surcoût. Vos joueurs restent connectés même sous attaque.",
  },
  {
    n: "03",
    title: "Stockage NVMe & CPU Ryzen",
    body: "Des disques NVMe et des processeurs Ryzen 9 haute fréquence pour des chargements de chunks instantanés et zéro lag, même avec des modpacks lourds.",
  },
  {
    n: "04",
    title: "Déploiement en 1 clic",
    body: "Choisissez votre jeu, votre version ou votre modpack — Vanilla, Paper, Forge, Fabric — et votre serveur est en ligne avant que vous ayez fini votre café.",
  },
];

const games = [
  { id: "game-mc", name: "Minecraft", meta: "Java & Bedrock · dès 2,49 €" },
  { id: "game-rust", name: "Rust", meta: "Survie PvP · dès 6,99 €" },
  { id: "game-palworld", name: "Palworld", meta: "Survie coop · dès 5,99 €" },
  { id: "game-ark", name: "ARK: Survival", meta: "Survie · dès 8,99 €" },
  { id: "game-valheim", name: "Valheim", meta: "Coop viking · dès 4,99 €" },
  { id: "game-discord", name: "Bots Discord", meta: "Node & Python · dès 1,99 €" },
];

const locations = [
  { city: "Paris, France", region: "EU Ouest · GRA", ping: "6 ms" },
  { city: "Roubaix, France", region: "EU Ouest · RBX", ping: "5 ms" },
  { city: "Francfort, Allemagne", region: "EU Centre · FRA", ping: "11 ms" },
  { city: "Londres, Royaume-Uni", region: "EU Ouest · LHR", ping: "9 ms" },
  { city: "New York, USA", region: "US Est · NYC", ping: "78 ms" },
  { city: "Singapour", region: "Asie · SGP", ping: "165 ms" },
];

const testimonials = [
  {
    quote:
      "« Migration de notre serveur Minecraft de 120 joueurs sans une seconde de coupure. Le panel Pterodactyl est un vrai plaisir à utiliser. »",
    initials: "LM",
    name: "Lucas M.",
    role: "Admin — SkyBloc Network",
  },
  {
    quote:
      "« On héberge quatre bots Discord pour 30 communautés. Uptime irréprochable et le support répond en quelques minutes, la nuit comprise. »",
    initials: "AK",
    name: "Amina K.",
    role: "Développeuse — botfactory.io",
  },
  {
    quote:
      "« Serveur Palworld en ligne en moins de deux minutes pour jouer avec mes amis le soir même. Rapport qualité-prix imbattable. »",
    initials: "TD",
    name: "Thomas D.",
    role: "Joueur — communauté privée",
  },
];

const uptime = [
  { label: "Réseau de jeu", value: "99,99 %", solid: true },
  { label: "Panel Pterodactyl", value: "100 %", solid: true },
  { label: "Sauvegardes", value: "99,97 %", solid: false },
];

const faqs = [
  {
    q: "Qu'est-ce que le panel Pterodactyl ?",
    a: "Pterodactyl est un panneau de contrôle open-source pour gérer vos serveurs de jeu depuis le navigateur : console en direct, fichiers, planificateur, bases de données et sous-utilisateurs. Chaque serveur Zenith est isolé dans son propre conteneur Docker.",
    open: true,
  },
  {
    q: "Puis-je changer de jeu ou de version ?",
    a: "Oui. Depuis le panel, vous pouvez réinstaller un autre jeu, changer de version, installer un modpack ou basculer entre Vanilla, Paper, Forge et Fabric en quelques clics, sans perdre vos autres serveurs.",
    open: false,
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Aucun. Tous nos forfaits sont sans engagement et payables au mois. Vous pouvez suspendre, mettre à niveau ou résilier à tout moment, et nous offrons une garantie satisfait ou remboursé de 72 heures.",
    open: false,
  },
  {
    q: "La protection anti-DDoS est-elle vraiment incluse ?",
    a: "Oui, sur tous les forfaits et sans surcoût. La mitigation est automatique au niveau du réseau, avec une capacité de plusieurs Tbps répartie sur nos régions.",
    open: false,
  },
];

export default function HomePage() {
  return (
    <div
      style={css(
        "min-height:100vh;background:radial-gradient(1200px 720px at 82% -160px, color-mix(in srgb, var(--color-accent-900) 78%, transparent), transparent 60%), radial-gradient(1100px 800px at -10% 100%, color-mix(in srgb, black 30%, transparent), transparent 55%), var(--color-bg);color:var(--color-text);font-family:var(--font-body);text-wrap:pretty;overflow-x:hidden;"
      )}
    >
      <SiteNav current="accueil" />

      {/* HERO */}
      <section style={css("max-width:1200px;margin:0 auto;padding:clamp(64px,10vw,120px) clamp(20px,5vw,72px) 72px;")}>
        <span style={css(kicker)}>
          <span style={css(kickerLine)} />
          Hébergement de serveurs de jeu
        </span>
        <h1
          style={css(
            "font-family:var(--font-heading);font-weight:600;font-size:clamp(42px,6.6vw,84px);line-height:1.03;letter-spacing:-.02em;margin:22px 0 0;max-width:16ch;"
          )}
        >
          Vos serveurs de jeu,
          <br />
          <span style={css("color:var(--color-accent-300);")}>prêts en 60 secondes.</span>
        </h1>
        <p
          style={css(
            "font-size:18px;line-height:1.6;max-width:56ch;margin:26px 0 0;color:color-mix(in srgb, var(--color-text) 82%, transparent);"
          )}
        >
          Déployez Minecraft, Rust, Palworld ou un bot Discord en un clic. Panel Pterodactyl complet,
          stockage NVMe, protection anti-DDoS et support 24/7 — sans engagement.
        </p>
        <div style={css("display:flex;gap:14px;flex-wrap:wrap;margin-top:32px;")}>
          <Link href="/tarifs" className="btn btn-primary" style={css("text-decoration:none;font-size:15px;padding:11px 22px;")}>
            Déployer un serveur
          </Link>
          <Link href="/jeux" className="btn btn-ghost" style={css("text-decoration:none;font-size:15px;")}>
            Voir les jeux supportés →
          </Link>
        </div>
        <div
          style={css(
            "display:flex;align-items:center;gap:10px;margin-top:26px;font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent);"
          )}
        >
          <span
            style={css(
              "width:8px;height:8px;border-radius:50%;background:var(--color-accent-400);box-shadow:0 0 8px var(--color-accent-400);animation:pulseDot 2.4s ease-in-out infinite;"
            )}
          />
          Tous les systèmes opérationnels · 99,99 % de disponibilité ce mois-ci
        </div>
      </section>

      {/* STAT BAND */}
      <section
        style={css(
          "background:radial-gradient(900px 420px at 85% -40%, color-mix(in srgb, var(--color-section-glow) 70%, transparent), transparent 64%), var(--color-section);border-block:1px solid color-mix(in srgb, var(--color-accent) 22%, transparent);"
        )}
      >
        <div
          style={css(
            "max-width:1200px;margin:0 auto;padding:52px clamp(20px,5vw,72px);display:grid;grid-template-columns:repeat(4,auto);justify-content:space-between;gap:32px;"
          )}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p
                style={css(
                  "font-family:var(--font-heading);font-weight:600;font-size:clamp(34px,4vw,50px);margin:0;color:var(--color-text);"
                )}
              >
                {s.value}
              </p>
              <p
                style={css(
                  "font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 66%, transparent);margin:8px 0 0;"
                )}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={css("max-width:1200px;margin:0 auto;padding:96px clamp(20px,5vw,72px) 72px;")}>
        <span style={css(kicker)}>
          <span style={css(kickerLine)} />
          Ce qui est inclus
        </span>
        <h2 style={css(h2 + "margin:20px 0 48px;max-width:22ch;")}>
          Une infrastructure pensée pour les joueurs et les développeurs.
        </h2>
        <div style={css("display:flex;flex-direction:column;")}>
          {features.map((f, i) => (
            <div
              key={f.n}
              style={css(
                "display:grid;grid-template-columns:minmax(48px,120px) minmax(0,380px) minmax(0,1fr);gap:24px clamp(24px,4vw,64px);align-items:baseline;padding:26px 0;" +
                  (i > 0 ? "border-top:1px solid var(--color-neutral-800);" : "")
              )}
            >
              <p style={css("font-family:var(--font-heading);font-weight:600;font-size:15px;color:var(--color-accent);margin:0;")}>{f.n}</p>
              <h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:23px;letter-spacing:-.01em;margin:0;")}>{f.title}</h3>
              <p style={css("font-size:15.5px;line-height:1.6;margin:0;color:color-mix(in srgb, var(--color-text) 78%, transparent);max-width:52ch;")}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JEUX */}
      <section style={css("max-width:1200px;margin:0 auto;padding:24px clamp(20px,5vw,72px) 72px;")}>
        <div style={css("display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:36px;")}>
          <div>
            <span style={css(kicker)}>
              <span style={css(kickerLine)} />
              Jeux supportés
            </span>
            <h2 style={css(h2 + "margin:20px 0 0;")}>Un serveur pour chaque univers.</h2>
          </div>
          <Link href="/jeux" className="btn btn-secondary" style={css("text-decoration:none;font-size:13px;")}>
            Tout voir
          </Link>
        </div>
        <div style={css("display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;")}>
          {games.map((g) => (
            <Link
              key={g.id}
              href="/jeux"
              className="gcard"
              style={css(
                "text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:12px;padding:16px;border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 60%, transparent);"
              )}
            >
              <div style={css("aspect-ratio:16/10;border-radius:9px;overflow:hidden;")}>
                <ImageSlot label={g.name} />
              </div>
              <div>
                <p style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0;")}>{g.name}</p>
                <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:4px 0 0;")}>{g.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LOCALISATIONS */}
      <section style={css("max-width:1200px;margin:0 auto;padding:72px clamp(20px,5vw,72px);")}>
        <div style={css("display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr);gap:clamp(32px,6vw,88px);align-items:start;")}>
          <div>
            <span style={css(kicker)}>
              <span style={css(kickerLine)} />
              Localisations
            </span>
            <h2 style={css(h2 + "margin:20px 0 18px;")}>Au plus près de vos joueurs.</h2>
            <p style={css("font-size:15.5px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 78%, transparent);max-width:44ch;")}>
              Choisissez la région la plus proche de votre communauté. Chaque datacenter est connecté à un
              réseau anti-DDoS et supervisé en continu.
            </p>
          </div>
          <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;overflow:hidden;background:color-mix(in srgb, var(--color-surface) 55%, transparent);")}>
            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="loc-row"
                style={css(
                  "display:grid;grid-template-columns:1fr auto auto;gap:16px;align-items:center;padding:14px 18px;" +
                    (i > 0 ? "border-top:1px solid var(--color-neutral-800);" : "")
                )}
              >
                <div>
                  <p style={css("font-weight:600;font-size:14.5px;margin:0;")}>{loc.city}</p>
                  <p style={css("font-size:12px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:2px 0 0;")}>{loc.region}</p>
                </div>
                <span style={css("font-family:var(--font-heading);font-size:14px;font-variant-numeric:tabular-nums;")}>{loc.ping}</span>
                <span style={css("width:8px;height:8px;border-radius:50%;background:var(--color-accent-400);box-shadow:0 0 8px var(--color-accent-400);")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section style={css("max-width:1200px;margin:0 auto;padding:72px clamp(20px,5vw,72px);")}>
        <span style={css(kicker)}>
          <span style={css(kickerLine)} />
          Ils nous font confiance
        </span>
        <h2 style={css(h2 + "margin:20px 0 44px;")}>Plus de 40 000 serveurs déployés.</h2>
        <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;")}>
          {testimonials.map((t) => (
            <figure key={t.initials} className="card" style={css("gap:16px;padding:22px;")}>
              <blockquote style={css("font-size:16px;line-height:1.55;margin:0;color:var(--color-text);")}>{t.quote}</blockquote>
              <figcaption style={css("display:flex;align-items:center;gap:12px;margin-top:4px;")}>
                <span style={css("width:36px;height:36px;border-radius:50%;background:var(--color-accent-800);display:grid;place-items:center;font-family:var(--font-heading);font-size:14px;color:var(--color-accent-200);")}>{t.initials}</span>
                <span>
                  <span style={css("display:block;font-weight:600;font-size:13.5px;")}>{t.name}</span>
                  <span style={css("display:block;font-size:12px;color:color-mix(in srgb, var(--color-text) 55%, transparent);")}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STATUT */}
      <section id="statut" style={css("max-width:1200px;margin:0 auto;padding:72px clamp(20px,5vw,72px);")}>
        <div style={css("border:1px solid var(--color-neutral-800);border-radius:16px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:28px clamp(20px,3vw,36px);")}>
          <div style={css("display:flex;align-items:center;gap:12px;flex-wrap:wrap;")}>
            <span style={css("width:10px;height:10px;border-radius:50%;background:var(--color-accent-400);box-shadow:0 0 10px var(--color-accent-400);animation:pulseDot 2.4s ease-in-out infinite;")} />
            <h2 style={css("font-family:var(--font-heading);font-weight:600;font-size:22px;margin:0;")}>Tous les systèmes sont opérationnels</h2>
            <span className="tag tag-accent" style={css("margin-left:auto;")}>Mis à jour à l'instant</span>
          </div>
          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:26px;")}>
            {uptime.map((u) => (
              <div key={u.label}>
                <div style={css("display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:8px;")}>
                  <span>{u.label}</span>
                  <span style={css("color:color-mix(in srgb, var(--color-text) 55%, transparent);")}>{u.value}</span>
                </div>
                <div
                  style={css(
                    u.solid
                      ? "height:26px;border-radius:5px;background:repeating-linear-gradient(90deg, var(--color-accent-500) 0 5px, transparent 5px 8px);opacity:.9;"
                      : "height:26px;border-radius:5px;background:linear-gradient(90deg, var(--color-accent-500) 0 62%, var(--color-neutral-700) 62% 64%, var(--color-accent-500) 64%);mask:repeating-linear-gradient(90deg,#000 0 5px,transparent 5px 8px);-webkit-mask:repeating-linear-gradient(90deg,#000 0 5px,transparent 5px 8px);opacity:.9;"
                  )}
                />
              </div>
            ))}
          </div>
          <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 50%, transparent);margin:20px 0 0;")}>Disponibilité sur les 90 derniers jours.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={css("max-width:900px;margin:0 auto;padding:72px clamp(20px,5vw,72px);")}>
        <span style={css(kicker)}>
          <span style={css(kickerLine)} />
          Questions fréquentes
        </span>
        <h2 style={css(h2 + "margin:20px 0 40px;")}>Tout ce que vous devez savoir.</h2>
        <div style={css("display:flex;flex-direction:column;")}>
          {faqs.map((f, i) => (
            <details
              key={i}
              className="faq"
              open={f.open}
              style={css(
                "border-top:1px solid var(--color-neutral-800);padding:20px 0;" +
                  (i === faqs.length - 1 ? "border-bottom:1px solid var(--color-neutral-800);" : "")
              )}
            >
              <summary style={css("display:flex;align-items:center;gap:16px;font-family:var(--font-heading);font-weight:600;font-size:17px;")}>
                <span style={css("flex:1;")}>{f.q}</span>
                <span className="faq-plus" style={css("color:var(--color-accent);font-size:22px;line-height:1;transition:transform .2s;")}>+</span>
              </summary>
              <p style={css("font-size:15px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 78%, transparent);margin:14px 0 0;max-width:64ch;")}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={css("max-width:1200px;margin:0 auto;padding:48px clamp(20px,5vw,72px) 96px;")}>
        <div
          style={css(
            "border:1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);border-radius:20px;background:radial-gradient(700px 300px at 80% -20%, color-mix(in srgb, var(--color-accent-900) 85%, transparent), transparent 60%), color-mix(in srgb, var(--color-surface) 55%, transparent);padding:clamp(36px,6vw,64px);text-align:center;"
          )}
        >
          <h2 style={css("font-family:var(--font-heading);font-weight:600;font-size:clamp(30px,4vw,48px);letter-spacing:-.02em;margin:0 auto;max-width:20ch;")}>
            Lancez votre serveur en quelques secondes.
          </h2>
          <p style={css("font-size:17px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 78%, transparent);margin:20px auto 0;max-width:52ch;")}>
            Sans engagement, garanti satisfait ou remboursé pendant 72 heures. Votre communauté vous attend.
          </p>
          <div style={css("display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:32px;")}>
            <Link href="/tarifs" className="btn btn-primary" style={css("text-decoration:none;font-size:15px;padding:12px 26px;")}>
              Voir les tarifs
            </Link>
            <Link href="/panel" className="btn btn-secondary" style={css("text-decoration:none;font-size:15px;padding:12px 26px;")}>
              Découvrir l'espace client
            </Link>
          </div>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}
