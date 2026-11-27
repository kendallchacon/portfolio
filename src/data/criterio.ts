import type { CodeSnippet, HttpsUrl, Localized, RepoRef } from "./types";

/**
 * Quién escribió el archivo que muestra el visor:
 * - `own`          lo escribió Kendall.
 * - `team`         lo escribió un compañero (no atribuírselo a Kendall).
 * - `unconfirmed`  autoría sin confirmar (handoff §9); no renderizar hasta resolverlo.
 */
export type Authorship = "own" | "team" | "unconfirmed";

export type CriterioFile = {
  authorship: Authorship;
  snippet: CodeSnippet;
  /** Enlace al archivo: solo para repos públicos. Los privados no llevan enlaces. */
  fileUrl?: HttpsUrl;
  /** Número real, en el archivo fuente, de la primera línea del fragmento (gutter del visor). */
  startLine: number;
  /** Líneas resaltadas: rangos `[desde, hasta]` 1-based dentro del fragmento. */
  highlight: readonly (readonly [from: number, to: number])[];
};

export type Principle = {
  id: string;
  /** Tipo de archivo que muestra el visor (fila de la guía: "tipo · repo"). */
  kind: Localized;
  title: Localized;
  body: Localized;
  file: CriterioFile;
};

// Repos privados: sin url (lo impone `RepoRef`) y solo fragmentos cortos.
const matchgoBackend: RepoRef = { name: "matchgo-backend", visibility: "private" };
const matchgoMobile: RepoRef = { name: "matchgo-mobile", visibility: "private" };
const lab: RepoRef = {
  name: "docker-kubernetes-lab",
  visibility: "public",
  url: "https://github.com/kendallchacon/docker-kubernetes-lab",
};

