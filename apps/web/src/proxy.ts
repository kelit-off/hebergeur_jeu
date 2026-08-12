import { NextRequest, NextResponse } from "next/server";

// Ne vérifie que la PRÉSENCE du cookie, pas sa validité — Proxy tourne dans
// l'edge runtime et n'a pas accès à JWT_SECRET. La vraie autorisation est
// toujours appliquée par JwtAuthGuard côté API ; ceci n'est qu'un raccourci
// UX pour éviter un aller-retour inutile.
export function proxy(request: NextRequest) {
  const hasToken = request.cookies.has("access_token");

  if (!hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*"],
};
