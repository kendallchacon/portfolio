import { getAbsoluteLocaleUrl } from "astro:i18n";
import type { ProjectSlug } from "../data/projects";
import type { ExperienceId, SectionId } from "../data/types";

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
  "home.services.path": "cd ~/servicios",
  "home.services.title": "Qué puedo hacer por tu equipo",
  "home.services.lead":
    "Cuatro áreas donde ya entregué trabajo. Debajo de cada una están las referencias donde puedes comprobarlo.",
  "home.services.tech": "Tecnologías",
  "home.services.refs": "Referencias",
  "home.services.privateRepo": "(repositorio privado)",
  "home.services.apiLogCaption": "Registro de solicitudes y respuestas de autenticación e invitaciones de equipo; rutas bajo /api/v1",
  "home.services.ciPass": "pasa",
  "home.about.path": "cd ~/sobre-mi",
  "home.about.title": "Un poco de mí, en mi idioma",
  "home.about.log": "Salida de la terminal",
  "home.about.input": "Escribe un comando",
  "home.about.try": "Prueba:",
  "home.xp.path": "cd ~/experiencia",
  "home.xp.title": "Experiencia",
  "home.xp.lead":
    "Mi historial como un git log: trabajo profesional, proyectos, logros, docencia y formación, con sus evidencias adjuntas. Filtra por rama.",
  "home.xp.filter": "Filtrar por rama",
  "home.xp.all": "todas las ramas",
  "home.xp.count.one": "{n} entrada",
  "home.xp.count.other": "{n} entradas",
  "home.xp.showing": "Mostrando {n} de {total}",
  "home.xp.branch.profesional": "profesional",
  "home.xp.branch.proyectos": "proyectos",
  "home.xp.branch.logros": "logros",
  "home.xp.branch.docencia": "docencia",
  "home.xp.branch.formacion": "formación",
  "home.xp.stories": "Historias destacadas",
  "home.xp.view": "Ver",
  "home.xp.viewer": "Evidencia",
  "home.xp.close": "Cerrar",
  "home.xp.prev": "Anterior",
  "home.xp.next": "Siguiente",
  "home.projects.path": "cd ~/proyectos",
  "home.projects.title": "Proyectos",
  "home.projects.lead": "Producto real, con su stack, mi parte, su estado y los repositorios donde vive.",
  "home.projects.myPart": "Mi parte",
  "home.projects.contents": "Qué hay",
  "home.projects.team": "Equipo",
  "home.projects.commits": "Commits",
  "home.projects.status": "Estado",
  "home.projects.stack": "Stack del proyecto",
  "home.projects.refs": "Repositorios y referencias",
  "home.projects.excerpt": "extracto",
  "home.projects.manual": "paso manual",
  "home.projects.illustrative": "# sufijos de pod ilustrativos",
  "home.projects.rerun": "Volver a ejecutar",
  "case.back": "Proyectos",
  "case.backLabel": "Volver a Proyectos",
  "case.open": "Abrir el caso",
  "case.openNamed": "Abrir el caso de {name}",
  "case.evidence": "Evidencia",
  "case.data": "Datos del proyecto",
  "case.hood": "El proyecto en detalle",
  "case.problem": "El problema",
  "case.built": "Qué construí",
  "case.shots": "Capturas",
  "case.shotsNote": "Datos de demostración.",
  "case.decisions": "Decisiones",
  "case.limits": "Límites",
  "case.decisionWhat": "Qué es",
  "case.decisionEffect": "Efecto",
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
  "home.services.path": "cd ~/servicios",
  "home.services.title": "What I can do for your team",
  "home.services.lead":
    "Four areas where I've already delivered work. Under each one are the references where you can check it.",
  "home.services.tech": "Technologies",
  "home.services.refs": "References",
  "home.services.privateRepo": "(private repository)",
  "home.services.apiLogCaption": "Request and response log of authentication and team invitations; routes under /api/v1",
  "home.services.ciPass": "passes",
  "home.about.path": "cd ~/sobre-mi",
  "home.about.title": "A bit about me, in my own language",
  "home.about.log": "Terminal output",
  "home.about.input": "Type a command",
  "home.about.try": "Try:",
  "home.xp.path": "cd ~/experiencia",
  "home.xp.title": "Experience",
  "home.xp.lead":
    "My history as a git log: professional work, projects, awards, teaching and education, with their evidence attached. Filter by branch.",
  "home.xp.filter": "Filter by branch",
  "home.xp.all": "all branches",
  "home.xp.count.one": "{n} entry",
  "home.xp.count.other": "{n} entries",
  "home.xp.showing": "Showing {n} of {total}",
  "home.xp.branch.profesional": "professional",
  "home.xp.branch.proyectos": "projects",
  "home.xp.branch.logros": "awards",
  "home.xp.branch.docencia": "teaching",
  "home.xp.branch.formacion": "education",
  "home.xp.stories": "Highlighted stories",
  "home.xp.view": "View",
  "home.xp.viewer": "Evidence",
  "home.xp.close": "Close",
  "home.xp.prev": "Previous",
  "home.xp.next": "Next",
  "home.projects.path": "cd ~/proyectos",
  "home.projects.title": "Projects",
  "home.projects.lead": "Real product, with its stack, my part, its status and the repositories where it lives.",
  "home.projects.myPart": "My part",
  "home.projects.contents": "What's inside",
  "home.projects.team": "Team",
  "home.projects.commits": "Commits",
  "home.projects.status": "Status",
  "home.projects.stack": "Project stack",
  "home.projects.refs": "Repositories and references",
  "home.projects.excerpt": "excerpt",
  "home.projects.manual": "manual step",
  "home.projects.illustrative": "# illustrative pod suffixes",
  "home.projects.rerun": "Re-run",
  "case.back": "Projects",
  "case.backLabel": "Back to Projects",
  "case.open": "Open the case",
  "case.openNamed": "Open the {name} case",
  "case.evidence": "Evidence",
  "case.data": "Project data",
  "case.hood": "Under the hood",
  "case.problem": "The problem",
  "case.built": "What I built",
  "case.shots": "Screenshots",
  "case.shotsNote": "Demo data.",
  "case.decisions": "Decisions",
  "case.limits": "Limits",
  "case.decisionWhat": "What it is",
  "case.decisionEffect": "Effect",
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
 * Entradas de experiencia con ancla publicada en la portada (`#xp-<id>`). Las referencias a
 * un id que no esté aquí se muestran sin enlace.
 */
