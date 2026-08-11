"use client";

import { useState } from "react";
import Link from "next/link";
import { css } from "@/lib/css";

type Tab = "home" | "services" | "invoices" | "tickets" | "settings";

const navItems: { id: Tab; label: string; icon: string; badge?: string }[] = [
  { id: "home", label: "Vue d'ensemble", icon: "ph ph-squares-four" },
  { id: "services", label: "Mes services", icon: "ph ph-hard-drives", badge: "3" },
  { id: "invoices", label: "Facturation", icon: "ph ph-receipt" },
  { id: "tickets", label: "Support", icon: "ph ph-lifebuoy", badge: "1" },
  { id: "settings", label: "Paramètres", icon: "ph ph-gear-six" },
];

const services = [
  { name: "SkyBloc Survival", plan: "Sommet · 8 Go", specs: "8 Go RAM · 4 vCPU · 50 Go NVMe", host: "play.skybloc.gg:25565", price: "17,99 €", renew: "1er sept. 2026", icon: "ph ph-cube", online: true },
  { name: "Palworld — Les Potes", plan: "Voyageur · 4 Go", specs: "4 Go RAM · 2 vCPU · 25 Go NVMe", host: "pal.zenith.gg:8211", price: "9,99 €", renew: "1er sept. 2026", icon: "ph ph-paw-print", online: true },
  { name: "Bot Modération", plan: "Standard · 1 Go", specs: "1 Go RAM · 1 vCPU · 10 Go NVMe", host: "node-fr-03 · conteneur", price: "3,49 €", renew: "1er sept. 2026", icon: "ph ph-robot", online: false },
];

const invoices = [
  { id: "#ZN-2026-081", date: "1 août 2026", amount: "23,97 €" },
  { id: "#ZN-2026-072", date: "1 juillet 2026", amount: "23,97 €" },
  { id: "#ZN-2026-063", date: "1 juin 2026", amount: "23,97 €" },
  { id: "#ZN-2026-054", date: "1 mai 2026", amount: "14,98 €" },
  { id: "#ZN-2026-045", date: "1 avril 2026", amount: "14,98 €" },
];

const tickets = [
  { subject: "Ajout d'un slot RAM sur SkyBloc", status: "Ouvert", open: true, meta: "#4821 · Facturation · mis à jour il y a 2 h", icon: "ph ph-chat-circle-dots" },
  { subject: "Bot Discord ne redémarre plus", status: "Répondu", open: false, meta: "#4790 · Technique · agent : Nadia", icon: "ph ph-wrench" },
  { subject: "Migration région Paris → Roubaix", status: "Fermé", open: false, meta: "#4655 · Technique · résolu le 12 juil.", icon: "ph ph-check-circle" },
  { subject: "Question sur la garantie 72 h", status: "Fermé", open: false, meta: "#4602 · Général · résolu le 3 juil.", icon: "ph ph-question" },
];

const pillBase =
  "display:inline-flex;align-items:center;gap:6px;font-size:11px;font-family:var(--font-heading);padding:3px 10px;border-radius:999px;white-space:nowrap;letter-spacing:.02em;";
function pill(kind: "online" | "ok" | "muted") {
  if (kind === "online" || kind === "ok")
    return pillBase + "background:color-mix(in srgb, var(--color-accent) 16%, transparent);color:var(--color-accent-200);";
  return pillBase + "background:color-mix(in srgb, var(--color-text) 8%, transparent);color:color-mix(in srgb, var(--color-text) 55%, transparent);";
}
function dot(online: boolean) {
  return (
    "width:7px;height:7px;border-radius:50%;background:" +
    (online ? "var(--color-accent-400);box-shadow:0 0 7px var(--color-accent-400)" : "color-mix(in srgb, var(--color-text) 40%, transparent)") +
    ";"
  );
}

const statCard = "border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:18px;";
const statHead = "display:flex;align-items:center;gap:8px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:color-mix(in srgb, var(--color-text) 55%, transparent);";
const statNum = "font-family:var(--font-heading);font-weight:600;font-size:34px;margin:12px 0 0;letter-spacing:-.02em;";
const h1 = "font-family:var(--font-heading);font-weight:600;font-size:clamp(26px,3.2vw,36px);letter-spacing:-.02em;";
const label = "font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:color-mix(in srgb, var(--color-text) 48%, transparent);margin:0;";

