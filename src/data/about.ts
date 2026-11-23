import type { Lang } from "../i18n/ui";
import { experienceHref, projectHref } from "../i18n/ui";
import { contact } from "./contact";
import { experienceLog } from "./experience";
import { evidence, profile } from "./profile";
import { projects, type ProjectSlug } from "./projects";
import { tech, type TechId } from "./tech";
import { pick, type Localized, type MediaRef } from "./types";

/**
 * Sección "Sobre mí": foto + terminal. Todo lo que imprime la terminal sale de aquí; lo que
 * ya existe en otros archivos de datos (perfil, proyectos, experiencia, contacto) se deriva,
 * no se copia. El script solo clona lo que el servidor renderiza.
 */

export type AboutCommand =
  | "whoami"
  | "cat sobre-mi.txt"
  | "git shortlog -sn"
  | "ls proyectos/"
  | "cat stack.json"
  | "contacto"
  | "help"
  | "clear";

/** Un tramo de línea: texto plano o enlace. */
export type Segment = string | { text: string; href: string; external?: boolean };
export type Line = readonly Segment[];

type ShortlogEntry = { repo: string; commits: number; note?: Localized };

export const about = {
  /** Archivo en `src/assets/about/`. Revisada: sin EXIF/GPS ni datos personales visibles. */
  photo: {
    file: "kendall-profile.jpg",
    width: 766,
    height: 900,
    // La carpeta no es el título (se entrega en 2027): el alt no lo afirma.
    alt: {
      es: "Kendall Chacón de traje azul, sonriendo, con una carpeta de la Universidad Nacional frente al rótulo de la universidad",
      en: "Kendall Chacón in a blue suit, smiling, holding a Universidad Nacional folder in front of the university sign",
    },
  } satisfies MediaRef,

  /** Líneas de `cat sobre-mi.txt`. */
  bio: [
    {
      es: "Concluí el bachillerato con promedio ponderado de 9,0 y mi práctica profesional en Flameware Technologies.",
      en: "I completed my bachelor's degree with a 9.0/10 weighted GPA and my professional internship at Flameware Technologies.",
    },
    // VERIFICAR (no se renderiza hasta que el autor lo confirme):
    // «Lo que más disfruto es el backend: cómo se guardan los datos, cómo se comunican los
    // servicios y qué pasa cuando algo falla.» / «What I enjoy most is the backend: …»
    // VERIFICAR (no se renderiza hasta que el autor lo confirme):
    // «También construyo la parte que la gente toca, en web y en móvil, y trabajo por historias
    // con revisión de código.» / «I also build the part people touch, on web and mobile, …»
    {
      es: "Disponible para empleo y proyectos, presencial o remoto.",
      en: "Available for employment and projects, on-site or remote.",
    },
  ] satisfies readonly Localized[],

  /** Commits de Kendall por repositorio. Se ordenan por cantidad al renderizar. */
  shortlog: [
    // Fuente: MatchGo-UNA/matchgo-mobile, rama dev (por defecto),
    // `gh api repos/MatchGo-UNA/matchgo-mobile/contributors` → kendallchacon 170 (23 nov 2026).
    // 65 % y 19 PRs: handoff §4.
    {
      repo: "matchgo-mobile",
      commits: 170,
      note: { es: "65 % de los commits · 19 PRs", en: "65% of commits · 19 PRs" },
    },
    // Fuente: auditoría forense del repositorio, confirmada por el autor (iteración 5B).
    // Repo privado del cliente: la rama y el comando de esa auditoría no quedaron registrados.
    // Nombre tal como figura en projects.ts (código privado del cliente, sin nombre de repo).
    { repo: "Beto y Más", commits: 150 },
    // Fuente: MatchGo-UNA/matchgo-backend, rama dev (por defecto),
    // `gh api "repos/MatchGo-UNA/matchgo-backend/commits?sha=dev&author=kendallchacon"` → 13
    // (23 nov 2026). Total de 207 commits y 4 contribuyentes: verificado por el autor (22 nov 2026).
    {
      repo: "matchgo-backend",
      commits: 13,
      note: { es: "uno de 4 contribuyentes", en: "one of 4 contributors" },
    },
    // VERIFICAR: cima-mobile 52 y cima-backend 40 (handoff §4) no constan como commits de
    // Kendall; en GitHub (contributors, rama por defecto) coinciden con otros autores.
    // Fuente: kendallchacon/docker-kubernetes-lab (público), rama main (por defecto),
    // `gh api repos/kendallchacon/docker-kubernetes-lab/contributors` → kendallchacon 4,
    // único contribuyente (23 nov 2026).
    {
      repo: "docker-kubernetes-lab",
      commits: 4,
      note: { es: "único contribuyente", en: "sole contributor" },
    },
  ] satisfies readonly ShortlogEntry[],

  /** `ls proyectos/`: tecnologías a mostrar (subconjunto de `project.tech`). */
  projects: [
    { slug: "matchgo", tech: ["dotnet", "flutter"] },
    { slug: "beto-y-mas", tech: ["laravel", "vue"] },
    { slug: "cima", tech: ["kotlin", "dotnet"] },
    { slug: "lab", tech: ["docker", "kubernetes", "githubActions"] },
  ] satisfies readonly { slug: ProjectSlug; tech: readonly TechId[] }[],

  /**
   * `cat stack.json`: cada tecnología lleva como evidencia las entradas de experiencia que la
   * usan. Si una no tiene evidencia, el build falla. React, Spring Boot y SQL Server quedan
   * fuera a propósito: no tienen evidencia en los datos.
   */
  stack: [
    { key: "backend", tech: ["dotnet", "laravel", "php"] },
    { key: "datos", tech: ["postgresql", "mysql"] },
    { key: "web", tech: ["vue", "typescript", "javascript"] },
    { key: "movil", tech: ["flutter", "riverpod", "kotlin", "jetpackCompose"] },
    { key: "infra", tech: ["docker"] },
    { key: "java", tech: ["java"] },
  ] satisfies readonly { key: string; tech: readonly TechId[] }[],

  contact: ["linkedin", "github"] as const,

  /** Chips bajo la terminal, en orden. */
  chips: [
    "whoami",
    "cat sobre-mi.txt",
    "git shortlog -sn",
    "ls proyectos/",
    "cat stack.json",
    "contacto",
  ] satisfies readonly AboutCommand[],

  /** Lo que la terminal muestra al cargar (y reescribe al entrar en vista). */
  intro: ["whoami", "cat sobre-mi.txt"] satisfies readonly AboutCommand[],

  helpLabel: { es: "Comandos:", en: "Commands:" },
  /** `{cmd}` se sustituye por lo que escribió el usuario (con textContent). */
  notFound: {
    es: "comando no encontrado: {cmd} · prueba help",
    en: "command not found: {cmd} · try help",
  },
} as const;