const publishedExperience: readonly ExperienceId[] = [
  "flameware",
  "matchgo",
  "beto-y-mas",
  "cima",
  "infocontexto",
  "scrum-sfc",
  "tutor",
  "puertas-abiertas",
  "campamento-tutores",
  "bachillerato",
  "diplomado",
  "proyectos-java",
];

/** Enlace a una entrada de experiencia, o `undefined` si su ancla aún no existe. */
export function experienceHref(id: ExperienceId, lang: Lang): string | undefined {
  if (!publishedExperience.includes(id)) return undefined;
  return lang === "en" ? `/en/#xp-${id}` : `/#xp-${id}`;
}

/**
 * Casos de proyecto con ruta `/proyectos/<slug>` publicada. Un proyecto fuera de esta lista no
 * recibe enlace desde ninguna tarjeta ni referencia. CIMA entra en 6B.2.
 */
export const publishedProjects = ["matchgo", "beto-y-mas"] as const satisfies readonly ProjectSlug[];
export type PublishedSlug = (typeof publishedProjects)[number];

/** Enlace al caso de un proyecto, o `undefined` si todavía no está publicado. */
export function projectHref(slug: string, lang: Lang): string | undefined {
  if (!(publishedProjects as readonly string[]).includes(slug)) return undefined;
  return lang === "en" ? `/en/proyectos/${slug}` : `/proyectos/${slug}`;
}

/**
 * Rutas (sin prefijo de idioma) que existen en español y en inglés. Los casos publicados se
 * derivan de `publishedProjects`; las demás rutas enlazan a la portada del otro idioma.
 */
export const translatedRoutes: readonly string[] = ["/", ...publishedProjects.map((s) => `/proyectos/${s}`)];

/** Ruta a la que lleva el selector de idioma desde la página actual. */
export function languageSwitchUrl(pathname: string, target: Lang): string {
  const path = stripLangPrefix(pathname);
  const route = path === "/" ? path : path.replace(/\/+$/, "");
  const url = translatedRoutes.includes(route)
    ? alternateUrls(pathname)[target]
    : getAbsoluteLocaleUrl(target, "/");
  return new URL(url).pathname;
}
