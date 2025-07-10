import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des locales supportées
const locales = ["en", "fr", "es", "it", "de"];
// Locale par défaut
const defaultLocale = "fr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si on est à la racine du site (ex: "/")
  if (pathname === "/") {
    // Exemple d'obtention de la langue préférée de l'utilisateur
    const acceptLang = request.headers.get("accept-language");
    const preferredLocale =
      acceptLang?.split(",")[0].split("-")[0] ?? defaultLocale;

    // Choix de la locale à rediriger
    const locale = locales.includes(preferredLocale)
      ? preferredLocale
      : defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    return NextResponse.redirect(url);
  }

  // On vérifie l'URL et on l'intègre dans le header
  const hostWithoutWww = (request.headers.get('host') ?? '').replace(/^www\./, '');
  const res = NextResponse.next();
  res.headers.set('x-website', hostWithoutWww);

  // Laisser passer tout le reste
  return res;
}

// Appliquer uniquement sur la racine
export const config = {
  matcher: "/",
};
