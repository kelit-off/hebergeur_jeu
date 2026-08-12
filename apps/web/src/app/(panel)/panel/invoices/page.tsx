import { css } from "@/lib/css";
import { invoices, pill, h1 } from "../_lib/shared";

export default function PanelInvoicesPage() {
  return (
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
  );
}
