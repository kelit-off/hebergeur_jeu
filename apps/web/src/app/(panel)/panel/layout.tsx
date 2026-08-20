"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "@/lib/css";

const navItems: { label: string; icon: string; badge?: string; href: string }[] = [
	{ label: "Vue d'ensemble", icon: "ph ph-squares-four", href: "/panel" },
	{ label: "Mes services", icon: "ph ph-hard-drives", badge: "3", href: "/panel/services" },
	{ label: "Facturation", icon: "ph ph-receipt", href: "/panel/invoices" },
	{ label: "Support", icon: "ph ph-lifebuoy", badge: "1", href: "/panel/tickets" },
	{ label: "Paramètres", icon: "ph ph-gear-six", href: "/panel/settings" },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="
			min-h-screen
			flex
			flex-col
			[background:radial-gradient(1200px_700px_at_88%_-220px,color-mix(in_srgb,var(--color-accent-900)_58%,transparent),transparent_60%),var(--color-bg)]
			text-[var(--color-text)]
			font-[var(--font-body)]
			[text-wrap:pretty]
		">
			{/* TOP BAR */}
			<header className="
				sticky
				top-0
				z-50
				flex
				items-center
				gap-5
				py-3 px-[clamp(16px,3vw,32px)]
				backdrop-blur-md
				[background:color-mix(in srgb, var(--color-bg) 82%, transparent)]
				border
				border-[var(--color-divider)]
			">
			{/* style={css("position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:20px;padding:12px clamp(16px,3vw,32px);backdrop-filter:blur(12px);background:color-mix(in srgb, var(--color-bg) 82%, transparent);border-bottom:1px solid var(--color-divider);")}> */}
				<Link href="/" className="
					decoration-none
					flex
					items-center
					gap-2.5
					font-[var(--font-heading)]
					font-semibold
					text-lg
					text-[var(--color-text)]
					tracking-[-.01em]
				">
				{/* // style={css("text-decoration:none;display:flex;align-items:center;gap:10px;font-family:var(--font-heading);font-weight:600;font-size:18px;color:var(--color-text);letter-spacing:-.01em;")}> */}
					<span className="
						inline-grid
						place-items-center
						w-6 h-6
						rounded-
						[background:radial-gradient(circle at 30% 25%, var(--color-accent-400), var(--color-accent-700))]
						[box-shadow:0 0 16px color-mix(in srgb, var(--color-accent) 55%, transparent)]
					">
					{/* style={css("display:inline-grid;place-items:center;width:25px;height:25px;border-radius:8px;background:radial-gradient(circle at 30% 25%, var(--color-accent-400), var(--color-accent-700));box-shadow:0 0 16px color-mix(in srgb, var(--color-accent) 55%, transparent);")}> */}
						<span className="w-2 h-2 rounded-[50%] [background:var(--color-accent-100)]" />
					</span>
					Zenith
				</Link>
				<span className="w-0.5 h-5 [background:var(--color-divider)]" />
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
						const on = n.href === "/panel" ? pathname === "/panel" : pathname.startsWith(n.href);
						return (
							<Link
								key={n.href}
								href={n.href}
								className="navitem"
								style={css(
									"display:flex;align-items:center;gap:12px;width:100%;font-family:var(--font-body);font-size:14px;font-weight:500;padding:10px 12px;border:0;border-radius:9px;cursor:pointer;transition:background .15s, color .15s;text-decoration:none;box-sizing:border-box;" +
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
							</Link>
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
					{children}
				</main>
			</div>
		</div>
	);
}
