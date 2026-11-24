import type { PublishedSlug } from "../i18n/ui";
import type { TechId } from "./tech";
import { both, type Localized, type MediaRef } from "./types";

/**
 * Casos de proyecto (`/proyectos/<slug>`). Solo lo que no está ya en `projects.ts`: la ficha
 * (mi parte, equipo, commits, estado, stack) se deriva de allí y la figura de la cabecera es la
 * misma escena de la tarjeta. Un caso existe solo si su slug está en `publishedProjects`.
 *
 * Repos privados: sin enlaces; los PR se citan por número. Lo que no tenga fuente verificada va
 * como `// VERIFICAR` y no se escribe.
 */
/** Captura de la app: archivo en `src/assets/projects/`, con su pie visible. */
export type CaseShot = MediaRef & { caption: Localized };

/**
 * Decisión de diseño: título, qué es y su efecto (el mismo texto, repartido en dos), y un chip de
 * referencia (solo texto, sin enlace: ADR o archivo de un repo privado).
 */
export type CaseDecision = { title: Localized; what: Localized; effect: Localized; ref: string };

/**
 * Aviso de "Límites": etiqueta mono, icono y el texto del límite. `segments` dibuja los segmentos
 * de la ficha (`of` en total, `on` encendidos).
 */
export type CaseLimit = {
  label: Localized;
  icon: `lucide:${string}`;
  text: Localized;
  segments?: { of: number; on: number };
};

/**
 * Celda de la franja de datos. `count`: cifra con contador y, debajo, una barra al `percent` % o
 * `of` segmentos con `on` encendidos. `status`: dato corto con el punto de estado.
 */
export type CaseFact =
  | {
      kind: "count";
      value: number;
      label: Localized;
      meter: { type: "bar"; percent: number } | { type: "segments"; of: number; on: number };
    }
  | { kind: "status"; value: Localized; label: Localized };

/** Stack agrupado por capa, con su icono; las tecnologías salen de `tech.ts`. */
export type CaseStackGroup = {
  layer: Localized;
  icon: `lucide:${string}`;
  tech: readonly TechId[];
};

/** Módulo del "El problema": icono lucide y nombre. */
export type CaseModule = { icon: `lucide:${string}`; label: Localized };

/**
 * "El problema", repartido en dos mitades con el texto de siempre: `statement` (la primera frase,
 * a la izquierda) y `lead` + `modules` (la segunda, a la derecha).
 */
export type CaseProblem = {
  statement: Localized;
  lead: Localized;
  modules: readonly [CaseModule, CaseModule, CaseModule, CaseModule];
};

/** Cifra de la franja de "Qué construí": cuenta de 0 al valor; `suffix` va pegado (p. ej. «de 33»). */
export type CaseStat = {
  value: number;
  suffix?: Localized;
  label: Localized;
  /** Barra fina al `percent` % bajo la cifra. */
  percent?: number;
};

/** Celda de un panel de "Qué construí": título, una línea y chips mono (PR, rutas, archivos). */
export type CaseBuiltCell = {
  title: Localized;
  line: Localized;
  chips: readonly Localized[];
  /** Cifra propia de la celda (la hace ancha en el bento de Móvil). */
  stat?: CaseStat;
};

/**
 * "Qué construí": dos grupos de tarjetas sueltas, Móvil Flutter primero (acento, insignia, cifra
 * grande y bento) y Backend .NET después (una fila, con su nota junto al encabezado). Sin enlaces: los
 * repos son privados; el chip lleva el repo donde el número es ambiguo («PR móvil #1»).
 */
export type CaseBuilt = {
  mobile: {
    tech: TechId;
    area: Localized;
    badge: Localized;
    /** Cifra grande de la tarjeta alta. */
    hero: CaseStat;
    cells: readonly CaseBuiltCell[];
  };
  backend: { tech: TechId; area: Localized; note: Localized; cells: readonly CaseBuiltCell[] };
};

