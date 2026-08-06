import Link from "next/link";
import { getGames } from "@/lib/games";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Nos jeux</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}/checkout`}
            className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-6 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <h2 className="text-lg font-semibold">{game.name}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {game.ramMinGo} Go RAM · {game.cpuMinCores} vCPU · {game.diskMinGo} Go disque
            </p>
            <p className="mt-auto text-xl font-semibold">
              {game.monthlyPrice} € <span className="text-sm font-normal">/ mois</span>
            </p>
          </Link>
        ))}
        {games.length === 0 && (
          <p className="text-zinc-600 dark:text-zinc-400">
            Aucun jeu disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
