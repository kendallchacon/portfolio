import { getAbsoluteLocaleUrl } from "astro:i18n";
import type { SectionId } from "../data/types";

export const defaultLang = "es";
export const locales = ["es", "en"] as const;
export type Lang = (typeof locales)[number];

const es = {
  "meta.siteName": "Portafolio de Kendall Chacón",
  "meta.title": "Kendall Chacón | Desarrollador backend y full stack",
  "meta.description":
    "Desarrollador backend y full stack disponible para proyectos y empleo. APIs, aplicaciones web y móviles, e infraestructura.",
  "a11y.skipLink": "Saltar al contenido",
  "a11y.newTab": "(se abre en una pestaña nueva)",
  "nav.brand": "~/kendall",
  "nav.home": "Kendall Chacón, inicio",
  "nav.label": "Secciones principales",
  "nav.servicios": "Servicios",
  "nav.experiencia": "Experiencia",
  "nav.proyectos": "Proyectos",
  "nav.criterio": "Criterio",
  "nav.contacto": "Contacto",
  "nav.menu.open": "Abrir menú",
  "nav.menu.close": "Cerrar menú",
  "nav.menu.label": "Menú de secciones",
  "lang.group": "Idioma",
  "footer.tagline": 'git commit -m "gracias por leer"',
  "footer.top": "Volver arriba",
  "footer.contactLabel": "Enlaces de contacto",
} as const;

const en: Record<keyof typeof es, string> = {
  "meta.siteName": "Kendall Chacón's portfolio",
  "meta.title": "Kendall Chacón | Backend and full stack developer",
  "meta.description":
    "Backend and full stack developer available for projects and employment. APIs, web and mobile applications, and infrastructure.",
  "a11y.skipLink": "Skip to content",
  "a11y.newTab": "(opens in a new tab)",
  "nav.brand": "~/kendall",
  "nav.home": "Kendall Chacón, home",
  "nav.label": "Main sections",
  "nav.servicios": "Services",
  "nav.experiencia": "Experience",
  "nav.proyectos": "Projects",
  "nav.criterio": "Judgment",
  "nav.contacto": "Contact",
  "nav.menu.open": "Open menu",
  "nav.menu.close": "Close menu",
  "nav.menu.label": "Sections menu",
  "lang.group": "Language",
  "footer.tagline": 'git commit -m "thanks for reading"',
  "footer.top": "Back to top",
  "footer.contactLabel": "Contact links",
};

export const ui = { es, en } as const;

export type UiKey = keyof typeof es;

/** Devuelve la función de traducción para un idioma. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Quita el prefijo del idioma de una ruta: "/en/proyectos" → "/proyectos". */
export function stripLangPrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** URLs absolutas de cada idioma para la ruta indicada (hreflang). */
export function alternateUrls(pathname: string): Record<Lang | "x-default", string> {
  const path = stripLangPrefix(pathname);
  const es = getAbsoluteLocaleUrl("es", path);
  return {
    es,
    en: getAbsoluteLocaleUrl("en", path),
    "x-default": es,
  };
}

/** Código og:locale de cada idioma. */
export const ogLocale: Record<Lang, string> = {
  es: "es_CR",
  en: "en_US",
};

/** Secciones con enlace en el navbar y en la hoja móvil, en orden. */
export const navSections = [
  "servicios",
  "experiencia",
  "proyectos",
  "criterio",
  "contacto",
] as const satisfies readonly SectionId[];
export type NavSectionId = (typeof navSections)[number];

/** Enlace a una sección de la portada del idioma: "/#id" en español, "/en/#id" en inglés. */
export function sectionHref(id: SectionId, lang: Lang): string {
  return lang === "en" ? `/en/#${id}` : `/#${id}`;
}

/**
 * Rutas (sin prefijo de idioma) que existen en español y en inglés. Súmale cada ruta
 * nueva que se publique en ambos idiomas; las demás enlazan a la portada del otro idioma.
 */
export const translatedRoutes: readonly string[] = ["/"];

/** Ruta a la que lleva el selector de idioma desde la página actual. */
export function languageSwitchUrl(pathname: string, target: Lang): string {
  const path = stripLangPrefix(pathname);
  const route = path === "/" ? path : path.replace(/\/+$/, "");
  const url = translatedRoutes.includes(route)
    ? alternateUrls(pathname)[target]
    : getAbsoluteLocaleUrl(target, "/");
  return new URL(url).pathname;
}