export default function PanelPage() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div
      style={css(
        "min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(1200px 700px at 88% -220px, color-mix(in srgb, var(--color-accent-900) 58%, transparent), transparent 60%), var(--color-bg);color:var(--color-text);font-family:var(--font-body);text-wrap:pretty;"
      )}
    >
      {/* TOP BAR */}
      <header style={css("position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:20px;padding:12px clamp(16px,3vw,32px);backdrop-filter:blur(12px);background:color-mix(in srgb, var(--color-bg) 82%, transparent);border-bottom:1px solid var(--color-divider);")}>
        <Link href="/" style={css("text-decoration:none;display:flex;align-items:center;gap:10px;font-family:var(--font-heading);font-weight:600;font-size:18px;color:var(--color-text);letter-spacing:-.01em;")}>
          <span style={css("display:inline-grid;place-items:center;width:25px;height:25px;border-radius:8px;background:radial-gradient(circle at 30% 25%, var(--color-accent-400), var(--color-accent-700));box-shadow:0 0 16px color-mix(in srgb, var(--color-accent) 55%, transparent);")}>
            <span style={css("width:8px;height:8px;border-radius:50%;background:var(--color-accent-100);")} />
          </span>
          Zenith
        </Link>
        <span style={css("width:1px;height:22px;background:var(--color-divider);")} />
        <span style={css("font-size:13.5px;color:color-mix(in srgb, var(--color-text) 60%, transparent);")}>Espace client</span>
        <div style={css("margin-left:auto;display:flex;align-items:center;gap:18px;")}>
          <Link href="/" className="topback" style={css("text-decoration:none;font-size:13px;color:color-mix(in srgb, var(--color-text) 58%, transparent);display:flex;align-items:center;gap:6px;transition:color .15s;")}>
            <i className="ph ph-arrow-left" style={css("font-size:15px;")} />
            Retour au site
          </Link>
          <i className="ph ph-bell" style={css("font-size:18px;color:color-mix(in srgb, var(--color-text) 62%, transparent);")} />
          <span style={css("display:flex;align-items:center;gap:9px;font-size:13px;")}>
            <span style={css("width:30px;height:30px;border-radius:50%;background:var(--color-accent-800);display:grid;place-items:center;font-family:var(--font-heading);font-size:12.5px;color:var(--color-accent-200);")}>LM</span>
            <span style={css("color:color-mix(in srgb, var(--color-text) 82%, transparent);")}>Lucas M.</span>
          </span>
        </div>
      </header>

      <div style={css("flex:1;display:flex;align-items:stretch;")}>
        {/* SIDEBAR */}
        <aside style={css("width:230px;flex:none;border-right:1px solid var(--color-divider);padding:20px 14px;display:flex;flex-direction:column;gap:4px;background:color-mix(in srgb, var(--color-surface) 30%, transparent);")}>
          <p style={css("font-family:var(--font-heading);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb, var(--color-text) 45%, transparent);margin:4px 10px 10px;")}>Mon compte</p>
          {navItems.map((n) => {
            const on = n.id === tab;
            return (
              <button
                key={n.id}
                type="button"
                className="navitem"
                onClick={() => setTab(n.id)}
                style={css(
                  "display:flex;align-items:center;gap:12px;width:100%;font-family:var(--font-body);font-size:14px;font-weight:500;padding:10px 12px;border:0;border-radius:9px;cursor:pointer;transition:background .15s, color .15s;" +
                    (on
                      ? "background:color-mix(in srgb, var(--color-accent) 15%, transparent);color:var(--color-accent);"
                      : "background:transparent;color:color-mix(in srgb, var(--color-text) 66%, transparent);")
                )}
              >
                <i className={n.icon} style={css("font-size:18px;flex:none;")} />
                <span style={css("flex:1;text-align:left;")}>{n.label}</span>
                {n.badge && (
                  <span
                    style={css(
                      "font-size:11px;font-family:var(--font-heading);border-radius:999px;padding:1px 8px;" +
                        (on
                          ? "background:color-mix(in srgb, var(--color-accent) 22%, transparent);color:var(--color-accent-200);"
                          : "background:color-mix(in srgb, var(--color-text) 8%, transparent);color:color-mix(in srgb, var(--color-text) 58%, transparent);")
                    )}
                  >
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div style={css("margin-top:auto;border:1px solid color-mix(in srgb, var(--color-accent) 26%, transparent);border-radius:12px;background:color-mix(in srgb, var(--color-accent-900) 40%, transparent);padding:14px;")}>
            <p style={css("font-family:var(--font-heading);font-weight:600;font-size:13.5px;margin:0;")}>Crédit de parrainage</p>
            <p style={css("font-size:12px;line-height:1.5;color:color-mix(in srgb, var(--color-text) 68%, transparent);margin:6px 0 10px;")}>Invitez un ami, gagnez 5 € chacun.</p>
            <button type="button" className="btn btn-secondary" style={css("font-size:12px;width:100%;box-sizing:border-box;text-align:center;")}>Partager mon lien</button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={css("flex:1;min-width:0;padding:clamp(20px,3vw,36px);max-width:1080px;")}>
          {tab === "home" && (
            <div>
              <p style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:0 0 4px;")}>Bonjour Lucas,</p>
              <h1 style={css(h1 + "margin:0 0 28px;")}>Vue d'ensemble</h1>

              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:30px;")}>
                <div style={css(statCard)}>
                  <div style={css(statHead)}><i className="ph ph-hard-drives" style={css("font-size:16px;color:var(--color-accent);")} />Services actifs</div>
                  <p style={css(statNum)}>3</p>
                </div>
                <div style={css(statCard)}>
                  <div style={css(statHead)}><i className="ph ph-receipt" style={css("font-size:16px;color:var(--color-accent);")} />Prochaine facture</div>
                  <p style={css(statNum)}>23,97 €</p>
                  <p style={css("font-size:12px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:4px 0 0;")}>échéance le 1er sept.</p>
                </div>
                <div style={css(statCard)}>
                  <div style={css(statHead)}><i className="ph ph-lifebuoy" style={css("font-size:16px;color:var(--color-accent);")} />Tickets ouverts</div>
                  <p style={css(statNum)}>1</p>
                </div>
                <div style={css(statCard)}>
                  <div style={css(statHead)}><i className="ph ph-wallet" style={css("font-size:16px;color:var(--color-accent);")} />Solde crédit</div>
                  <p style={css(statNum)}>10,00 €</p>
                </div>
              </div>

              <div style={css("display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;")}>
                <h2 style={css("font-family:var(--font-heading);font-weight:600;font-size:19px;letter-spacing:-.01em;margin:0;")}>Mes services</h2>
                <button type="button" onClick={() => setTab("services")} className="btn btn-ghost" style={css("font-size:13px;")}>Tout voir</button>
              </div>
              <div style={css("display:flex;flex-direction:column;gap:12px;margin-bottom:34px;")}>
                {services.map((s) => (
                  <div key={s.name} className="rowcard" style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:16px 18px;display:grid;grid-template-columns:auto 1fr auto auto;gap:18px;align-items:center;")}>
                    <span style={css("width:40px;height:40px;border-radius:10px;background:var(--color-accent-900);display:grid;place-items:center;")}><i className={s.icon} style={css("font-size:20px;color:var(--color-accent-200);")} /></span>
                    <div style={css("min-width:0;")}>
                      <p style={css("font-family:var(--font-heading);font-weight:600;font-size:15.5px;margin:0;")}>{s.name}</p>
                      <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 58%, transparent);margin:3px 0 0;")}>{s.plan} · {s.specs}</p>
                    </div>
                    <span style={css(pill(s.online ? "online" : "muted"))}><span style={css(dot(s.online))} />{s.online ? "En ligne" : "Arrêté"}</span>
                    <div style={css("display:flex;align-items:center;gap:14px;")}>
                      <span style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent);white-space:nowrap;")}>{s.price}<span style={css("font-size:11px;")}>/mois</span></span>
                      <button type="button" onClick={() => setTab("services")} className="btn btn-secondary" style={css("font-size:12.5px;white-space:nowrap;")}>Gérer</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;")}>
                <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:20px;")}>
                  <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;")}><h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0;")}>Dernière facture</h3><span className="tag tag-accent">Payée</span></div>
                  <p style={css("font-size:13.5px;color:color-mix(in srgb, var(--color-text) 70%, transparent);margin:0;")}>Facture #ZN-2026-081</p>
                  <p style={css("font-family:var(--font-heading);font-weight:600;font-size:26px;margin:8px 0 0;")}>23,97 €</p>
                  <p style={css("font-size:12px;color:color-mix(in srgb, var(--color-text) 52%, transparent);margin:4px 0 16px;")}>réglée le 1er août 2026</p>
                  <button type="button" onClick={() => setTab("invoices")} className="btn btn-ghost" style={css("font-size:13px;")}>Historique de facturation</button>
                </div>
                <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:20px;")}>
                  <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;")}><h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0;")}>Statut de la plateforme</h3><span style={css("display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-accent-200);")}><span style={css("width:8px;height:8px;border-radius:50%;background:var(--color-accent-400);box-shadow:0 0 8px var(--color-accent-400);animation:pulseDot 2.4s ease-in-out infinite;")} />Opérationnel</span></div>
                  <div style={css("display:flex;flex-direction:column;gap:11px;font-size:13px;")}>
                    {[["Réseau de jeu", "99,99 %"], ["Panel Pterodactyl", "100 %"], ["Sauvegardes", "99,97 %"]].map(([k, v]) => (
                      <div key={k} style={css("display:flex;justify-content:space-between;")}><span style={css("color:color-mix(in srgb, var(--color-text) 72%, transparent);")}>{k}</span><span style={css("color:color-mix(in srgb, var(--color-text) 55%, transparent);font-variant-numeric:tabular-nums;")}>{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "services" && (
            <div>
              <h1 style={css(h1 + "margin:0 0 6px;")}>Mes services</h1>
              <p style={css("font-size:14px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:0 0 28px;")}>Gérez vos serveurs de jeu et vos bots Discord.</p>
              <div style={css("display:flex;flex-direction:column;gap:12px;")}>
                {services.map((s) => (
                  <div key={s.name} className="rowcard" style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:18px 20px;")}>
                    <div style={css("display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;")}>
                      <span style={css("width:44px;height:44px;border-radius:11px;background:var(--color-accent-900);display:grid;place-items:center;")}><i className={s.icon} style={css("font-size:22px;color:var(--color-accent-200);")} /></span>
                      <div style={css("min-width:0;")}>
                        <div style={css("display:flex;align-items:center;gap:10px;")}><p style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0;")}>{s.name}</p><span style={css(pill(s.online ? "online" : "muted"))}><span style={css(dot(s.online))} />{s.online ? "En ligne" : "Arrêté"}</span></div>
                        <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 58%, transparent);margin:4px 0 0;font-variant-numeric:tabular-nums;")}>{s.host}</p>
                      </div>
                      <button type="button" className="btn btn-primary" style={css("font-size:13px;white-space:nowrap;")}>Gérer</button>
                    </div>
                    <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:14px;margin-top:16px;padding-top:16px;border-top:1px solid var(--color-neutral-800);")}>
                      <div><p style={css(label)}>Offre</p><p style={css("font-size:13.5px;margin:5px 0 0;")}>{s.plan}</p></div>
                      <div><p style={css(label)}>Ressources</p><p style={css("font-size:13.5px;margin:5px 0 0;")}>{s.specs}</p></div>
                      <div><p style={css(label)}>Renouvellement</p><p style={css("font-size:13.5px;margin:5px 0 0;")}>{s.renew}</p></div>
                      <div><p style={css(label)}>Tarif</p><p style={css("font-size:13.5px;margin:5px 0 0;")}>{s.price} /mois</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={css("margin-top:20px;border:1px dashed var(--color-neutral-700);border-radius:14px;padding:22px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;")}>
                <div><p style={css("font-family:var(--font-heading);font-weight:600;font-size:15px;margin:0;")}>Besoin d'un nouveau serveur ?</p><p style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:5px 0 0;")}>Déployez un jeu ou un bot en moins d'une minute.</p></div>
                <Link href="/tarifs" className="btn btn-primary" style={css("text-decoration:none;font-size:13.5px;display:inline-flex;align-items:center;gap:7px;")}><i className="ph ph-plus" />Commander un service</Link>
              </div>
            </div>
          )}

          {tab === "invoices" && (
            <div>
              <h1 style={css(h1 + "margin:0 0 6px;")}>Facturation</h1>
              <p style={css("font-size:14px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:0 0 24px;")}>Vos factures et votre moyen de paiement.</p>
              <div style={css("display:grid;grid-template-columns:1fr auto;gap:14px;align-items:stretch;margin-bottom:24px;flex-wrap:wrap;")}>
                <div style={css("border:1px solid color-mix(in srgb, var(--color-accent) 24%, transparent);border-radius:14px;background:color-mix(in srgb, var(--color-accent-900) 34%, transparent);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;")}>
                  <div><p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 65%, transparent);margin:0;")}>Prochain prélèvement · 1er septembre 2026</p><p style={css("font-family:var(--font-heading);font-weight:600;font-size:24px;margin:6px 0 0;")}>23,97 €</p></div>
                  <button type="button" className="btn btn-primary" style={css("font-size:13px;")}>Payer maintenant</button>
                </div>
                <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:18px 20px;display:flex;align-items:center;gap:14px;min-width:220px;")}>
                  <i className="ph ph-credit-card" style={css("font-size:26px;color:var(--color-accent);")} />
                  <div><p style={css("font-size:13.5px;margin:0;font-variant-numeric:tabular-nums;")}>Visa •••• 4291</p><p style={css("font-size:12px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:3px 0 0;")}>expire 09/28</p></div>
                </div>
              </div>
              <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;overflow:hidden;background:color-mix(in srgb, var(--color-surface) 45%, transparent);")}>
                <table className="table" style={css("width:100%;margin:0;")}>
                  <thead><tr><th style={css("text-align:left;")}>Facture</th><th style={css("text-align:left;")}>Date</th><th style={css("text-align:left;")}>Montant</th><th style={css("text-align:left;")}>Statut</th><th style={css("text-align:right;")}>PDF</th></tr></thead>
                  <tbody>
                    {invoices.map((i) => (
                      <tr key={i.id} className="trow">
                        <td style={css("font-variant-numeric:tabular-nums;font-weight:600;")}>{i.id}</td>
                        <td style={css("color:color-mix(in srgb, var(--color-text) 68%, transparent);")}>{i.date}</td>
                        <td style={css("font-variant-numeric:tabular-nums;")}>{i.amount}</td>
                        <td><span style={css(pill("ok"))}>Payée</span></td>
                        <td style={css("text-align:right;")}><i className="ph ph-download-simple" style={css("font-size:18px;color:var(--color-accent);cursor:pointer;")} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "tickets" && (
            <div>
              <div style={css("display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:6px;")}>
                <h1 style={css(h1 + "margin:0;")}>Support</h1>
                <button type="button" className="btn btn-primary" style={css("font-size:13px;display:inline-flex;align-items:center;gap:7px;")}><i className="ph ph-plus" />Nouveau ticket</button>
              </div>
              <p style={css("font-size:14px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:0 0 24px;")}>Réponse humaine 24/7, en moyenne sous 8 minutes.</p>
              <div style={css("display:flex;flex-direction:column;gap:12px;")}>
                {tickets.map((t) => (
                  <div key={t.subject} className="rowcard" style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:16px 20px;display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;cursor:pointer;")}>
                    <span style={css("width:38px;height:38px;border-radius:10px;background:var(--color-accent-900);display:grid;place-items:center;")}><i className={t.icon} style={css("font-size:19px;color:var(--color-accent-200);")} /></span>
                    <div style={css("min-width:0;")}>
                      <div style={css("display:flex;align-items:center;gap:10px;")}><p style={css("font-family:var(--font-heading);font-weight:600;font-size:15px;margin:0;")}>{t.subject}</p><span style={css(pill(t.open ? "ok" : "muted"))}>{t.status}</span></div>
                      <p style={css("font-size:12.5px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:4px 0 0;")}>{t.meta}</p>
                    </div>
                    <i className="ph ph-caret-right" style={css("font-size:18px;color:color-mix(in srgb, var(--color-text) 45%, transparent);")} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div>
              <h1 style={css(h1 + "margin:0 0 24px;")}>Paramètres du compte</h1>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;")}>
                <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:22px;")}>
                  <h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0 0 18px;")}>Profil</h3>
                  <div className="field" style={css("margin-bottom:14px;")}><label>Nom complet</label><input className="input" type="text" defaultValue="Lucas Martin" /></div>
                  <div className="field" style={css("margin-bottom:14px;")}><label>Adresse e-mail</label><input className="input" type="email" defaultValue="lucas@skybloc.gg" /></div>
                  <div className="field" style={css("margin-bottom:18px;")}><label>Société (optionnel)</label><input className="input" type="text" defaultValue="SkyBloc Network" /></div>
                  <button type="button" className="btn btn-primary" style={css("font-size:13px;")}>Enregistrer</button>
                </div>
                <div style={css("display:flex;flex-direction:column;gap:16px;")}>
                  <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:22px;")}>
                    <h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0 0 6px;")}>Sécurité</h3>
                    <p style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:0 0 16px;")}>Authentification à deux facteurs et mot de passe.</p>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-neutral-800);")}><span style={css("font-size:13.5px;")}>Double authentification (2FA)</span><span className="tag tag-accent">Activée</span></div>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-neutral-800);")}><span style={css("font-size:13.5px;")}>Mot de passe</span><button type="button" className="btn btn-secondary" style={css("font-size:12.5px;")}>Modifier</button></div>
                  </div>
                  <div style={css("border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:22px;")}>
                    <h3 style={css("font-family:var(--font-heading);font-weight:600;font-size:16px;margin:0 0 6px;")}>Notifications</h3>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-neutral-800);")}><span style={css("font-size:13.5px;")}>Alertes de facturation</span><span className="tag tag-accent">Activées</span></div>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--color-neutral-800);")}><span style={css("font-size:13.5px;")}>Incidents de service</span><span className="tag tag-accent">Activées</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
