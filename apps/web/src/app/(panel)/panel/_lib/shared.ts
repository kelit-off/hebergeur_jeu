export const services = [
  { name: "SkyBloc Survival", plan: "Sommet · 8 Go", specs: "8 Go RAM · 4 vCPU · 50 Go NVMe", host: "play.skybloc.gg:25565", price: "17,99 €", renew: "1er sept. 2026", icon: "ph ph-cube", online: true },
  { name: "Palworld — Les Potes", plan: "Voyageur · 4 Go", specs: "4 Go RAM · 2 vCPU · 25 Go NVMe", host: "pal.zenith.gg:8211", price: "9,99 €", renew: "1er sept. 2026", icon: "ph ph-paw-print", online: true },
  { name: "Bot Modération", plan: "Standard · 1 Go", specs: "1 Go RAM · 1 vCPU · 10 Go NVMe", host: "node-fr-03 · conteneur", price: "3,49 €", renew: "1er sept. 2026", icon: "ph ph-robot", online: false },
];

export const invoices = [
  { id: "#ZN-2026-081", date: "1 août 2026", amount: "23,97 €" },
  { id: "#ZN-2026-072", date: "1 juillet 2026", amount: "23,97 €" },
  { id: "#ZN-2026-063", date: "1 juin 2026", amount: "23,97 €" },
  { id: "#ZN-2026-054", date: "1 mai 2026", amount: "14,98 €" },
  { id: "#ZN-2026-045", date: "1 avril 2026", amount: "14,98 €" },
];

export const tickets = [
  { subject: "Ajout d'un slot RAM sur SkyBloc", status: "Ouvert", open: true, meta: "#4821 · Facturation · mis à jour il y a 2 h", icon: "ph ph-chat-circle-dots" },
  { subject: "Bot Discord ne redémarre plus", status: "Répondu", open: false, meta: "#4790 · Technique · agent : Nadia", icon: "ph ph-wrench" },
  { subject: "Migration région Paris → Roubaix", status: "Fermé", open: false, meta: "#4655 · Technique · résolu le 12 juil.", icon: "ph ph-check-circle" },
  { subject: "Question sur la garantie 72 h", status: "Fermé", open: false, meta: "#4602 · Général · résolu le 3 juil.", icon: "ph ph-question" },
];

const pillBase =
  "display:inline-flex;align-items:center;gap:6px;font-size:11px;font-family:var(--font-heading);padding:3px 10px;border-radius:999px;white-space:nowrap;letter-spacing:.02em;";
export function pill(kind: "online" | "ok" | "muted") {
  if (kind === "online" || kind === "ok")
    return pillBase + "background:color-mix(in srgb, var(--color-accent) 16%, transparent);color:var(--color-accent-200);";
  return pillBase + "background:color-mix(in srgb, var(--color-text) 8%, transparent);color:color-mix(in srgb, var(--color-text) 55%, transparent);";
}
export function dot(online: boolean) {
  return (
    "width:7px;height:7px;border-radius:50%;background:" +
    (online ? "var(--color-accent-400);box-shadow:0 0 7px var(--color-accent-400)" : "color-mix(in srgb, var(--color-text) 40%, transparent)") +
    ";"
  );
}

export const statCard = "border:1px solid var(--color-neutral-800);border-radius:14px;background:color-mix(in srgb, var(--color-surface) 55%, transparent);padding:18px;";
export const statHead = "display:flex;align-items:center;gap:8px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:color-mix(in srgb, var(--color-text) 55%, transparent);";
export const statNum = "font-family:var(--font-heading);font-weight:600;font-size:34px;margin:12px 0 0;letter-spacing:-.02em;";
export const h1 = "font-family:var(--font-heading);font-weight:600;font-size:clamp(26px,3.2vw,36px);letter-spacing:-.02em;";
export const label = "font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:color-mix(in srgb, var(--color-text) 48%, transparent);margin:0;";
