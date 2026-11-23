import type { TechId } from "./tech";
import { both, type ExperienceId, type HttpsUrl, type Localized, type MediaRef, type RepoRef } from "./types";

/** Referencia verificable bajo cada servicio (repos, PRs, historias, sitios). */
export type Reference =
  | { kind: "repo"; repo: RepoRef; detail?: Localized }
  | { kind: "link"; label: Localized; href: HttpsUrl }
  | {
      kind: "experience";
      label: Localized;
      id: ExperienceId;
      /** Ícono de la referencia: PR o historia (issue). Sin él, ícono genérico de experiencia. */
      icon?: "pr" | "issue";
    };

export type ApiLogStep =
  /** Comentario visible entre flujos (p. ej. `# identity`). */
  | { type: "comment"; text: string }
  | { type: "request"; method: "GET" | "POST"; path: string; note?: Localized }
  | {
      type: "response";
      status: 200 | 201 | 204 | 403 | 409;
      reason: "OK" | "Created" | "No Content" | "Forbidden" | "Conflict";
      note: Localized;
    };

/** Paso de la franja de entrega de imágenes; `note` se lee solo con lector de pantalla. */
export type DeliveryStep = {
  icon: "push" | "image" | "registry" | "manifest";
  label: Localized;
  note?: Localized;
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
      /** Ventana animada: título de la barra y pasos de solicitud/respuesta. */
      apiLog: { window: string; steps: readonly ApiLogStep[] };
    })
  | (ServiceBase & { id: "web"; media?: readonly MediaRef[] })
  | (ServiceBase & { id: "mobile"; media?: readonly MediaRef[] })
  | (ServiceBase & {
      id: "ops";
      /** Mini panel de CI: título de la ventana y checks que pasan. */
      ci: { window: string; checks: readonly Localized[] };
      /** Franja bajo el CI: qué publica el repo de práctica (no despliega). */
      delivery: { source: string; label: Localized; steps: readonly DeliveryStep[] };
    });

export type ServiceId = Service["id"];

const matchgoBackend: RepoRef = { name: "matchgo-backend", visibility: "private" };
const matchgoMobile: RepoRef = { name: "matchgo-mobile", visibility: "private" };

export const services: readonly Service[] = [
  {
    id: "api",
    title: { es: "Backend y APIs", en: "Backend and APIs" },
    description: {
      es: "APIs REST en microservicios .NET: autenticación con JWT (RS256 y refresh con rotación), autorización por rol de equipo y contratos OpenAPI documentados.",
      en: "REST APIs in .NET microservices: JWT authentication (RS256 and rotating refresh tokens), team-role authorization and documented OpenAPI contracts.",
    },
    tech: ["dotnet", "laravel", "postgresql", "mysql"],
    references: [
      { kind: "repo", repo: matchgoBackend, detail: both("OpenAPI") },
      {
        kind: "experience",
        label: both("Flameware · CRH-150 corte quincenal"),
        id: "flameware",
        icon: "issue",
      },
    ],
    apiLog: {
      window: "matchgo · api · /api/v1",
      // Rutas y códigos verificados en los controladores de Identity y Competition de matchgo-backend.
      // La base común ([Route("api/v1")]) va en la barra; las filas muestran la ruta relativa.
      // {id} = {teamId:guid} del controlador (con {teamId} la fila hace wrap a 1000 px).
      steps: [
        { type: "comment", text: "# identity" },
        { type: "request", method: "POST", path: "/auth/login" },
        {
          type: "response",
          status: 200,
          reason: "OK",
          note: both("access + refresh"),
        },
        { type: "request", method: "POST", path: "/auth/refresh" },
        {
          type: "response",
          status: 200,
          reason: "OK",
          note: { es: "refresh rotado", en: "refresh rotated" },
        },
        { type: "request", method: "POST", path: "/auth/logout" },
        {
          type: "response",
          status: 204,
          reason: "No Content",
          note: { es: "revocada", en: "revoked" },
        },
        { type: "comment", text: "# competition" },
        { type: "request", method: "POST", path: "/teams/{id}/invitations" },
        {
          type: "response",
          status: 201,
          reason: "Created",
          note: both("status: pending"),
        },
        { type: "request", method: "POST", path: "/teams/{id}/invitations" },
        {
          type: "response",
          status: 403,
          reason: "Forbidden",
          note: { es: "solo capitán", en: "captain only" },
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
      { kind: "experience", label: both("Flameware · PR #17"), id: "flameware", icon: "pr" },
    ],
    // Captura activada por decisión del autor.
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
    // Capturas decorativas (alt vacío), activadas por decisión del autor.
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
      { kind: "repo", repo: matchgoBackend, detail: { es: "CI inicial", en: "Initial CI" } },
    ],
    // Los 6 checks coinciden con el workflow de matchgo-backend (restore+build, estilo, tests con
    // PostgreSQL, auditoría NuGet, config de Compose e imágenes). Etiquetas cortas: caben en una
    // línea en las celdas de 2 columnas del prototipo.
    ci: {
      window: "Backend CI · validate",
      checks: [
        both("build"),
        both("code style"),
        both("tests + PG"),
        both("audit NuGet"),
        both("compose cfg"),
        both("docker images"),
      ],
    },
    // Verificado en docker-kubernetes-lab: publish-images.yml construye y publica en GHCR al hacer
    // push a main; los manifiestos de kubernetes/ referencian esas imágenes, no se aplican solos.
    delivery: {
      source: "# docker-kubernetes-lab",
      label: {
        es: "Publicación de imágenes en docker-kubernetes-lab",
        en: "Image publishing in docker-kubernetes-lab",
      },
      steps: [
        { icon: "push", label: { es: "push a main", en: "push to main" } },
        { icon: "image", label: { es: "imágenes Docker", en: "Docker images" } },
        { icon: "registry", label: both("GHCR") },
        {
          icon: "manifest",
          label: { es: "manifiestos K8s", en: "K8s manifests" },
          note: { es: "(usan las imágenes de GHCR)", en: "(use the GHCR images)" },
        },
      ],
    },
  },
];
