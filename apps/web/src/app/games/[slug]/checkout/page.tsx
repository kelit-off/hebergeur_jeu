import { notFound } from "next/navigation";
import { API_URL } from "@/lib/api";
import type { Game } from "@/lib/types";
import { CheckoutForm } from "./checkout-form";

async function getGame(slug: string): Promise<Game | null> {
  const res = await fetch(`${API_URL}/games/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) notFound();

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-6 py-16">
      <h1 className="mb-2 text-2xl font-semibold">{game.name}</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        {game.ramMinGo} Go RAM · {game.cpuMinCores} vCPU · {game.diskMinGo} Go disque —{" "}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
          {game.monthlyPrice} € / mois
        </span>
      </p>
      <CheckoutForm game={game} />
    </div>
  );
}
