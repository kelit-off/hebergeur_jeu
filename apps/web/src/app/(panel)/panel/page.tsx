import Link from "next/link";
import { css } from "@/lib/css";
import { services, pill, dot, statCard, statHead, statNum, h1 } from "./_lib/shared";

export default function PanelHomePage() {
	return (
		<div>
			<p style={css("font-size:13px;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:0 0 4px;")}>Bonjour Lucas,</p>
			<h1 style={css(h1 + "margin:0 0 28px;")}>Vue d&apos;ensemble</h1>

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
				<Link href="/panel/services" className="btn btn-ghost" style={css("font-size:13px;text-decoration:none;")}>Tout voir</Link>
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
							<Link href="/panel/services" className="btn btn-secondary" style={css("font-size:12.5px;white-space:nowrap;text-decoration:none;")}>Gérer</Link>
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
					<Link href="/panel/invoices" className="btn btn-ghost" style={css("font-size:13px;text-decoration:none;")}>Historique de facturation</Link>
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
	);
}
