import Link from "next/link";
import { css } from "@/lib/css";

function BrandMark({ size = 24 }: { size?: number }) {
  const inner = Math.round(size * 0.29);
  return (
    <span
      style={css(
        `display:inline-grid;place-items:center;width:${size}px;height:${size}px;border-radius:7px;background:radial-gradient(circle at 30% 25%, var(--color-accent-400), var(--color-accent-700));box-shadow:0 0 14px color-mix(in srgb, var(--color-accent) 50%, transparent);`
      )}
    >
      <span
        style={css(
          `width:${inner}px;height:${inner}px;border-radius:50%;background:var(--color-accent-100);`
        )}
      />
    </span>
  );
}

/** Compact one-line footer used on the Jeux and Tarifs pages. */
export function CompactFooter() {
  return (
    <footer style={css("border-top:1px solid var(--color-divider);")}>
      <div
        style={css(
          "max-width:1200px;margin:0 auto;padding:40px clamp(20px,5vw,72px);display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:12.5px;color:color-mix(in srgb, var(--color-text) 50%, transparent);"
        )}
      >
        <span
          style={css(
            "display:flex;align-items:center;gap:10px;font-family:var(--font-heading);font-weight:600;font-size:15px;color:color-mix(in srgb, var(--color-text) 80%, transparent);"
          )}
        >
          <BrandMark size={22} />
          Zenith
        </span>
        <span>© 2026 Zenith Hosting · Propulsé par Pterodactyl</span>
      </div>
    </footer>
  );
}

const cols = [
  {
    title: "Produit",
    links: [
      { label: "Jeux supportés", href: "/jeux" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Espace client", href: "/panel" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Statut des services", href: "/#statut" },
      { label: "Documentation", href: "/" },
      { label: "Contact 24/7", href: "/" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "CGV", href: "/" },
      { label: "Confidentialité", href: "/" },
    ],
  },
];

/** Full four-column footer used on the home page. */
export function FullFooter() {
  return (
    <footer style={css("border-top:1px solid var(--color-divider);")}>
      <div
        style={css(
          "max-width:1200px;margin:0 auto;padding:44px clamp(20px,5vw,72px);display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px;"
        )}
      >
        <div>
          <span
            style={css(
              "display:flex;align-items:center;gap:11px;font-family:var(--font-heading);font-weight:600;font-size:18px;"
            )}
          >
            <BrandMark size={24} />
            Zenith
          </span>
          <p
            style={css(
              "font-size:13px;line-height:1.6;color:color-mix(in srgb, var(--color-text) 55%, transparent);margin:14px 0 0;max-width:34ch;"
            )}
          >
            Hébergement de serveurs de jeu et de bots Discord, propulsé par Pterodactyl.
          </p>
        </div>
        {cols.map((col) => (
          <div
            key={col.title}
            style={css("font-size:13.5px;display:flex;flex-direction:column;gap:10px;")}
          >
            <span
              style={css(
                "font-family:var(--font-heading);font-weight:600;color:color-mix(in srgb, var(--color-text) 60%, transparent);margin-bottom:2px;"
              )}
            >
              {col.title}
            </span>
            {col.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={css("text-decoration:none;color:color-mix(in srgb, var(--color-text) 78%, transparent);")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div
        style={css(
          "max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,72px) 40px;font-size:12.5px;color:color-mix(in srgb, var(--color-text) 45%, transparent);"
        )}
      >
        © 2026 Zenith Hosting. Pterodactyl est une marque de ses détenteurs respectifs.
      </div>
    </footer>
  );
}
