"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "@/lib/css";
import { getCurrentUser } from "@/lib/auth";

const navItems: { label: string; icon: string; badge?: string; href: string }[] = [
	{ label: "Vue d'ensemble", icon: "ph ph-squares-four", href: "/panel" },
	{ label: "Mes services", icon: "ph ph-hard-drives", badge: "3", href: "/panel/services" },
	{ label: "Facturation", icon: "ph ph-receipt", href: "/panel/invoices" },
	{ label: "Support", icon: "ph ph-lifebuoy", badge: "1", href: "/panel/tickets" },
	{ label: "Paramètres", icon: "ph ph-gear-six", href: "/panel/settings" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const user = await getCurrentUser()

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
				<span className="text-sm text-[color-mix(in srgb, var(--color-text) 60%, transparent)]">Espace client</span>
				<div className="ml-auto flex items-center gap-5">
					<i className="ph ph-bell text-lg text-[color-mix(in srgb, var(--color-text) 62%, transparent)]"/>
					<span className="flex items-center gap-2 text-sm">
						{/* <span style={css("width:30px;height:30px;border-radius:50%;background:var(--color-accent-800);display:grid;place-items:center;font-family:var(--font-heading);font-size:12.5px;color:var(--color-accent-200);")}>LM</span> */}
						<span className="text-[color-mix(in srgb, var(--color-text) 82%, transparent)]">{user?.firstName} {user?.lastName}</span>
					</span>
				</div>
			</header>

			<div className="flex-1 flex items-stretch">
				{/* SIDEBAR */}
				<aside className="w-3xs flex-none border-r border-r-[var(--color-divider)] py-5 px-3.5 flex flex-col gap-1 [background:color-mix(in srgb, var(--color-surface) 30%, transparent)]">
					<p className="font-[var(--font-heading)] text-xs tracking-widest uppercase text-[color-mix(in srgb, var(--color-text) 45%, transparent)] mt-1 mx-2.5 mb-2.5">Mon compte</p>
					{navItems.map((n) => {
						const on = n.href === "/panel" ? pathname === "/panel" : pathname.startsWith(n.href);
						return (
							<Link
								key={n.href}
								href={n.href}
								className="flex items-center gap-3 w-full font-[var(--font-body)] text-sm font-medium py-2.5 px-3 border-0 rounded-lg cursor-pointer [transition:background .15s, color .15s] box-border"
								style={css(
									(on
										? "background:color-mix(in srgb, var(--color-accent) 15%, transparent);color:var(--color-accent);"
										: "background:transparent;color:color-mix(in srgb, var(--color-text) 66%, transparent);")
								)}
							>
								<i className={n.icon+"text-lg flex-none"}/>
								<span className="flex-1 text-left">{n.label}</span>
								{n.badge && (
									<span
									className="text-xs font-[var(--font-heading)] rounded-[999px] py-0.5 px-2"
										style={css(
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
					<div className="mt-auto [border:1px solid color-mix(in srgb, var(--color-accent) 26%, transparent)] rounded-xl [background:color-mix(in srgb, var(--color-accent-900) 40%, transparent)] p-3.5">
						<p className="font-[var(--font-heading)] font-semibold text-sm m-0" >Crédit de parrainage</p>
						<p className="text-xs text-[color-mix(in srgb, var(--color-text) 68%, transparent)] mt-1.5 mx-0 mb-2.5">Invitez un ami, gagnez 5 € chacun.</p>
						<button type="button" className="text-xs w-full box-border text-center">Partager mon lien</button>
					</div>
				</aside>

				{/* MAIN */}
				<main className="flex-1 min-w-0 [padding:clamp(20px,3vw,36px)] max-w-5xl">
					{children}
				</main>
			</div>
		</div>
	);
}
