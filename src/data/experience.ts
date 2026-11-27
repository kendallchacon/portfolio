import type { ProjectSlug, Metric } from "./projects";
import type { TechId } from "./tech";
import { both, type Branch, type ExperienceId, type Localized, type MediaRef } from "./types";

/** Cifra con contador animado: `{ value, decimals?, suffix?, label }`. */
export type Kpi = Metric;

export type ExperienceEntry = {
  /** Hash del commit. DECORATIVO: no corresponde a ningún commit real. */
  hash: string;
  /** Vacía (`both("")`) = sin fecha visible. */
  date: Localized;
  branch: Branch;
  title: Localized;
  /** Organización o contexto bajo el título. */
  subtitle: Localized;
  body: Localized;
  /** Historias destacadas (desplegable). */
  stories?: readonly Localized[];
  kpis?: readonly Kpi[];
  /** Fotos y certificados con visor ampliado. Rutas relativas a `src/assets/experience/`. */
  attachments?: readonly MediaRef[];
  tech?: readonly TechId[];
  /** Etiquetas que no son tecnologías del registro (metodología, conceptos). */
  tags?: readonly Localized[];
  /**
   * Logo de la organización, en un tile claro junto al título (decorativo: el nombre ya va en
   * `subtitle`). Archivo en `src/assets/experience/logos/`. Sin logo no se renderiza el tile.
   */
  logo?: `${string}.${"png" | "jpg" | "webp" | "svg"}`;
  /** Si existe, la entrada enlaza al caso `/proyectos/<slug>`. */
  project?: ProjectSlug;
};

/**
 * Una entrada por cada `ExperienceId`, exactamente una vez: `Record` rechaza claves
 * repetidas y faltantes.
 */
