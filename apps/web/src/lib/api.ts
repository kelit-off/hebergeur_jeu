export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/v1";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function parseResponse(res: Response) {
  const contentType = res.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    const message = body?.message ?? `Erreur ${res.status}`;
    throw new ApiError(Array.isArray(message) ? message.join(", ") : message, res.status);
  }

  return body;
}

/** Pour les Client Components : le cookie httpOnly est envoyé automatiquement par le navigateur. */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return parseResponse(res);
}

/**
 * Pour les Server Components : il n'y a pas de jar de cookies navigateur côté serveur,
 * il faut donc lire le cookie entrant via next/headers et le transmettre manuellement.
 */
export async function serverApiFetch(path: string, options: RequestInit = {}) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options.headers,
    },
    cache: "no-store",
  });
  return parseResponse(res);
}
