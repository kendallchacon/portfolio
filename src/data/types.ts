import type { Lang } from "../i18n/ui";

/** Todo texto visible del sitio es bilingüe. */
export type Localized = { es: string; en: string };

/** Devuelve el texto en el idioma pedido. */
export function pick(l: Localized, lang: Lang): string {
  return l[lang];
}

/** Texto que es idéntico en ambos idiomas (nombres propios, rutas, comandos). */
export function both(text: string): Localized {
  return { es: text, en: text };
}

/** Enlace externo: siempre HTTPS. */
export type HttpsUrl = `https://${string}`;

/** Ids de las secciones de la página principal (anclas `#id`). */
export type SectionId =
  | "inicio"
  | "servicios"
  | "sobre-mi"
  | "experiencia"
  | "proyectos"
  | "criterio"
  | "contacto";

/** Ids de las entradas del git log de experiencia (se definen en experience.ts). */
export type ExperienceId =
  | "flameware"
  | "matchgo"
  | "beto-y-mas"
  | "cima"
  | "infocontexto"
  | "scrum-sfc"
  | "tutor"
  | "puertas-abiertas"
  | "campamento-tutores"
  | "bachillerato"
  | "diplomado"
  | "proyectos-java";

/** Ramas del git log de experiencia; coinciden con los tokens `--color-branch-*` de global.css. */
export type Branch = "profesional" | "proyectos" | "logros" | "docencia" | "formacion";

/**
 * Imagen o captura referida por nombre de archivo. La carpeta la fija cada tipo que la usa
 * (p. ej. `src/assets/experience/`); el componente la resuelve con `astro:assets`.
 * Alt vacío = imagen decorativa.
 */
export type MediaRef = {
  file: string;
  alt: Localized;
  width: number;
  height: number;
};

// ─── Repositorios y fragmentos de código ─────────────────────────────────────

/**
 * Un repositorio privado no puede tener `url`: el sitio solo muestra fragmentos
 * cortos con el aviso "repositorio privado", sin enlaces.
 */
export type RepoRef =
  | { name: string; visibility: "public"; url: HttpsUrl }
  | { name: string; visibility: "private"; url?: never };

/** Máximo de líneas por tipo de fragmento (se muestran fragmentos, no archivos). */
export const SNIPPET_MAX_LINES = {
  sql: 8,
  md: 12,
  dart: 20,
  tree: 16,
  yaml: 14,
  kotlin: 20,
} as const;

export type SnippetKind = keyof typeof SNIPPET_MAX_LINES;

/** Tupla de 1 a N strings: el compilador rechaza fragmentos más largos que N líneas. */
type OneToN<N extends number, Acc extends string[] = [string]> = Acc["length"] extends N
  ? Acc
  : Acc | OneToN<N, [...Acc, string]>;

export type SnippetLines<K extends SnippetKind> = Readonly<OneToN<(typeof SNIPPET_MAX_LINES)[K]>>;

export type CodeSnippet = {
  [K in SnippetKind]: {
    kind: K;
    repo: RepoRef;
    /** Ruta del archivo dentro del repositorio, tal como se muestra en la barra del visor. */
    path: string;
    lines: SnippetLines<K>;
  };
}[SnippetKind];
