import Link from "next/link";
import { css } from "@/lib/css";
import { services, pill, dot, h1, label } from "../_lib/shared";

export default function PanelServicesPage() {
  return (
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
        <div><p style={css("font-family:var(--font-heading);font-weight:600;font-size:15px;margin:0;")}>Besoin d&apos;un nouveau serveur ?</p><p style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin:5px 0 0;")}>Déployez un jeu ou un bot en moins d&apos;une minute.</p></div>
        <Link href="/tarifs" className="btn btn-primary" style={css("text-decoration:none;font-size:13.5px;display:inline-flex;align-items:center;gap:7px;")}><i className="ph ph-plus" />Commander un service</Link>
      </div>
    </div>
  );
}
