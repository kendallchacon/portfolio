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
  "nav.inicio": "Inicio",
  "nav.servicios": "Servicios",
  "nav.sobre-mi": "Sobre mí",
  "nav.experiencia": "Experiencia",
  "nav.proyectos": "Proyectos",
  "nav.criterio": "Criterio",
  "nav.contacto": "Contacto",
  "nav.menu.open": "Abrir menú",
  "nav.menu.close": "Cerrar menú",
  "nav.menu.label": "Menú de secciones",
  "nav.search": "Buscar…",
  "palette.open": "Buscar: abrir paleta de comandos",
  "palette.openMenu": "Ir a…",
  "palette.label": "Paleta de comandos",
  "palette.input": "Buscar secciones y acciones",
  "palette.placeholder": "Ir a una sección o ejecutar una acción…",
  "palette.group.goto": "Ir a",
  "palette.group.actions": "Acciones",
  "palette.action.open": "Abrir",
  "palette.action.copyEmail": "Copiar correo",
  "palette.action.lang": "Cambiar idioma",
  "palette.copied": "Copiado",
  "palette.results.one": "resultado",
  "palette.results.other": "resultados",
  "palette.empty": "Sin resultados",
  "lang.group": "Idioma",
  "footer.tagline": 'git commit -m "gracias por leer"',
  "footer.top": "Volver arriba",
  "footer.contactLabel": "Enlaces de contacto",
  "home.title": "Kendall Chacón | Desarrollador backend y full stack",
  "home.description":
    "Desarrollador backend y full stack disponible para proyectos y empleo en Costa Rica o remoto. APIs, bases de datos y apps web y móviles con .NET y Laravel.",
  "home.logos.label": "Tecnologías con las que trabajo",
  "home.evidence.label": "Logros y evidencias",
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
  "nav.inicio": "Home",
  "nav.servicios": "Services",
  "nav.sobre-mi": "About me",
  "nav.experiencia": "Experience",
  "nav.proyectos": "Projects",
  "nav.criterio": "Judgment",
  "nav.contacto": "Contact",
  "nav.menu.open": "Open menu",
  "nav.menu.close": "Close menu",
  "nav.menu.label": "Sections menu",
  "nav.search": "Search…",
  "palette.open": "Search: open command palette",
  "palette.openMenu": "Go to…",
  "palette.label": "Command palette",
  "palette.input": "Search sections and actions",
  "palette.placeholder": "Go to a section or run an action…",
  "palette.group.goto": "Go to",
  "palette.group.actions": "Actions",
  "palette.action.open": "Open",
  "palette.action.copyEmail": "Copy email",
  "palette.action.lang": "Change language",
  "palette.copied": "Copied",
  "palette.results.one": "result",
  "palette.results.other": "results",
  "palette.empty": "No results",
  "lang.group": "Language",
  "footer.tagline": 'git commit -m "thanks for reading"',
  "footer.top": "Back to top",
  "footer.contactLabel": "Contact links",
  "home.title": "Kendall Chacón | Backend and full stack developer",
  "home.description":
    "Backend and full stack developer available for projects and roles in Costa Rica or remote. APIs, databases and web and mobile apps with .NET and Laravel.",
  "home.logos.label": "Technologies I work with",
  "home.evidence.label": "Achievements and evidence",
};

export const ui = { es, en } as const;

export type UiKey = keyof typeof es;

/** Idioma de `Astro.currentLocale`; el predeterminado si no coincide con ninguno. */
export function langFrom(locale: string | undefined): Lang {
  return locales.find((l) => l === locale) ?? defaultLang;
}

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

/** Secciones de la paleta de comandos ("Ir a"), en orden del documento. */
export const paletteSections = [
  "inicio",
  "servicios",
  "sobre-mi",
  "experiencia",
  "proyectos",
  "criterio",
  "contacto",
] as const satisfies readonly SectionId[];

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
