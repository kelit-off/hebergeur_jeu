import { css } from "@/lib/css";
import { tickets, pill, h1 } from "../_lib/shared";

export default function PanelTicketsPage() {
  return (
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
  );
}