export const commands: readonly AboutCommand[] = [...about.chips, "help", "clear"];

const pad = (s: string, n: number) => s + " ".repeat(Math.max(1, n - s.length));

/** Ids de experiencia que usan la tecnología. */
function evidenceFor(id: TechId) {
  return experienceLog.filter((e) => e.tech?.includes(id)).map((e) => e.id);
}

/** Salida de cada comando, por idioma. `clear` no imprime nada. */
export function aboutOutputs(lang: Lang): Record<AboutCommand, readonly Line[]> {
  const { degree, location } = profile;

  const whoami: Line[] = [
    [`${profile.name} · ${pick(degree.title, lang)}, ${pick(degree.institution, lang)}`],
    [`${pick(profile.role, lang)} · ${location.place} · ${pick(location.modality, lang)}`],
  ];

  const shortlog = [...about.shortlog].sort((a, b) => b.commits - a.commits);
  const repoW = Math.max(...shortlog.map((e) => e.repo.length)) + 4;
  const log: Line[] = shortlog.map((e) => [
    `${String(e.commits).padStart(5)}  ${e.note ? pad(e.repo, repoW) : e.repo}${e.note ? `(${pick(e.note, lang)})` : ""}`,
  ]);

  const slugW = Math.max(...about.projects.map((p) => p.slug.length)) + 5;
  const ls: Line[] = about.projects.map(({ slug, tech: ids }) => {
    const project = projects.find((p) => p.slug === slug)!;
    for (const id of ids) {
      if (!(project.tech as readonly TechId[]).includes(id)) throw new Error(`about: ${id} no está en ${slug}`);
    }
    const parts = [ids.map((id) => tech[id].label).join(" · ")];
    if ("status" in project && project.status) parts.push(pick(project.status, lang));
    // El nombre del proyecto es un enlace solo si su caso está publicado.
    const href = projectHref(slug, lang);
    const name = `${slug}/`;
    const rest = pad("", slugW - name.length) + parts.join(" · ");
    return href ? [{ text: name, href }, rest] : [name + rest];
  });

  const keyW = Math.max(...about.stack.map((g) => g.key.length)) + 4;
  const stack: Line[] = [["{"]];
  about.stack.forEach((group, gi) => {
    const line: Segment[] = [`  ${pad(`"${group.key}":`, keyW)}[`];
    group.tech.forEach((id, ti) => {
      const ev = evidenceFor(id);
      if (!ev.length) throw new Error(`about: ${id} sin evidencia en experience.ts`);
      line.push(`${ti ? ", " : ""}"${tech[id].label} (`);
      ev.forEach((xp, i) => {
        if (i) line.push(", ");
        const href = experienceHref(xp, lang);
        line.push(href ? { text: xp, href } : xp);
      });
      line.push(`)"`);
    });
    line.push(gi < about.stack.length - 1 ? "]," : "]");
    stack.push(line);
  });
  stack.push(["}"]);

  const channels = about.contact.map((id) => contact.channels.find((c) => c.id === id)!);
  const labelW = Math.max(5, ...channels.map((c) => c.id.length)) + 3;
  const contacto: Line[] = [
    [pad("email", labelW), { text: contact.email.address, href: contact.email.href }],
    ...channels.map((c): Line => [pad(c.id, labelW), { text: pick(c.value, lang), href: c.href, external: true }]),
  ];

  return {
    whoami,
    "cat sobre-mi.txt": about.bio.map((l) => [pick(l, lang)]),
    "git shortlog -sn": log,
    "ls proyectos/": ls,
    "cat stack.json": stack,
    contacto,
    help: [[`${pick(about.helpLabel, lang)} ${commands.join(" · ")}`]],
    clear: [],
  };
}

/** Pie de la foto: nombre y situación real del grado (concluido; título en 2027). */
export function photoCaption(lang: Lang) {
  const degree = evidence.find((e) => e.id === "degree")!;
  return { name: profile.name, detail: `${pick(degree.title, lang)} · ${profile.degree.institutionShort}` };
}
