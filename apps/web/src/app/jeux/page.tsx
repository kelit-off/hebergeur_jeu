"use client";

import { useState } from "react";
import Link from "next/link";
import { css } from "@/lib/css";
import SiteNav from "@/components/SiteNav";
import { CompactFooter } from "@/components/SiteFooter";
import ImageSlot from "@/components/ImageSlot";

const cats = [
  { id: "tous", label: "Tous" },
  { id: "survie", label: "Survie" },
  { id: "coop", label: "Coopératif" },
  { id: "sandbox", label: "Bac à sable" },
  { id: "fps", label: "FPS" },
  { id: "bots", label: "Bots Discord" },
] as const;

type CatId = (typeof cats)[number]["id"];

const allGames: { name: string; cat: CatId; catLabel: string; meta: string; price: string }[] = [
  { name: "Minecraft", cat: "sandbox", catLabel: "Bac à sable", meta: "Java & Bedrock · illimité", price: "2,49 €" },
  { name: "Rust", cat: "survie", catLabel: "Survie", meta: "Survie PvP · wipe auto", price: "6,99 €" },
  { name: "ARK: Survival", cat: "survie", catLabel: "Survie", meta: "Dinos · cross-play", price: "8,99 €" },
  { name: "Palworld", cat: "survie", catLabel: "Survie", meta: "Survie coop · dédié", price: "5,99 €" },
  { name: "Valheim", cat: "coop", catLabel: "Coopératif", meta: "Coop viking · 10 joueurs", price: "4,99 €" },
  { name: "Project Zomboid", cat: "survie", catLabel: "Survie", meta: "Zombie sandbox · mods", price: "5,49 €" },
  { name: "Terraria", cat: "sandbox", catLabel: "Bac à sable", meta: "2D sandbox · tModLoader", price: "3,49 €" },
  { name: "Garry's Mod", cat: "sandbox", catLabel: "Bac à sable", meta: "Sandbox · workshop", price: "5,49 €" },
  { name: "Counter-Strike 2", cat: "fps", catLabel: "FPS", meta: "Compétitif · 128 tick", price: "7,99 €" },
  { name: "Team Fortress 2", cat: "fps", catLabel: "FPS", meta: "FPS classe · 32 joueurs", price: "4,49 €" },
  { name: "Factorio", cat: "coop", catLabel: "Coopératif", meta: "Automatisation · headless", price: "4,99 €" },
  { name: "Bots Discord", cat: "bots", catLabel: "Bot", meta: "Node.js & Python · 24/7", price: "1,99 €" },
];

export default function JeuxPage() {
  const [active, setActive] = useState<CatId>("tous");
  const games = allGames.filter((g) => active === "tous" || g.cat === active);

  return (
    <div
      style={css(
        "min-height:100vh;background:radial-gradient(1100px 640px at 84% -160px, color-mix(in srgb, var(--color-accent-900) 72%, transparent), transparent 60%), var(--color-bg);color:var(--color-text);font-family:var(--font-body);text-wrap:pretty;overflow-x:hidden;"
      )}
    >
      <SiteNav current="jeux" />

      <section style={css("max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(20px,5vw,72px) 40px;")}>
        <span style={css("display:inline-flex;align-items:center;gap:14px;font-family:var(--font-heading);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent);")}>
          <span style={css("width:34px;height:1px;background:var(--color-accent);")} />
          Jeux supportés
        </span>
        <h1 style={css("font-family:var(--font-heading);font-weight:600;font-size:clamp(38px,5.4vw,68px);line-height:1.04;letter-spacing:-.02em;margin:22px 0 0;max-width:18ch;")}>
          Choisissez votre jeu, on s'occupe du reste.
        </h1>
        <p style={css("font-size:17px;line-height:1.6;max-width:56ch;margin:24px 0 0;color:color-mix(in srgb, var(--color-text) 82%, transparent);")}>
          Chaque jeu se déploie en un clic avec ses versions, ses mods et son planificateur. Filtrez par
          catégorie pour trouver le vôtre.
        </p>
      </section>

      <section style={css("max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,72px) 96px;")}>
        <div style={css("display:flex;gap:10px;flex-wrap:wrap;padding:20px 0 32px;border-bottom:1px solid var(--color-neutral-800);margin-bottom:36px;")}>
          {cats.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                className="fbtn"
                onClick={() => setActive(c.id)}
                style={css(
                  "font-family:var(--font-heading);font-size:13.5px;font-weight:500;cursor:pointer;padding:8px 16px;border-radius:999px;transition:all .15s;" +
                    (on
                      ? "color:var(--color-accent);border:1px solid var(--color-accent);background:color-mix(in srgb, var(--color-accent) 12%, transparent);"
                      : "color:color-mix(in srgb, var(--color-text) 60%, transparent);border:1px solid var(--color-neutral-800);background:transparent;")
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div style={css("display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:18px;")}>
          {games.map((game) => (
            <div
              key={game.name}
              className="gcard"
              style={css("display:flex;flex-direction:column;gap:14px;padding:16px;border:1px solid var(--color-neutral-800);border-radius:16px;background:color-mix(in srgb, var(--color-surface) 60%, transparent);")}
            >
              <div style={css("aspect-ratio:16/10;border-radius:10px;overflow:hidden;position:relative;")}>
                <ImageSlot label={game.name} />
              </div>
              <div style={css("display:flex;align-items:flex-start;justify-content:space-between;gap:10px;")}>
                <div>
                  <p style={css("font-family:var(--font-heading);font-weight:600;font-size:17px;margin:0;")}>{game.name}</p>
                  <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:5px 0 0;")}>{game.meta}</p>
                </div>
                <span className="tag tag-outline" style={css("white-space:nowrap;")}>{game.catLabel}</span>
              </div>
              <div style={css("display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:2px;padding-top:14px;border-top:1px solid var(--color-neutral-800);")}>
                <span style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 70%, transparent);")}>
                  dès{" "}
                  <span style={css("font-family:var(--font-heading);font-weight:600;color:var(--color-text);font-size:15px;")}>{game.price}</span> /mois
                </span>
                <Link href="/tarifs" className="btn btn-primary g-deploy" style={css("text-decoration:none;font-size:12.5px;padding:6px 14px;opacity:.75;transition:opacity .18s;")}>
                  Déployer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={css("max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,72px) 96px;")}>
        <div
          style={css(
            "border:1px solid color-mix(in srgb, var(--color-accent) 26%, transparent);border-radius:20px;background:radial-gradient(700px 300px at 20% -20%, color-mix(in srgb, var(--color-accent-900) 80%, transparent), transparent 60%), color-mix(in srgb, var(--color-surface) 55%, transparent);padding:clamp(32px,5vw,56px);display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;"
          )}
        >
          <div>
            <h2 style={css("font-family:var(--font-heading);font-weight:600;font-size:clamp(24px,3vw,34px);letter-spacing:-.015em;margin:0;max-width:24ch;")}>
              Votre jeu n'est pas dans la liste ?
            </h2>
            <p style={css("font-size:15.5px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 78%, transparent);margin:14px 0 0;max-width:48ch;")}>
              Pterodactyl accepte n'importe quelle image de serveur. Envoyez-nous votre jeu et on le met en place.
            </p>
          </div>
          <Link href="/" className="btn btn-primary" style={css("text-decoration:none;font-size:15px;padding:12px 24px;")}>
            Nous contacter
          </Link>
        </div>
      </section>

      <CompactFooter />
    </div>
  );
}