// Fragmentos literales, verificados el 2026-11-26 contra:
// - matchgo-backend, rama dev: docs/decisions/0003-use-database-per-service.md
// - matchgo-mobile, rama dev: lib/core/network/dio_failure_mapper.dart y lib/features/booking/
// - docker-kubernetes-lab, rama main: kubernetes/orders-deployment.yaml
// El YAML va sin la sangría común del archivo (10 espacios); el árbol omite carpetas con "…".
// `startLine` verificado contra los mismos archivos (ADR 10, dart 34, YAML 23).
export const criterio = [
  {
    id: "base-por-servicio",
    kind: { es: "ADR", en: "ADR" },
    title: { es: "Cada servicio es dueño de sus datos", en: "Each service owns its data" },
    body: {
      es: "Una base de datos por servicio, sin llaves foráneas ni joins entre servicios. Lo que cruza fronteras viaja por APIs o eventos con IDs estables. La decisión la dejé escrita en un ADR, con sus costos.",
      en: "One database per service, with no cross-service foreign keys or joins. Anything crossing boundaries travels through APIs or events with stable IDs. I wrote the decision down in an ADR, with its costs.",
    },
    file: {
      authorship: "own",
      startLine: 10,
      highlight: [[5, 5]],
      snippet: {
        kind: "md",
        repo: matchgoBackend,
        path: "docs/decisions/0003-use-database-per-service.md",
        lines: [
          "## Decision",
          "",
          "Each service owns an independent PostgreSQL database. Booking additionally uses PostGIS for geospatial capabilities.",
          "",
          "Services cannot access another service's database, tables, DbContext or migrations. Cross-service information uses APIs or integration events and stable IDs.",
        ],
      },
    },
  },
  {
    id: "errores-tipados",
    kind: { es: "Dart", en: "Dart" },
    title: { es: "Los errores también son contrato", en: "Errors are part of the contract" },
    body: {
      es: "En las apps que construí, cada respuesta del servidor se convierte en un error tipado. La pantalla sabe si fue validación, conflicto o límite de solicitudes, y un 504 se marca como resultado incierto para no repetir un cobro o una reserva.",
      en: "In the apps I built, every server response becomes a typed error. The screen knows whether it was validation, a conflict or rate limiting, and a 504 is flagged as an uncertain outcome so a payment or booking isn't repeated.",
    },
    file: {
      authorship: "own",
      // 17–18: el comentario del 504 y `outcomeUnknown` (líneas 50–51 del archivo).
      startLine: 34,
      highlight: [[17, 18]],
      snippet: {
        kind: "dart",
        repo: matchgoMobile,
        path: "lib/core/network/dio_failure_mapper.dart",
        lines: [
          "  final kind = switch (statusCode) {",
          "    400 || 422 => FailureKind.validation,",
          "    401 => FailureKind.unauthorized,",
          "    403 => FailureKind.forbidden,",
          "    404 => FailureKind.notFound,",
          "    409 => FailureKind.conflict,",
          "    429 => FailureKind.rateLimited,",
          "    final int code when code >= 500 && code <= 599 => FailureKind.server,",
          "    _ => FailureKind.unknown,",
          "  };",
          "",
          "  return AppFailure(",
          "    kind: kind,",
          "    statusCode: statusCode,",
          "    fieldErrors: fieldErrors,",
          "    retryAfter: _retryAfter(response),",
          "    // The gateway gave up waiting for the service, which may still finish.",
          "    outcomeUnknown: statusCode == 504,",
          "    code: _extractCode(response?.data),",
          "  );",
        ],
      },
    },
  },
  {
    id: "capas",
    kind: { es: "Estructura", en: "Structure" },
    title: { es: "Cada capa con una sola responsabilidad", en: "One responsibility per layer" },
    body: {
      es: "En matchgo-mobile cada funcionalidad separa datos, dominio y presentación, y las pantallas no llaman a la red.",
      en: "In matchgo-mobile each feature separates data, domain and presentation, and screens don't call the network.",
    },
    file: {
      authorship: "own",
      // Árbol de carpetas, no un archivo: numeración desde 1. data/, domain/ y presentation/.
      startLine: 1,
      highlight: [
        [2, 2],
        [7, 7],
        [13, 13],
      ],
      snippet: {
        kind: "tree",
        repo: matchgoMobile,
        path: "lib/features/booking/",
        lines: [
          "lib/features/booking/",
          "├── data/",
          "│   ├── datasources/",
          "│   ├── dto/",
          "│   ├── mappers/",
          "│   └── repositories/",
          "├── domain/",
          "│   ├── entities/",
          "│   ├── policies/",
          "│   ├── repositories/",
          "│   ├── usecases/",
          "│   └── …",
          "└── presentation/",
          "    ├── controllers/",
          "    ├── screens/",
          "    └── …",
        ],
      },
    },
  },
  {
    id: "reproducible",
    kind: { es: "YAML", en: "YAML" },
    title: {
      es: "Si no se puede reproducir, no está listo",
      en: "If it can't be reproduced, it isn't done",
    },
    body: {
      es: "Cada entorno arranca con un comando (docker compose up) y cada push a main publica las imágenes en GHCR. Kubernetes solo envía tráfico cuando el servicio responde en /health.",
      en: "Every environment starts with one command (docker compose up) and every push to main publishes the images to GHCR. Kubernetes only routes traffic once the service answers on /health.",
    },
    file: {
      authorship: "own",
      fileUrl:
        "https://github.com/kendallchacon/docker-kubernetes-lab/blob/main/kubernetes/orders-deployment.yaml",
      startLine: 23,
      highlight: [[1, 4]],
      snippet: {
        kind: "yaml",
        repo: lab,
        path: "kubernetes/orders-deployment.yaml",
        lines: [
          "readinessProbe:",
          "  httpGet:",
          "    path: /health",
          "    port: 3001",
          "  initialDelaySeconds: 2",
          "  periodSeconds: 5",
          "livenessProbe:",
          "  httpGet:",
          "    path: /health",
          "    port: 3001",
          "  initialDelaySeconds: 5",
          "  periodSeconds: 10",
        ],
      },
    },
  },
] as const satisfies readonly Principle[];

export type PrincipleId = (typeof criterio)[number]["id"];
