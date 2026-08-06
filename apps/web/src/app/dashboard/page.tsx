import Link from "next/link";
import { serverApiFetch } from "@/lib/api";
import type { GameServer } from "@/lib/types";
import { StatusBadge } from "./status-badge";

async function getServers(): Promise<GameServer[]> {
  try {
    return await serverApiFetch("/servers");
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const servers = await getServers();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Mes serveurs</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/dashboard/support" className="hover:underline">
            Support
          </Link>
          <Link
            href="/games"
            className="rounded-full bg-zinc-900 px-4 py-1.5 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Nouveau serveur
          </Link>
        </div>
      </div>

      {servers.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          Aucun serveur pour le moment.{" "}
          <Link href="/games" className="underline">
            Choisis un jeu
          </Link>{" "}
          pour en créer un.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {servers.map((server) => (
            <Link
              key={server.id}
              href={`/dashboard/servers/${server.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <div>
                <p className="font-medium">{server.name}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {server.game.name} · {server.ramGo} Go RAM · {server.cpuCores} vCPU
                </p>
              </div>
              <StatusBadge status={server.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
