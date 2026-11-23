import type { PublishedSlug } from "../i18n/ui";
import type { Localized } from "./types";

/**
 * Casos de proyecto (`/proyectos/<slug>`). Solo lo que no está ya en `projects.ts`: la ficha
 * (mi parte, equipo, commits, estado, stack) se deriva de allí y la figura de la cabecera es la
 * misma escena de la tarjeta. Un caso existe solo si su slug está en `publishedProjects`.
 *
 * Repos privados: sin enlaces; los PR se citan por número. Lo que no tenga fuente verificada va
 * como `// VERIFICAR` y no se escribe.
 */
export type CaseStudy = {
  /** Metadatos de la página (title, description). */
  seo: { title: Localized; description: Localized };
  /** Línea sobre el título: tipo de proyecto, contexto y año. */
  meta: Localized;
  lead: Localized;
  /** Fila "Evidencia" de la ficha: repositorios y PR, sin enlaces a repos privados. */
  evidence: Localized;
  /** "Debajo del capó". */
  hood: {
    /** Contexto del proyecto, no una afirmación de autoría. */
    problem: Localized;
  };
};

export const cases = {
  matchgo: {
    seo: {
      title: {
        es: "MatchGo · caso de proyecto | Kendall Chacón",
        en: "MatchGo · project case | Kendall Chacón",
      },
      description: {
        es: "Plataforma multi-deporte para reservar canchas y retar equipos. Mi parte: arranque del backend .NET, autenticación, equipos y permisos, y la app Flutter.",
        en: "Multi-sport platform to book courts and challenge teams. My part: .NET backend bootstrap, authentication, teams and permissions, and the Flutter app.",
      },
    },
    // Fuente: projects.summary y experience.ts («Proyecto final en equipo»). El año sale del git
    // log de matchgo-backend (16 ago a 11 nov 2026).
    meta: {
      es: "Plataforma multi-deporte · Proyecto final en equipo · 2026",
      en: "Multi-sport platform · Team capstone · 2026",
    },
    lead: {
      es: "Plataforma para reservar canchas, retar a otros equipos y organizar partidos entre jugadores, equipos y complejos deportivos.",
      en: "Platform to book courts, challenge other teams and organize matches between players, teams and sports venues.",
    },
    // Fuente: git log de matchgo-backend (23 nov 2026): #1 ec6b1253, #24 ba16a4b0, #29 51a28dd6,
    // #46 ad452b72, #55 486ca9d1, #79 39ccd26a, #80 8aa4fc0e, #89 d0b56c4b; autor Kendall en todos.
    // VERIFICAR: Jira de MatchGo (no está en src/data): no se menciona.
    evidence: {
      es: "Tres repositorios privados (backend, móvil y web), sin enlaces. PR en matchgo-backend: #1, #24, #29, #46, #55, #79, #80 y #89.",
      en: "Three private repositories (backend, mobile and web), no links. PRs in matchgo-backend: #1, #24, #29, #46, #55, #79, #80 and #89.",
    },
    hood: {
      // Fuente: projects.summary y los cuatro servicios (ADR 0001 de matchgo-backend). Va como
      // contexto del equipo. No se dice «chats sueltos» (sin fuente).
      problem: {
        es: "Organizar un partido implica coordinar jugadores, canchas, horarios y rivales. MatchGo reúne reservas, retos, equipos y comunidad en una sola plataforma.",
        en: "Organizing a match means coordinating players, courts, schedules and opponents. MatchGo brings bookings, challenges, teams and community into one platform.",
      },
    },
  },
} as const satisfies Record<PublishedSlug, CaseStudy>;