export const experience: Record<ExperienceId, ExperienceEntry> = {
  flameware: {
    hash: "f1a7c3e",
    date: { es: "Ago – nov 2026 · concluida", en: "Aug – Nov 2026 · completed" },
    branch: "profesional",
    title: {
      es: "Práctica profesional · desarrollador full stack",
      en: "Professional internship · full stack developer",
    },
    subtitle: both("Flameware Technologies · Costa Rica Homes Realty"),
    logo: "flameware.png",
    // Solo lo respaldado por el handoff §4 (el prototipo agrega detalles que se omiten).
    body: {
      es: "Me integré a una plataforma inmobiliaria en PHP. Trabajé desde la validación de DTOs hasta el catálogo público y los cortes quincenales.",
      en: "I joined a real-estate platform built in PHP. I worked from DTO validation to the public catalog and biweekly settlements.",
    },
    stories: [
      {
        es: "CRH-117 · catálogo público con filtros y conversión de moneda",
        en: "CRH-117 · public catalog with filters and currency conversion",
      },
      { es: "CRH-135 · panel del propietario", en: "CRH-135 · owner dashboard" },
      {
        es: "CRH-150 · corte quincenal con vista previa",
        en: "CRH-150 · biweekly settlement with preview",
      },
      { es: "PR #17 · panel administrativo", en: "PR #17 · admin dashboard" },
    ],
    kpis: [
      { value: 16, label: { es: "historias y tareas", en: "stories and tasks" } },
      { value: 34, label: { es: "subtareas", en: "subtasks" } },
      {
        value: 53,
        label: { es: "pruebas en validación de DTOs", en: "tests in DTO validation" },
      },
    ],
    tech: ["php", "mysql", "javascript", "docker", "jira", "symfonyValidator"],
  },

  matchgo: {
    hash: "19af078",
    date: both("2026"),
    branch: "proyectos",
    // VERIFICAR: si se confirma la revisión del modelo de datos, agregar «y modelo de datos» /
    // «and data model» al título (revisión del modelo de datos sin confirmar; ver projects.ts).
    title: {
      es: "MatchGo · app móvil y backend",
      en: "MatchGo · mobile app and backend",
    },
    subtitle: { es: "Proyecto final en equipo · UNA", en: "Team capstone · UNA" },
    // VERIFICAR: si se confirma, agregar «Antes de implementar, revisé el modelo de datos de los
    // cuatro servicios .NET.» / «Before implementation, I reviewed the data model of the four
    // .NET services.» (revisión del modelo de datos sin confirmar).
    body: {
      es: "Desarrollé la app móvil en Flutter, con mayor peso en autenticación, reservas, comunidad y notificaciones, y colaboré en equipos y retos. En el backend .NET inicié la arquitectura de microservicios (monorepo, Gateway YARP, Docker Compose y CI inicial) y documenté las decisiones iniciales de arquitectura en ADR.",
      en: "I developed the Flutter mobile app, mainly authentication, bookings, community and notifications, and contributed to teams and challenges. On the .NET backend I started the microservices architecture (monorepo, YARP Gateway, Docker Compose and initial CI) and documented the initial architecture decisions in ADRs.",
    },
    stories: [
      {
        es: "Identity · login, refresh y logout con tokens RS256, refresh con rotación y sesiones revocables",
        en: "Identity · login, refresh and logout with RS256 tokens, rotating refresh and revocable sessions",
      },
      {
        es: "Competition · invitaciones, roles captain y member, y autorización contextual",
        en: "Competition · invitations, captain and member roles, and contextual authorization",
      },
      {
        es: "Community · moderación y directorio de miembros",
        en: "Community · moderation and member directory",
      },
      {
        es: "Autenticación servicio a servicio entre Booking e Identity y contratos OpenAPI de estos endpoints",
        en: "Service-to-service authentication between Booking and Identity, and OpenAPI contracts for these endpoints",
      },
    ],
    kpis: [
      { value: 170, label: { es: "commits en matchgo-mobile", en: "commits in matchgo-mobile" } },
      { value: 19, label: { es: "PRs integrados", en: "merged PRs" } },
      { value: 65, suffix: "%", label: { es: "de los commits", en: "of commits" } },
    ],
    // Backend: solo lo que Kendall implementó o inició; sin RabbitMQ ni MassTransit.
    tech: ["flutter", "riverpod", "dotnet", "yarp", "jwt", "docker", "postgresql"],
    project: "matchgo",
  },

  "beto-y-mas": {
    hash: "3e9a51f",
    date: { es: "3 semestres", en: "3 semesters" },
    branch: "proyectos",
    title: both("Beto y Más · full stack"),
    subtitle: {
      es: "Proyecto de graduación para un cliente real · equipo de 5",
      en: "Capstone for a real client · team of 5",
    },
    body: {
      es: "Bubble Shooter de punta a punta, recompensas con exportación a CSV, ubicaciones, perfiles y el rediseño del home. La plataforma está en producción.",
      en: "Bubble Shooter end to end, rewards with CSV export, locations, profiles and the home redesign. The platform is in production.",
    },
    tech: ["laravel", "vue", "typescript", "mysql"],
    project: "beto-y-mas",
  },

  cima: {
    hash: "b8c276d",
    date: both("2026"),
    branch: "proyectos",
    title: { es: "CIMA · Android y .NET", en: "CIMA · Android and .NET" },
    subtitle: {
      es: "Proyecto académico en equipo · DevTeam-DAKFC",
      en: "Team academic project · DevTeam-DAKFC",
    },
    body: {
      es: "Presupuestos por categoría, gastos, historial, comparativo mensual y reportes, en el cliente Android y en el backend .NET, con errores de red tipados en el cliente.",
      en: "Budgets by category, expenses, history, monthly comparison and reports, on the Android client and the .NET backend, with typed network errors on the client.",
    },
    kpis: [
      // Fuente: DevTeam-DAKFC/cima-mobile (60 de 331 commits) y DevTeam-DAKFC/cima-backend
      // (49 de 242), rama dev, `git shortlog -sne --all` sumando las dos identidades de git de
      // Kendall (mismo correo), 24 nov 2026. Equipo de 5.
      { value: 60, label: { es: "commits en cima-mobile", en: "commits in cima-mobile" } },
      { value: 49, label: { es: "commits en cima-backend", en: "commits in cima-backend" } },
    ],
    tech: ["kotlin", "jetpackCompose", "dotnet"],
    project: "cima",
  },

  infocontexto: {
    hash: "a2e91d0",
    date: both("2026"),
    branch: "logros",
    title: { es: "1.er lugar · Infocontexto 2026", en: "1st place · Infocontexto 2026" },
    subtitle: both("Universidad Nacional"),
    body: {
      es: "Presentación técnica de Beto y Más, elegida entre todos los proyectos del evento académico.",
      en: "Technical presentation of Beto y Más, chosen among all the projects at the academic event.",
    },
    attachments: [
      {
        file: "infocontexto.jpg",
        alt: {
          es: "Equipo de Beto y Más en Infocontexto 2026",
          en: "Beto y Más team at Infocontexto 2026",
        },
        width: 1100,
        height: 950,
      },
    ],
  },

  "scrum-sfc": {
    hash: "5c0b3aa",
    date: { es: "18 de mayo de 2026", en: "May 18, 2026" },
    branch: "logros",
    title: both("Scrum Fundamentals Certified (SFC)"),
    subtitle: both("SCRUMstudy · ID 1165444"),
    body: {
      es: "Roles, eventos y artefactos de Scrum.",
      en: "Scrum roles, events and artifacts.",
    },
    tags: [both("Scrum")],
    attachments: [
      {
        file: "cert-scrum.jpg",
        alt: { es: "Certificado Scrum Fundamentals", en: "Scrum Fundamentals certificate" },
        width: 986,
        height: 761,
      },
    ],
  },

  tutor: {
    hash: "7d4f2b1",
    // VERIFICAR: fechas de la entrada del tutor (handoff §9). Vacía = no se renderiza.
    date: both(""),
    branch: "docencia",
    title: { es: "Tutor de programación", en: "Programming tutor" },
    subtitle: both("Universidad Nacional"),
    body: {
      es: "Acompaño a estudiantes de Programación I y II, principalmente en Java: programación orientada a objetos, MVC, manejo de archivos, herencia y polimorfismo, y preparación de exámenes.",
      en: "I support Programming I and II students, mostly in Java: object-oriented programming, MVC, file handling, inheritance and polymorphism, and exam preparation.",
    },
    tech: ["java"],
    tags: [{ es: "POO", en: "OOP" }, both("MVC")],
  },

  "puertas-abiertas": {
    hash: "e3a81c4",
    date: both("2025"),
    branch: "docencia",
    title: { es: "Evento de puertas abiertas", en: "Open house event" },
    subtitle: both("Universidad Nacional"),
    body: {
      es: "Presenté la carrera y conceptos básicos de informática a estudiantes de colegio.",
      en: "I presented the degree and basic computing concepts to high-school students.",
    },
    attachments: [
      {
        file: "puertas-abiertas.jpg",
        alt: { es: "Puertas abiertas en la UNA", en: "Open house at UNA" },
        width: 933,
        height: 1400,
      },
    ],
  },

  "campamento-tutores": {
    hash: "0b9d6e2",
    date: both("2024"),
    branch: "docencia",
    title: { es: "Campamento de tutores", en: "Tutors camp" },
    subtitle: both("Universidad Nacional"),
    body: {
      es: "Formación y trabajo colaborativo para enseñar y liderar mejor.",
      en: "Training and collaborative work to teach and lead better.",
    },
    attachments: [
      {
        file: "evento-tutores.jpg",
        alt: { es: "Campamento de tutores 2024", en: "Tutors camp 2024" },
        width: 1000,
        height: 750,
      },
    ],
  },

  bachillerato: {
    hash: "9f00c2d",
    date: { es: "Concluido · 2026", en: "Completed · 2026" },
    branch: "formacion",
    title: {
      es: "Bachillerato en Ingeniería en Sistemas",
      en: "Bachelor's degree in Systems Engineering",
    },
    subtitle: {
      es: "Universidad Nacional, sede Sarapiquí",
      en: "Universidad Nacional, Sarapiquí campus",
    },
    body: {
      es: "Todos los cursos aprobados, con promedio ponderado de 9,0. El título se entrega en la ceremonia de graduación de 2027.",
      en: "All courses passed, with a 9.0/10 weighted GPA. The diploma is awarded at the 2027 graduation ceremony.",
    },
    // 9,0 en ES / 9.0 en EN: el formato lo resuelve el componente con `decimals`.
    kpis: [{ value: 9, decimals: 1, label: { es: "promedio ponderado", en: "weighted GPA" } }],
  },

  diplomado: {
    hash: "4be7a95",
    date: { es: "4 de noviembre de 2025", en: "November 4, 2025" },
    branch: "formacion",
    title: {
      es: "Diplomado en Programación de Aplicaciones Informáticas",
      en: "Diploma in Computer Applications Programming",
    },
    subtitle: both("Universidad Nacional, Sarapiquí"),
    body: {
      es: "Fundamentos de programación, estructuras de datos y desarrollo de aplicaciones.",
      en: "Programming fundamentals, data structures and application development.",
    },
    attachments: [
      {
        file: "cert-diplomado.jpg",
        alt: { es: "Título del diplomado", en: "Diploma certificate" },
        width: 1400,
        height: 1090,
      },
    ],
  },

  "proyectos-java": {
    hash: "c71e0f8",
    date: { es: "Durante la carrera", en: "Throughout the degree" },
    branch: "formacion",
    title: { es: "Proyectos académicos en Java", en: "Academic Java projects" },
    subtitle: { es: "Código no publicado", en: "Code not published" },
    body: {
      es: "Aplicaciones de escritorio con estructuras de datos propias: REDUNA (red social con Dijkstra), gestor de contenedores portuarios, TranspoRoute, AutoTech y gestión hospitalaria.",
      en: "Desktop applications with custom data structures: REDUNA (a social network with Dijkstra), a port container manager, TranspoRoute, AutoTech and hospital management.",
    },
    tech: ["java"],
  },
};

/**
 * Orden del git log, tal como aparece en el prototipo. Debe contener cada `ExperienceId` exactamente una vez: los tipos
 * `OrderIsComplete` y `OrderHasNoDuplicates` fallan en `astro check` si falta o sobra alguno.
 */
export const experienceOrder = [
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
] as const satisfies readonly ExperienceId[];

type Order = typeof experienceOrder;

type HasDuplicates<T extends readonly unknown[]> = T extends readonly [infer Head, ...infer Rest]
  ? Head extends Rest[number]
    ? true
    : HasDuplicates<Rest>
  : false;

type Assert<T extends true> = T;

/** Falla si algún `ExperienceId` no aparece en `experienceOrder`. */
export type OrderIsComplete = Assert<
  [Exclude<ExperienceId, Order[number]>] extends [never] ? true : false
>;

/** Falla si algún `ExperienceId` aparece más de una vez en `experienceOrder`. */
export type OrderHasNoDuplicates = Assert<HasDuplicates<Order> extends false ? true : false>;

/** Entradas en orden de aparición, con su id. */
export const experienceLog = experienceOrder.map((id) => ({ id, ...experience[id] }));
