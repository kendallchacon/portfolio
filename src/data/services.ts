import type { TechId } from "./tech";
import { both, type ExperienceId, type HttpsUrl, type Localized, type MediaRef, type RepoRef } from "./types";

/** Referencia verificable bajo cada servicio (repos, PRs, historias, sitios). */
export type Reference =
  | { kind: "repo"; repo: RepoRef; detail?: Localized }
  | { kind: "link"; label: Localized; href: HttpsUrl }
  | { kind: "experience"; label: Localized; id: ExperienceId };

export type ApiLogStep =
  | { type: "request"; method: "GET" | "POST"; path: string; note?: Localized }
  | {
      type: "response";
      status: 200 | 201 | 409;
      reason: "OK" | "Created" | "Conflict";
      note: Localized;
    };

type ServiceBase = {
  title: Localized;
  description: Localized;
  tech: readonly TechId[];
  references: readonly Reference[];
};

export type Service =
  | (ServiceBase & {
      id: "api";
      /** Ventana animada: título de la barra y pasos 200 → 201 → 409. */
      apiLog: { window: string; steps: readonly ApiLogStep[] };
    })
  | (ServiceBase & { id: "web"; media?: readonly MediaRef[] })
  | (ServiceBase & { id: "mobile"; media?: readonly MediaRef[] })
  | (ServiceBase & {
      id: "ops";
      /** Mini panel de CI: título de la ventana y checks que pasan. */
      ci: { window: string; checks: readonly Localized[] };
    });

export type ServiceId = Service["id"];

const matchgoBackend: RepoRef = { name: "matchgo-backend", visibility: "private" };
const matchgoMobile: RepoRef = { name: "matchgo-mobile", visibility: "private" };

export const services: readonly Service[] = [
  {
    id: "api",
    title: { es: "Backend y APIs", en: "Backend and APIs" },
    // VERIFICAR: microservicios con mensajería, JWT, contratos OpenAPI y reglas que la base de
    // datos hace cumplir no están en el handoff §4 y pueden ser trabajo de compañeros.
    description: {
      es: "APIs REST con contratos OpenAPI, microservicios con mensajería, autenticación con JWT y reglas de negocio que la base de datos hace cumplir.",
      en: "REST APIs with OpenAPI contracts, microservices with messaging, JWT authentication and business rules the database enforces.",
    },
    tech: ["dotnet", "laravel", "postgresql", "mysql", "rabbitmq"],
    references: [
      // VERIFICAR: la contribución de Kendall a matchgo-backend no está confirmada; el handoff
      // §4 solo respalda matchgo-mobile.
      { kind: "repo", repo: matchgoBackend, detail: both("OpenAPI") },
      {
        kind: "experience",
        label: both("Flameware · CRH-150 corte quincenal"),
        id: "flameware",
      },
    ],
    // VERIFICAR: ilustración tomada del prototipo. Confirmar que las rutas, el 409 y el
    // código SLOT_UNAVAILABLE existen tal cual en matchgo-backend antes de presentarlo como real.
    apiLog: {
      window: "matchgo · booking-api",
      steps: [
        {
          type: "request",
          method: "GET",
          path: "/api/v1/sports-spaces/7/availability?date=2026-11-14",
        },
        {
          type: "response",
          status: 200,
          reason: "OK",
          note: {
            es: "horarios disponibles del espacio",
            en: "available slots for the space",
          },
        },
        {
          type: "request",
          method: "POST",
          path: "/api/v1/reservations",
          note: both("20:00–21:00"),
        },
        {
          type: "response",
          status: 201,
          reason: "Created",
          note: { es: "Reserva creada", en: "Reservation created" },
        },
        {
          type: "request",
          method: "POST",
          path: "/api/v1/reservations",
          note: both("20:30–21:30"),
        },
        {
          type: "response",
          status: 409,
          reason: "Conflict",
          note: both("SLOT_UNAVAILABLE · ex_reservations_no_overlap"),
        },
      ],
    },
  },
  {
    id: "web",
    title: { es: "Aplicaciones web", en: "Web applications" },
    description: {
      es: "Paneles administrativos, catálogos con filtros y juegos web conectados a un backend que valida.",
      en: "Admin dashboards, filtered catalogs and web games connected to a validating backend.",
    },
    tech: ["vue", "typescript", "inertia", "javascript"],
    references: [
      { kind: "link", label: both("betoymas.com"), href: "https://betoymas.com/" },
      { kind: "experience", label: both("Flameware · PR #17"), id: "flameware" },
    ],
    media: [
      {
        file: "beto-juegos.jpg",
        alt: {
          es: "Catálogo de juegos de Beto y Más",
          en: "Beto y Más game catalog",
        },
        width: 1400,
        height: 732,
      },
    ],
  },
  {
    id: "mobile",
    title: { es: "Apps móviles", en: "Mobile apps" },
    description: {
      es: "Flutter y Android nativo con Kotlin, por capas, con errores tipados y en dos idiomas.",
      en: "Flutter and native Android with Kotlin, layered, with typed errors and in two languages.",
    },
    tech: ["flutter", "dart", "kotlin", "jetpackCompose"],
    references: [
      { kind: "repo", repo: matchgoMobile, detail: both("170 commits") },
      {
        kind: "repo",
        repo: {
          name: "cima-mobile",
          visibility: "public",
          url: "https://github.com/DevTeam-DAKFC/cima-mobile",
        },
      },
    ],
    // Capturas decorativas (alt vacío). VERIFICAR: consentimiento de avatares de terceros
    // en capturas de MatchGo (handoff §9, hoy solo mencionado para 09 y 10).
    media: [
      { file: "01.jpg", alt: both(""), width: 720, height: 1560 },
      { file: "06.jpg", alt: both(""), width: 720, height: 1560 },
    ],
  },
  {
    id: "ops",
    title: {
      es: "Infraestructura y trabajo en equipo",
      en: "Infrastructure and teamwork",
    },
    description: {
      es: "Entornos con Docker Compose, imágenes publicadas por CI, manifiestos de Kubernetes y trabajo por historias con Jira, Git Flow y revisión de PRs.",
      en: "Docker Compose environments, CI-published images, Kubernetes manifests and story-based work with Jira, Git Flow and PR reviews.",
    },
    tech: ["docker", "kubernetes", "githubActions", "git", "jira"],
    references: [
      {
        kind: "repo",
        repo: {
          name: "docker-kubernetes-lab",
          visibility: "public",
          url: "https://github.com/kendallchacon/docker-kubernetes-lab",
        },
      },
      // VERIFICAR: la contribución de Kendall a matchgo-backend no está confirmada; el handoff
      // §4 solo respalda matchgo-mobile.
      { kind: "repo", repo: matchgoBackend, detail: both("ci.yml") },
    ],
    // VERIFICAR: checks tomados del prototipo; confirmar contra el ci.yml de matchgo-backend.
    ci: {
      window: "Backend CI · validate",
      checks: [
        both("restore · build"),
        both("code style"),
        both("tests + PostgreSQL"),
        both("audit NuGet"),
        both("compose config"),
        both("docker images"),
      ],
    },
  },
];
