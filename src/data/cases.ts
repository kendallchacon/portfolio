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
 * referencia opcional (solo texto, sin enlace: ADR o archivo de un repo privado).
 */
export type CaseDecision = { title: Localized; what: Localized; effect: Localized; ref?: string };

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
 * Celda de la franja de datos. `count`: cifra con contador (`suffix` pegado, p. ej. «de 5») y,
 * si hay `meter`, debajo una barra al `percent` % o `of` segmentos con `on` encendidos.
 * `status`: dato corto con el punto de estado.
 */
export type CaseFact =
  | {
      kind: "count";
      value: number;
      suffix?: Localized;
      label: Localized;
      meter?: { type: "bar"; percent: number } | { type: "segments"; of: number; on: number };
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

/** Celda de un panel de "Qué construí": título, una línea y, si los hay, chips mono (PR, rutas, archivos). */
export type CaseBuiltCell = {
  title: Localized;
  line: Localized;
  chips?: readonly Localized[];
  /** Cifra propia de la celda. */
  stat?: CaseStat;
  /** Tarjeta destacada del caso: la única con el borde de acento. */
  featured?: true;
};

/** Grupo de "Qué construí": encabezado con el logo de su tecnología y 3 o 4 tarjetas. */
export type CaseBuiltGroup = {
  tech: TechId;
  area: Localized;
  /** Insignia junto al encabezado (solo el grupo principal). */
  badge?: Localized;
  /** Cifra en mono a la derecha del encabezado del grupo principal. */
  hero?: CaseStat;
  /** Nota junto al encabezado (p. ej. «uno de 4 contribuyentes»). */
  note?: Localized;
  cells: readonly CaseBuiltCell[];
};

/**
 * "Qué construí": dos grupos de tarjetas sueltas. El principal va primero (insignia, cifra y tarjeta
 * destacada con borde de acento); el secundario, después, en una fila. Sin enlaces: los repos son
 * privados; el chip lleva el repo donde el número es ambiguo («PR móvil #1»).
 */
export type CaseBuilt = { primary: CaseBuiltGroup; secondary: CaseBuiltGroup };

export type CaseStudy = {
  /** Metadatos de la página (title, description). */
  seo: { title: Localized; description: Localized };
  /** Línea sobre el título: tipo de proyecto, contexto y año. */
  meta: Localized;
  lead: Localized;
  /** Oculta bajo la ficha la línea de equipo de `projects.ts` cuando repite una tarjeta de datos. */
  omitTeamLine?: true;
  /**
   * Px que la figura de la cabecera puede acompañar al scroll (sticky, ≥1024 px). Sin él, el
   * recorrido es lo que la columna izquierda excede a la figura: con un «Mi parte» largo la figura
   * quedaría fija decenas de px mientras la página baja. Con él, la figura vive en un contenedor
   * de su alto + este valor y baja con la página.
   */
  figureTravel?: number;
  /** Franja de datos de la ficha: 3 celdas. */
  facts: readonly [CaseFact, CaseFact, CaseFact];
  /** Stack del proyecto por capas (3 o 4); repite las de `projects.ts` más las anotadas en el caso. */
  stack: readonly CaseStackGroup[];
  /** Nota de "Evidencia" de la ficha: repositorios, sin enlaces a repos privados. */
  evidence: Localized;
  /** «El proyecto en detalle» (ES) / «Under the hood» (EN). */
  hood: {
    /** Contexto del proyecto, no una afirmación de autoría. */
    problem: CaseProblem;
    /** "Qué construí": tarjetas por área (5 en total), solo lo verificado como propio. */
    built: CaseBuilt;
    /** "Capturas": 3 a 4, sin reproductor ni capítulos. Sin capturas (o vacía), la sección no se renderiza. */
    shots?: readonly CaseShot[];
    /** Nota bajo las capturas; por defecto, «Datos de demostración». */
    shotsNote?: Localized;
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
        primary: {
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
              featured: true,
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
        secondary: {
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
  "beto-y-mas": {
    seo: {
      title: {
        es: "Beto y Más · caso de proyecto | Kendall Chacón",
        en: "Beto y Más · project case | Kendall Chacón",
      },
      description: {
        es: "Plataforma de fidelización con juegos, recompensas y panel administrativo para un cliente real. Mi parte: el juego Bubble Shooter, el flujo de recompensas y varias vistas del cliente.",
        en: "Loyalty platform with games, rewards and an admin panel for a real client. My part: the Bubble Shooter game, the rewards flow and several client views.",
      },
    },
    // Fuente: projects.summary y experience.ts («Proyecto de graduación para un cliente real»). Sin
    // año: no hay fuente verificada para él (solo «3 semestres»).
    meta: {
      es: "Plataforma de fidelización · Proyecto de graduación · Cliente real",
      en: "Loyalty platform · Capstone · Real client",
    },
    lead: {
      es: "Plataforma de fidelización con juegos, recompensas y panel administrativo para un negocio real.",
      en: "Loyalty platform with games, rewards and an admin panel for a real business.",
    },
    // La tarjeta «1 de 5» ya dice «equipo de 5 · 3 semestres»: no se repite bajo la ficha.
    omitTeamLine: true,
    // «Mi parte» de Beto es largo: la columna izquierda excede a la figura en ~70 px a 1440 px y la
    // figura quedaría pegada ese tramo. En MatchGo la columna excede a la figura en 5 px, así que
    // baja con la página; 5 reproduce ese recorrido.
    figureTravel: 5,
    // - 150: commits propios de Kendall. Comando: `git shortlog -sne --all`; corte: 12 jun 2026;
    //   fuente: auditoría local. Sin barra: no hay total del repo contra el cual medirlo.
    // - «1 de 5» con 5 segmentos y 1 encendido: equipo de 5 (projects.team.size) y 3 semestres.
    // - Estado: projects.status y links (betoymas.com, en producción).
    facts: [
      {
        kind: "count",
        value: 150,
        label: { es: "commits propios", en: "own commits" },
      },
      {
        kind: "count",
        value: 1,
        suffix: { es: "de 5", en: "of 5" },
        label: { es: "equipo de 5 · 3 semestres", en: "team of 5 · 3 semesters" },
        meter: { type: "segments", of: 5, on: 1 },
      },
      {
        kind: "status",
        value: { es: "En producción", en: "In production" },
        label: both("betoymas.com"),
      },
    ],
    // Stack del proyecto, por capa (projects.tech): ninguna tecnología nueva.
    stack: [
      { layer: { es: "Backend", en: "Backend" }, icon: "lucide:server", tech: ["php", "laravel", "mysql"] },
      {
        layer: { es: "Web", en: "Web" },
        icon: "lucide:globe",
        tech: ["vue", "typescript", "inertia", "phaser"],
      },
      { layer: { es: "Pruebas", en: "Testing" }, icon: "lucide:flask-conical", tech: ["phpunit"] },
    ],
    evidence: {
      es: "Repositorio privado del cliente, sin enlaces.",
      en: "Client's private repository, no links.",
    },
    hood: {
      // Fuente: projects.summary y la instrucción del autor (6B.2): plataforma web de un cliente real
      // con experiencia de cliente, administración, recompensas y juegos. Contexto, no autoría.
      problem: {
        statement: {
          es: "Una plataforma web para un cliente real: experiencia de cliente, administración, recompensas y juegos.",
          en: "A web platform for a real client: customer experience, administration, rewards and games.",
        },
        lead: {
          es: "Beto y Más reúne en una sola plataforma",
          en: "Beto y Más brings into one platform",
        },
        modules: [
          { icon: "lucide:users", label: { es: "Clientes", en: "Customers" } },
          { icon: "lucide:gift", label: { es: "Recompensas", en: "Rewards" } },
          { icon: "lucide:gamepad-2", label: { es: "Juegos", en: "Games" } },
          { icon: "lucide:settings", label: { es: "Administración", en: "Administration" } },
        ],
      },
      // Fuente: «Mi parte» (projects.ts) y la lista de áreas del autor (6B.2). Sin números de PR, sin
      // nombres de archivo ni arquitectura interna del cliente (repo privado).
      built: {
        primary: {
          tech: "phaser",
          area: { es: "Juegos", en: "Games" },
          badge: { es: "Donde más construí", en: "Where I built the most" },
          cells: [
            {
              title: { es: "Bubble Shooter", en: "Bubble Shooter" },
              line: {
                es: "Juego completo: escena Phaser e input táctil.",
                en: "A complete game: Phaser scene and touch input.",
              },
              featured: true,
            },
            {
              title: { es: "Configuración y métricas", en: "Settings and metrics" },
              line: {
                es: "Configuración por juego, políticas de acceso, sesiones y métricas administrativas.",
                en: "Per-game settings, access policies, sessions and administrative metrics.",
              },
            },
            {
              title: { es: "Pruebas", en: "Tests" },
              line: {
                es: "Tres tipos de prueba: Feature, Unit y de escena.",
                en: "Three kinds of test: Feature, Unit and scene.",
              },
            },
          ],
        },
        secondary: {
          tech: "laravel",
          area: { es: "Plataforma", en: "Platform" },
          cells: [
            {
              title: { es: "Recompensas", en: "Rewards" },
              line: {
                es: "Detalle y canje, panel administrativo y exportación CSV de movimientos.",
                en: "Detail and redemption, admin panel and CSV export of movements.",
              },
            },
            {
              title: { es: "Cuenta del cliente", en: "Customer account" },
              line: {
                es: "Verificación de correo, ubicaciones y direcciones con datos INEC.",
                en: "Email verification, locations and addresses with INEC data.",
              },
            },
            {
              title: { es: "Rediseño", en: "Redesign" },
              line: {
                es: "Home, perfil, layout y catálogo de juegos.",
                en: "Home, profile, layout and game catalog.",
              },
            },
          ],
        },
      },
      // Capturas existentes en el repo: beto-inicio y beto-juegos (la cuenta y el avatar son de
      // Kendall; sin datos de terceros). beto-landing NO se usa: la foto de portada muestra personas
      // identificables (cliente y personal del comercio) y no consta autorización.
      shots: [
        {
          file: "beto-inicio.jpg",
          width: 1400,
          height: 729,
          caption: { es: "Inicio del cliente", en: "Customer home" },
          alt: {
            es: "Inicio de Beto y Más: puntos acumulados, progreso semanal, accesos a juegos, recompensas, promociones y perfil, y recompensas destacadas.",
            en: "Beto y Más home: points balance, weekly progress, shortcuts to games, rewards, promotions and profile, and featured rewards.",
          },
        },
        {
          file: "beto-juegos.jpg",
          width: 1400,
          height: 732,
          caption: { es: "Catálogo de juegos", en: "Game catalog" },
          alt: {
            es: "Catálogo de juegos de Beto y Más con Bubble Shooter como juego destacado y el progreso semanal.",
            en: "Beto y Más game catalog with Bubble Shooter as the featured game and the weekly progress.",
          },
        },
      ],
      shotsNote: {
        es: "Capturas de mi cuenta en producción.",
        en: "Screenshots of my account in production.",
      },
      decisions: [
        {
          title: {
            es: "El puntaje se valida y liquida en el backend",
            en: "The score is validated and settled on the backend",
          },
          what: {
            es: "La partida se valida y el puntaje se liquida en el servidor.",
            en: "The game is validated and the score is settled on the server.",
          },
          effect: {
            es: "Las reglas y los resultados son consistentes.",
            en: "Rules and results are consistent.",
          },
        },
        {
          title: { es: "Phaser dentro de Vue con un bridge", en: "Phaser inside Vue through a bridge" },
          what: {
            es: "La escena se conecta a Vue mediante un bridge.",
            en: "The scene connects to Vue through a bridge.",
          },
          effect: {
            es: "El ciclo de vida de la escena se limpia al desmontar o navegar.",
            en: "The scene lifecycle is cleaned up on unmount or navigation.",
          },
        },
      ],
      // Los 5 segmentos con 1 encendido son los de la ficha («1 de 5»).
      limits: [
        {
          label: { es: "Alcance", en: "Scope" },
          icon: "lucide:lock",
          text: {
            es: "El código es privado del cliente, por eso no hay enlace al repositorio.",
            en: "The code is the client's and private, so there is no link to the repository.",
          },
        },
        {
          label: { es: "Mi parte", en: "My part" },
          icon: "lucide:users",
          text: {
            es: "Éramos un equipo de 5: este caso cuenta solo mi parte y no reclama métricas de negocio ni de usuarios.",
            en: "We were a team of 5: this case covers only my part and claims no business or user metrics.",
          },
          segments: { of: 5, on: 1 },
        },
      ],
    },
  },
  cima: {
    seo: {
      title: {
        es: "CIMA · caso de proyecto | Kendall Chacón",
        en: "CIMA · project case | Kendall Chacón",
      },
      description: {
        es: "Finanzas personales para jóvenes en Costa Rica. Mi parte: presupuestos, gastos, historial, comparativo y reportes, en el cliente Android y en el backend .NET.",
        en: "Personal finance for young people in Costa Rica. My part: budgets, expenses, history, comparison and reports, on the Android client and the .NET backend.",
      },
    },
    // Fuente: projects.summary y experience.ts («Proyecto académico en equipo», 2026).
    meta: {
      es: "Finanzas personales · Proyecto académico en equipo · 2026",
      en: "Personal finance · Team academic project · 2026",
    },
    lead: {
      es: "Finanzas personales para jóvenes en Costa Rica: movimientos, comparativos mensuales y reportes.",
      en: "Personal finance for young people in Costa Rica: movements, monthly comparisons and reports.",
    },
    // Fuente de todo el caso: repos públicos DevTeam-DAKFC/cima-mobile y cima-backend, rama dev.
    // - 60 y 49: `git shortlog -sne --all` sumando las dos identidades de git de Kendall (mismo
    //   correo), 24 nov 2026 (60 de 331 y 49 de 242). Sin barra ni porcentaje.
    // - «1 de 5» con 5 segmentos y 1 encendido: equipo de 5.
    facts: [
      {
        kind: "count",
        value: 60,
        label: { es: "commits en cima-mobile", en: "commits in cima-mobile" },
      },
      {
        kind: "count",
        value: 49,
        label: { es: "commits en cima-backend", en: "commits in cima-backend" },
      },
      {
        kind: "count",
        value: 1,
        suffix: { es: "de 5", en: "of 5" },
        label: { es: "equipo de 5", en: "team of 5" },
        meter: { type: "segments", of: 5, on: 1 },
      },
    ],
    // Stack del proyecto, por capa (projects.tech): ninguna tecnología nueva.
    stack: [
      {
        layer: { es: "Móvil", en: "Mobile" },
        icon: "lucide:smartphone",
        tech: ["kotlin", "jetpackCompose", "retrofit"],
      },
      { layer: { es: "Backend", en: "Backend" }, icon: "lucide:server", tech: ["dotnet", "efcore"] },
      { layer: { es: "Gestión", en: "Management" }, icon: "lucide:kanban", tech: ["jira"] },
    ],
    evidence: {
      es: "2 repositorios públicos: cima-mobile y cima-backend.",
      en: "2 public repositories: cima-mobile and cima-backend.",
    },
    hood: {
      // Contexto del proyecto (projects.summary), no autoría.
      problem: {
        statement: {
          es: "Una app de finanzas personales para jóvenes en Costa Rica.",
          en: "A personal finance app for young people in Costa Rica.",
        },
        lead: {
          es: "CIMA reúne en una sola app",
          en: "CIMA brings into one app",
        },
        modules: [
          { icon: "lucide:arrow-left-right", label: { es: "Movimientos", en: "Movements" } },
          { icon: "lucide:piggy-bank", label: { es: "Presupuestos", en: "Budgets" } },
          { icon: "lucide:chart-column", label: { es: "Comparativos", en: "Comparisons" } },
          { icon: "lucide:file-text", label: { es: "Reportes", en: "Reports" } },
        ],
      },
      // Fuente: commits de Kendall en cima-mobile y cima-backend (rama dev, 24 nov 2026). Sin número
      // de PR ni porcentajes. Las notificaciones solo van en el backend: no hay commits de Kendall
      // en su pantalla móvil.
      built: {
        primary: {
          tech: "kotlin",
          area: { es: "Android", en: "Android" },
          cells: [
            {
              title: { es: "Historial", en: "History" },
              line: {
                es: "Datos y dominio del endpoint, ViewModel con paginación y estado de filtros, pantalla con filtros por categoría y pruebas del ViewModel.",
                en: "Data and domain for the endpoint, a ViewModel with pagination and filter state, a screen with category filters and ViewModel tests.",
              },
              featured: true,
            },
            {
              title: { es: "Comparativo y reportes", en: "Comparison and reports" },
              line: {
                es: "Pantalla de comparativo mensual con gráfico, y lista y detalle de los reportes mensuales.",
                en: "Monthly comparison screen with a chart, and list and detail of the monthly reports.",
              },
            },
            {
              title: { es: "Gastos y presupuestos", en: "Expenses and budgets" },
              line: {
                es: "Gastos (crear, ver, editar y eliminar) y presupuestos por categoría con pantalla mensual y subcategorías.",
                en: "Expenses (create, view, edit and delete) and budgets by category with a monthly screen and subcategories.",
              },
            },
          ],
        },
        secondary: {
          tech: "dotnet",
          area: { es: "Backend .NET", en: ".NET backend" },
          cells: [
            {
              title: { es: "Historial y comparativo", en: "History and comparison" },
              line: {
                es: "Endpoints del historial de movimientos y del comparativo mensual, con sus DTO y pruebas.",
                en: "Endpoints for the movements history and the monthly comparison, with their DTOs and tests.",
              },
            },
            {
              title: { es: "Reportes y notificaciones", en: "Reports and notifications" },
              line: {
                es: "Generación mensual de reportes; modelo, servicios, endpoints y pruebas de notificaciones.",
                en: "Monthly report generation; notifications model, services, endpoints and tests.",
              },
            },
            {
              title: { es: "Gastos, presupuestos y subcategorías", en: "Expenses, budgets and subcategories" },
              line: {
                es: "CRUD de gastos, presupuestos por categoría (persistencia y consultas) y validación de la categoría padre.",
                en: "Expense CRUD, budgets by category (persistence and queries) and parent category validation.",
              },
            },
          ],
        },
      },
      // Sin capturas en esta iteración: la sección «Capturas» no se renderiza.
      // Fuente: Contracts/openapi.yaml y ReportService.cs de cima-backend (rama dev).
      decisions: [
        {
          title: { es: "El contrato va primero", en: "The contract comes first" },
          what: {
            es: "Cada endpoint nuevo parte de sus DTO y del contrato OpenAPI.",
            en: "Each new endpoint starts from its DTOs and the OpenAPI contract.",
          },
          effect: {
            es: "Sobre ese contrato van después el servicio, el endpoint y las pruebas.",
            en: "The service, the endpoint and the tests then build on that contract.",
          },
          ref: "Contracts/openapi.yaml",
        },
        {
          title: {
            es: "Un reporte fallido no frena a los demás",
            en: "A failed report does not stop the others",
          },
          what: {
            es: "Si falla un período, la generación mensual continúa y registra el error.",
            en: "If one period fails, the monthly generation carries on and logs the error.",
          },
          effect: {
            es: "Ese período se reintenta en la siguiente ejecución.",
            en: "That period is retried on the next run.",
          },
          ref: "ReportService.cs",
        },
      ],
      // Los 5 segmentos con 1 encendido son los de la ficha («1 de 5»).
      limits: [
        {
          label: { es: "Alcance", en: "Scope" },
          icon: "lucide:users",
          text: {
            es: "Fue un trabajo en equipo de 5: mis módulos son historial, comparativo, reportes, gastos y presupuestos.",
            en: "It was the work of a team of 5: my modules are history, comparison, reports, expenses and budgets.",
          },
          segments: { of: 5, on: 1 },
        },
        {
          label: { es: "Notificaciones", en: "Notifications" },
          icon: "lucide:bell",
          text: {
            es: "Mi parte es el backend (modelo, servicios y endpoints); no tengo commits de su pantalla móvil.",
            en: "My part is the backend (model, services and endpoints); I have no commits on its mobile screen.",
          },
        },
      ],
    },
  },
} as const satisfies Record<PublishedSlug, CaseStudy>;
