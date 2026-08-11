"use client";

import { useRef, useState } from "react";
import { css } from "@/lib/css";

/**
 * Drop-in replacement for the prototype's <image-slot>. Shows a labelled
 * placeholder; click to pick a local image (preview only). Wire this to your
 * real asset pipeline / <Image> when you integrate.
 */
export default function ImageSlot({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={className}
      style={css(
        "width:100%;height:100%;border:0;padding:0;cursor:pointer;position:relative;display:grid;place-items:center;overflow:hidden;background:color-mix(in srgb, var(--color-accent-900) 55%, var(--color-surface));"
      )}
      aria-label={`Image : ${label}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          style={css("width:100%;height:100%;object-fit:cover;")}
        />
      ) : (
        <span
          style={css(
            "display:flex;flex-direction:column;align-items:center;gap:8px;color:color-mix(in srgb, var(--color-text) 60%, transparent);font-family:var(--font-heading);font-size:13px;"
          )}
        >
          <i className="ph ph-image" style={css("font-size:26px;color:var(--color-accent);")} />
          {label}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onPick}
        style={css("display:none;")}
      />
    </button>
  );
}
