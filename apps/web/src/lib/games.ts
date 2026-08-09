import { API_URL } from "./api";
import type { Game } from "./types";

export async function getGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${API_URL}/games`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
