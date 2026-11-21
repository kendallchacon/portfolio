import { getAbsoluteLocaleUrl } from "astro:i18n";

export const defaultLang = "es";
export const locales = ["es", "en"] as const;
export type Lang = (typeof locales)[number];

const es = {
  "meta.siteName": "Portafolio de Kendall Chacón",
  "meta.title": "Kendall Chacón | Desarrollador backend y full stack",
  "meta.description":
    "Desarrollador backend y full stack disponible para proyectos y empleo. APIs, aplicaciones web y móviles, e infraestructura.",
  "a11y.skipLink": "Saltar al contenido",
} as const;

const en: Record<keyof typeof es, string> = {
  "meta.siteName": "Kendall Chacón's portfolio",
  "meta.title": "Kendall Chacón | Backend and full stack developer",
  "meta.description":
    "Backend and full stack developer available for projects and employment. APIs, web and mobile applications, and infrastructure.",
  "a11y.skipLink": "Skip to content",
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
