"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";

const ACTIONS: Array<{ signal: "start" | "restart" | "stop"; label: string }> = [
  { signal: "start", label: "Démarrer" },
  { signal: "restart", label: "Redémarrer" },
  { signal: "stop", label: "Arrêter" },
];

export function PowerActions({ serverId }: { serverId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async (signal: string) => {
    setPending(signal);
    setError(null);
    try {
      await apiFetch(`/servers/${serverId}/power`, {
        method: "POST",
        body: JSON.stringify({ signal }),
      });
      router.refresh();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Action impossible");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        {ACTIONS.map((action) => (
          <button
            key={action.signal}
            onClick={() => send(action.signal)}
            disabled={pending !== null}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            {pending === action.signal ? "..." : action.label}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
