import { notFound } from "next/navigation";
import { serverApiFetch, ApiError } from "@/lib/api";
import type { GameServer } from "@/lib/types";
import { StatusBadge } from "../../status-badge";
import { PowerActions } from "./power-actions";

async function getServer(id: string): Promise<GameServer | null> {
  try {
    return await serverApiFetch(`/servers/${id}`);
  } catch (e) {
    if (e instanceof ApiError && (e.status === 404 || e.status === 403)) {
      return null;
    }
    throw e;
  }
}

export default async function ServerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const server = await getServer(id);
  if (!server) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{server.name}</h1>
        <StatusBadge status={server.status} />
      </div>

      <dl className="mb-8 grid grid-cols-2 gap-4 rounded-lg border border-zinc-200 p-6 text-sm dark:border-zinc-800">
        <div>
          <dt className="text-zinc-500">Jeu</dt>
          <dd className="font-medium">{server.game.name}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Ressources</dt>
          <dd className="font-medium">
            {server.ramGo} Go RAM · {server.cpuCores} vCPU · {server.diskGo} Go disque
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Prix mensuel</dt>
          <dd className="font-medium">{server.prixMensuel} €</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Renouvellement</dt>
          <dd className="font-medium">
            {server.expiresAt ? new Date(server.expiresAt).toLocaleDateString("fr-FR") : "—"}
          </dd>
        </div>
      </dl>

      {server.pterodactylIdentifier ? (
        <PowerActions serverId={server.id} />
      ) : (
        <p className="text-sm text-zinc-500">
          Ce serveur n&apos;est pas encore provisionné sur le panel Pterodactyl.
        </p>
      )}
    </div>
  );
}
