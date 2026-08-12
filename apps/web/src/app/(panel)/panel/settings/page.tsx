import { css } from "@/lib/css";
import { h1 } from "../_lib/shared";

export default function PanelSettingsPage() {
  return (
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
  );
}
