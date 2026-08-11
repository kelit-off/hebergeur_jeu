import type { CSSProperties } from "react";

/**
 * Turn a plain CSS declaration string into a React style object.
 *
 * The Nocturne design leans hard on `color-mix()`, layered radial gradients,
 * and exact token values — things Tailwind utilities express poorly. Rather
 * than lossy-convert every one, the ported pages keep the original CSS text
 * and pass it through here. Structural layout still uses Tailwind classes;
 * you can migrate any of these to utilities incrementally.
 *
 *   <div style={css("display:flex;gap:14px;color:var(--color-accent)")} />
 */
export function css(text: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const rule of text.split(";")) {
    const i = rule.indexOf(":");
    if (i === -1) continue;
    const prop = rule
      .slice(0, i)
      .trim()
      .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    const val = rule.slice(i + 1).trim();
    if (prop) out[prop] = val;
  }
  return out as CSSProperties;
}