export type CaseStudy = {
  /** Metadatos de la página (title, description). */
  seo: { title: Localized; description: Localized };
  /** Línea sobre el título: tipo de proyecto, contexto y año. */
  meta: Localized;
  lead: Localized;
  /** Franja de datos de la ficha: 3 celdas. */
  facts: readonly [CaseFact, CaseFact, CaseFact];
  /** Stack del proyecto por capas; repite las de `projects.ts` más las anotadas en el caso. */
  stack: readonly CaseStackGroup[];
  /** Nota de "Evidencia" de la ficha: repositorios, sin enlaces a repos privados. */
  evidence: Localized;
  /** «El proyecto en detalle» (ES) / «Under the hood» (EN). */
  hood: {
    /** Contexto del proyecto, no una afirmación de autoría. */
    problem: CaseProblem;
    /** "Qué construí": tarjetas por área (5 en total), solo lo verificado como propio. */
    built: CaseBuilt;
    /** "Capturas": 3 a 4, sin reproductor ni capítulos. */
    shots: readonly CaseShot[];
    /** "Decisiones": máximo 2. */
    decisions: readonly [CaseDecision] | readonly [CaseDecision, CaseDecision];
    /** "Límites": máximo 2. */
    limits: readonly [CaseLimit] | readonly [CaseLimit, CaseLimit];
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
    // Fuente de las cifras: projects.commits y about.ts (gh api, rama dev, 23 nov 2026). La etiqueta
    // del 13 lleva siempre «uno de 4 contribuyentes». El estado sale de projects.status.
    // La barra al 65 % y los 4 segmentos (1 encendido) repiten «65 %» y «uno de 4» de las etiquetas.
    facts: [
      {
        kind: "count",
        value: 170,
        label: { es: "commits en móvil (65 %)", en: "commits in mobile (65%)" },
        meter: { type: "bar", percent: 65 },
      },
      {
        kind: "count",
        value: 13,
        label: {
          es: "commits en backend, uno de 4 contribuyentes",
          en: "commits in backend, one of 4 contributors",
        },
        meter: { type: "segments", of: 4, on: 1 },
      },
      {
        kind: "status",
        value: { es: "Demo local", en: "Local demo" },
        label: { es: "Docker Compose", en: "Docker Compose" },
      },
    ],
    // Stack del proyecto, no atribución. TypeScript: matchgo-web (package.json y tsconfig.json). S3:
    // almacenamiento de objetos del backend sobre LocalStack en Docker Compose (compose.yml de
    // matchgo-backend); no es trabajo de Kendall. Ambos se suman a las tecnologías de projects.ts.
    stack: [
      {
        layer: { es: "Backend", en: "Backend" },
        icon: "lucide:server",
        tech: ["dotnet", "yarp", "postgresql", "postgis", "rabbitmq", "masstransit", "jwt"],
      },
      { layer: { es: "Móvil", en: "Mobile" }, icon: "lucide:smartphone", tech: ["flutter", "riverpod"] },
      { layer: { es: "Web", en: "Web" }, icon: "lucide:globe", tech: ["nextjs", "typescript"] },
      { layer: { es: "Infra", en: "Infra" }, icon: "lucide:container", tech: ["docker", "s3"] },
    ],
    // Fuente: git log de matchgo-backend (23 nov 2026); autor Kendall en todos. Los números de PR
    // viven ahora en las tarjetas de «Qué construí». Los PR #55 y #89 ya no se muestran (sin tarjeta).
    // VERIFICAR: Jira de MatchGo (no está en src/data): no se menciona.
    evidence: {
      es: "3 repositorios privados, sin enlaces.",
      en: "3 private repositories, no links.",
    },
    hood: {
      // Fuente: projects.summary y los cuatro servicios (ADR 0001 de matchgo-backend). Va como
      // contexto del equipo. No se dice «chats sueltos» (sin fuente).
      problem: {
        statement: {
          es: "Organizar un partido implica coordinar jugadores, canchas, horarios y rivales.",
          en: "Organizing a match means coordinating players, courts, schedules and opponents.",
        },
        lead: {
          es: "MatchGo reúne en una sola plataforma",
          en: "MatchGo brings into one platform",
        },
        modules: [
          { icon: "lucide:calendar-check", label: { es: "Reservas", en: "Bookings" } },
          { icon: "lucide:trophy", label: { es: "Retos", en: "Challenges" } },
          { icon: "lucide:users", label: { es: "Equipos", en: "Teams" } },
          { icon: "lucide:message-circle", label: { es: "Comunidad", en: "Community" } },
        ],
      },
      // Fuente (hechos verificados por el autor, 23 nov 2026; #55 y #89 de projects.ts): backend .NET #24 (RS256, refresh con
      // rotación y revocación, validación JWT en el Gateway), #29 y #79 (invitaciones y roles),
      // #46 (moderación), #80 (servicio a servicio); matchgo-mobile #1 (base), lib/features/booking/
      // y lib/core/network/dio_failure_mapper.dart. Nada de GiST, mensajería, S3, quality gate,
      // ADR 0010 ni emparejamiento. Sin nombres de compañeros.
      // Cifras de «Móvil Flutter». Repo: matchgo-mobile, rama dev; fuente: git (revisado el 23 nov 2026
      // con `git log dev`; la rama no cambia desde el 13 nov, así que vale la revisión del 22 nov).
      // - 170: commits de Kendall (suma de sus 3 identidades de git, un solo correo) de 262 en dev;
      //   170/262 = 65 % del repo. Mide commits, no líneas.
      // - «33 de 33»: commits en dev que tocan lib/features/booking/ (módulo móvil de reservas) y
      //   los 33 son de Kendall. Solo la app: no incluye la lógica de reservas del backend.
      // VERIFICAR (no se renderiza): «19 PRs integrados». `gh pr list` en matchgo-mobile (23 nov 2026)
      //   da 21 PR integrados de la cuenta de Kendall (20 hacia dev y el #45 de release a main), 25 en
      //   total del repo: ningún filtro simple da 19. Origen del 19: handoff §4 / about.ts, sin
      //   fórmula. Candidato: { value: 19, label: { es: "PRs integrados", en: "merged PRs" } }.
      built: {
        mobile: {
          tech: "flutter",
          area: { es: "Móvil Flutter", en: "Flutter mobile" },
          badge: { es: "Donde más construí", en: "Where I built the most" },
          hero: {
            value: 170,
            label: { es: "commits · 65 % del repo", en: "commits · 65% of the repo" },
            percent: 65,
          },
          cells: [
            {
              title: { es: "Base de la app", en: "App foundation" },
              line: {
                es: "La estructura inicial del proyecto móvil.",
                en: "The initial structure of the mobile project.",
              },
              chips: [{ es: "PR móvil #1", en: "mobile PR #1" }],
            },
            {
              title: { es: "Módulo de reservas", en: "Booking module" },
              line: {
                es: "La feature completa, de principio a fin.",
                en: "The complete feature, from start to finish.",
              },
              chips: [both("lib/features/booking/")],
              stat: {
                value: 33,
                suffix: { es: "de 33", en: "of 33" },
                label: {
                  es: "commits del módulo de reservas",
                  en: "commits of the booking module",
                },
              },
            },
            {
              title: { es: "Mapeo de errores de red", en: "Network error mapping" },
              line: {
                es: "Fallos de red con tipo en el cliente.",
                en: "Typed network failures in the client.",
              },
              chips: [both("dio_failure_mapper.dart")],
            },
          ],
        },
        backend: {
          tech: "dotnet",
          area: { es: "Backend .NET", en: ".NET backend" },
          note: { es: "uno de 4 contribuyentes", en: "one of 4 contributors" },
          cells: [
            {
              title: { es: "Autenticación", en: "Authentication" },
              line: {
                es: "Tokens RS256, JWT en el Gateway, refresh con rotación y revocación.",
                en: "RS256 tokens, JWT at the Gateway, refresh with rotation and revocation.",
              },
              chips: [both("PR #24")],
            },
            {
              title: { es: "Equipos", en: "Teams" },
              line: { es: "Invitaciones y roles de equipo.", en: "Team invitations and roles." },
              chips: [both("PR #29"), both("PR #55"), both("PR #79")],
            },
            {
              title: { es: "Comunidad", en: "Community" },
              line: { es: "Moderación de la comunidad.", en: "Community moderation." },
              chips: [both("PR #46"), both("PR #89")],
            },
            {
              title: { es: "Entre servicios", en: "Between services" },
              line: {
                es: "Autenticación servicio a servicio.",
                en: "Service-to-service authentication.",
              },
              chips: [both("PR #80")],
            },
          ],
        },
      },
      // Capturas existentes en el prototipo del sitio (docs/prototype/media, 03, 04, 08 y 09); los
      // repos de MatchGo no guardan capturas de la app. Los avatares son datos de prueba (autor).
      // Los pies describen solo la pantalla, no a quién se atribuye la lógica detrás.
      shots: [
        {
          file: "matchgo-horarios.jpg",
          width: 720,
          height: 1560,
          caption: { es: "Horarios", en: "Time slots" },
          alt: {
            es: "Pantalla de horarios de una cancha de Fútbol 5: semana del 9 al 15 de noviembre, franja Noche y el horario de las 22:00 elegido.",
            en: "Time slot screen for a 5-a-side court: the week of 9 to 15 November, Night period and the 22:00 slot selected.",
          },
        },
        {
          file: "matchgo-reserva.jpg",
          width: 720,
          height: 1560,
          caption: { es: "Reserva confirmada", en: "Booking confirmed" },
          alt: {
            es: "Pantalla de reserva confirmada con la cancha, la fecha, la hora y el total.",
            en: "Booking confirmed screen showing the court, date, time and total.",
          },
        },
        {
          file: "matchgo-invitar.jpg",
          width: 720,
          height: 1560,
          caption: { es: "Invitar jugador", en: "Invite a player" },
          alt: {
            es: "Hoja para invitar a un jugador a un equipo: búsqueda por nombre, plazo de vencimiento y botón de invitar.",
            en: "Sheet to invite a player to a team: name search, expiry period and invite button.",
          },
        },
        {
          file: "matchgo-invitaciones.jpg",
          width: 720,
          height: 1560,
          caption: { es: "Invitaciones", en: "Invitations" },
          alt: {
            es: "Pantalla de equipos con una invitación pendiente para unirse a un equipo, con botones para rechazar o aceptar.",
            en: "Teams screen with a pending invitation to join a team, with buttons to decline or accept.",
          },
        },
      ],
      // Fuente: ADR 0003 (commit de arranque) y lib/core/network/dio_failure_mapper.dart
      // (mapDioFailure → AppFailure con kind y outcomeUnknown).
      decisions: [
        {
          title: { es: "Una base de datos por servicio", en: "One database per service" },
          what: {
            es: "Cada servicio guarda IDs de los demás, no llaves foráneas cruzadas.",
            en: "Each service stores IDs from the others, not cross-service foreign keys.",
          },
          effect: {
            es: "Cada servicio evoluciona su esquema sin coordinar migraciones con el resto.",
            en: "Each service evolves its schema without coordinating migrations with the rest.",
          },
          ref: "ADR 0003",
        },
        {
          title: {
            es: "Fallos de red tipados en el cliente móvil",
            en: "Typed network failures in the mobile client",
          },
          what: {
            es: "Un mapeador convierte los errores de Dio en un fallo con tipo (sin conexión, tiempo agotado, validación, conflicto, servidor).",
            en: "A mapper turns Dio errors into a typed failure (offline, timeout, validation, conflict, server).",
          },
          effect: {
            es: "Marca cuando el resultado es incierto: si la petición salió, la pantalla no asume que falló.",
            en: "It flags when the outcome is uncertain: if the request went out, the screen does not assume it failed.",
          },
          ref: "dio_failure_mapper.dart",
        },
      ],
      // Los 4 segmentos con 1 encendido son los de la ficha («uno de 4 contribuyentes»).
      limits: [
        {
          label: { es: "Alcance", en: "Scope" },
          icon: "lucide:cloud-off",
          text: {
            es: "Solo corre como demo local con Docker Compose: no hay despliegue público.",
            en: "It only runs as a local demo with Docker Compose: there is no public deployment.",
          },
        },
        {
          label: { es: "Mi parte", en: "My part" },
          icon: "lucide:users",
          text: {
            es: "El backend lo hicieron cuatro personas y yo soy una de ellas: este caso cuenta solo mi parte.",
            en: "Four people built the backend and I am one of them: this case covers only my part.",
          },
          segments: { of: 4, on: 1 },
        },
      ],
    },
  },
} as const satisfies Record<PublishedSlug, CaseStudy>;
