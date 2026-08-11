import Link from "next/link";
import { css } from "@/lib/css";

type Key = "accueil" | "jeux" | "tarifs" | "statut";

const links: { href: string; label: string; key: Key }[] = [
  { href: "/", label: "Accueil", key: "accueil" },
  { href: "/jeux", label: "Jeux", key: "jeux" },
  { href: "/tarifs", label: "Tarifs", key: "tarifs" },
  { href: "/#statut", label: "Statut", key: "statut" },
];

export default function SiteNav({ current }: { current?: Key }) {
  return (
    <nav
      style={css(
        "position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:28px;padding:13px clamp(20px,5vw,72px);backdrop-filter:blur(12px);background:color-mix(in srgb, var(--color-bg) 78%, transparent);border-bottom:1px solid var(--color-divider);"
      )}
    >
      <Link
        href="/"
        style={css(
          "text-decoration:none;display:flex;align-items:center;gap:11px;font-family:var(--font-heading);font-weight:600;font-size:19px;color:var(--color-text);letter-spacing:-.01em;"
        )}
      >
        <span
          style={css(
            "display:inline-grid;place-items:center;width:26px;height:26px;border-radius:8px;background:radial-gradient(circle at 30% 25%, var(--color-accent-400), var(--color-accent-700));box-shadow:0 0 16px color-mix(in srgb, var(--color-accent) 55%, transparent);"
          )}
        >
          <span
            style={css(
              "width:8px;height:8px;border-radius:50%;background:var(--color-accent-100);box-shadow:0 0 6px var(--color-accent-100);"
            )}
          />
        </span>
        Zenith
      </Link>

      <div style={css("display:flex;gap:26px;margin-left:14px;font-size:14px;")}>
        {links.map((l) => {
          const active = l.key === current;
          return (
            <Link
              key={l.key}
              href={l.href}
              className={active ? undefined : "navlink"}
              style={css(
                active
                  ? "text-decoration:none;color:var(--color-accent);"
                  : "text-decoration:none;color:color-mix(in srgb, var(--color-text) 66%, transparent);"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <div style={css("margin-left:auto;display:flex;gap:11px;align-items:center;")}>
        <Link href="/panel" className="btn btn-secondary" style={css("text-decoration:none;font-size:13px;")}>
          Espace client
        </Link>
        <Link href="/tarifs" className="btn btn-primary" style={css("text-decoration:none;font-size:13px;")}>
          Commencer
        </Link>
      </div>
    </nav>
  );
}
