import type { Game } from '@prisma/client';

export function computeMonthlyPrice(
  game: Pick<
    Game,
    | 'ramMinGo'
    | 'cpuMinCores'
    | 'diskMinGo'
    | 'prix_unitaire_ram'
    | 'prix_unitaire_cpu'
    | 'prix_unitaire_disk'
  >,
): number {
  return (
    game.ramMinGo * game.prix_unitaire_ram +
    game.cpuMinCores * game.prix_unitaire_cpu +
    game.diskMinGo * game.prix_unitaire_disk
  );
}
