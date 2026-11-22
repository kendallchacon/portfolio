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
};

export type Principle = {
  id: string;
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

// VERIFICAR (todos los fragmentos de repos privados): confirmar si son literales o adaptados.
export const criterio = [
  {
    id: "regla-en-la-base",
    title: {
      es: "La regla vive donde no se puede saltar",
      en: "The rule lives where it can't be skipped",
    },
    body: {
      es: "Dos personas pueden reservar la misma cancha a la vez. En MatchGo no lo evita un if: lo evita PostgreSQL con una restricción de exclusión sobre el rango de la reserva.",
      en: "Two people can book the same court at once. In MatchGo an if doesn't prevent it: PostgreSQL does, with an exclusion constraint over the booking range.",
    },
    file: {
      // La restricción GiST la escribió Cristofer: NO atribuírsela a Kendall.
      authorship: "team",
      snippet: {
        kind: "sql",
        repo: matchgoBackend,
        path: "Booking/.../InitialBookingSchema.cs",
        lines: [
          "ALTER TABLE magt_reservations",
          "    ADD CONSTRAINT ex_reservations_no_overlap",
          "    EXCLUDE USING gist (",
          "        sports_space_id WITH =,",
          "        tstzrange(starts_at, ends_at, '[)') WITH &&",
          "    )",
          "    WHERE (status IN ('pending','confirmed'));",
        ],
      },
    },
  },
  {
    id: "base-por-servicio",
    title: { es: "Cada servicio es dueño de sus datos", en: "Each service owns its data" },
    body: {
      es: "Una base de datos por servicio, sin llaves foráneas ni joins entre servicios. Lo que cruza fronteras viaja por APIs o eventos con IDs estables. La decisión quedó escrita en un ADR, con sus costos.",
      en: "One database per service, with no cross-service foreign keys or joins. Anything crossing boundaries travels through APIs or events with stable IDs. The decision is written in an ADR, with its costs.",
    },
    file: {
      // VERIFICAR: autoría de ADR 0003 (handoff §9).
      authorship: "unconfirmed",
      snippet: {
        kind: "md",
        repo: matchgoBackend,
        path: "docs/decisions/0003-use-database-per-service.md",
        lines: [
          "## Decision",
          "Each service owns an independent PostgreSQL database.",
          "Booking additionally uses PostGIS.",
          "",
          "Services cannot access another service's database,",
          "tables, DbContext or migrations.",
          "",
          "## Consequences",
          "- Independent schema evolution and migrations.",
          "- No cross-service joins or foreign keys.",
          "- Cross-service workflows may be eventually consistent.",
        ],
      },
    },
  },
  {
    id: "reintentar-sin-duplicar",
    title: { es: "Reintentar sin duplicar", en: "Retry without duplicating" },
    body: {
      es: "Aceptar un reto toca dos bases de datos. En lugar de una transacción distribuida, el ID del reto es la llave de idempotencia de la reserva: si la red falla y se reintenta, no aparece una segunda reserva.",
      en: "Accepting a challenge touches two databases. Instead of a distributed transaction, the challenge ID is the reservation's idempotency key: if the network fails and the request is retried, no second booking appears.",
    },
    file: {
      // VERIFICAR: autoría de ADR 0010 (handoff §9).
      authorship: "unconfirmed",
      snippet: {
        kind: "md",
        repo: matchgoBackend,
        path: "docs/decisions/0010-coordinate-competitive-booking-with-idempotent-http.md",
        lines: [
          "## Decision",
          "Competition coordinates the immediate workflow",
          "through Booking HTTP APIs. The Challenge ID is the",
          "Booking `externalReferenceId` and therefore the",
          "idempotency key.",
          "",
          "The ACCEPT operation may be retried after the",
          "invitation is already accepted. Retry resumes",
          "coordination instead of repeating the state transition.",
        ],
      },
    },
  },
  {
    id: "errores-tipados",
    title: { es: "Los errores también son contrato", en: "Errors are part of the contract" },
    // VERIFICAR (principio 3): «En las apps que construí» depende de que Kendall sea autor de
    // dio_failure_mapper, cuya autoría está sin confirmar (handoff §9).
    body: {
      es: "En las apps que construí, cada respuesta del servidor se convierte en un error tipado. La pantalla sabe si fue validación, conflicto o límite de solicitudes, y un 504 se marca como resultado incierto para no repetir un cobro o una reserva.",
      en: "In the apps I built, every server response becomes a typed error. The screen knows whether it was validation, a conflict or rate limiting, and a 504 is flagged as an uncertain outcome so a payment or booking isn't repeated.",
    },
    file: {
      // VERIFICAR: autoría de dio_failure_mapper (handoff §9).
      authorship: "unconfirmed",
      snippet: {
        kind: "dart",
        repo: matchgoMobile,
        path: "lib/core/network/dio_failure_mapper.dart",
        lines: [
          "AppFailure _fromResponse(Response<dynamic>? response) {",
          "  final statusCode = response?.statusCode;",
          "",
          "  final kind = switch (statusCode) {",
          "    400 || 422 => FailureKind.validation,",
          "    401 => FailureKind.unauthorized,",
          "    409 => FailureKind.conflict,",
          "    429 => FailureKind.rateLimited,",
          "    final int code when code >= 500 => FailureKind.server,",
          "    _ => FailureKind.unknown,",
          "  };",
          "",
          "  return AppFailure(",
          "    kind: kind,",
          "    retryAfter: _retryAfter(response),",
          "    // The gateway gave up waiting for the service, which may still finish.",
          "    outcomeUnknown: statusCode == 504,",
          "  );",
          "}",
        ],
      },
    },
  },
  {
    id: "capas",
    title: { es: "Cada capa con una sola responsabilidad", en: "One responsibility per layer" },
    // VERIFICAR (principio 4): la anécdota de la revisión de PR en Flameware viene solo del
    // prototipo; no está en el handoff §4 (que respalda únicamente historias, subtareas y pruebas).
    body: {
      es: "En Flameware, una revisión de PR me pidió mover lógica del controlador al servicio. Desde entonces lo aplico en todo: en matchgo-mobile cada funcionalidad separa datos, dominio y presentación, y las pantallas nunca llaman a la red.",
      en: "At Flameware, a PR review asked me to move logic from the controller to the service. Since then I apply it everywhere: in matchgo-mobile each feature separates data, domain and presentation, and screens never call the network.",
    },
    file: {
      authorship: "own",
      snippet: {
        kind: "tree",
        repo: matchgoMobile,
        path: "lib/features/booking/",
        lines: [
          "lib/features/booking/",
          "├── data/",
          "│   ├── datasources/      # Dio vive aquí",
          "│   ├── dto/              # contrato con el backend",
          "│   ├── mappers/          # DTO → dominio",
          "│   └── repositories/",
          "├── domain/",
          "│   ├── policies/         # reglas de negocio",
          "│   ├── repositories/     # abstracciones",
          "│   └── usecases/",
          "└── presentation/",
          "    ├── controllers/      # Riverpod",
          "    ├── screens/          # sin lógica de negocio",
          "    └── widgets/",
        ],
      },
    },
  },
  {
    id: "reproducible",
    title: {
      es: "Si no se puede reproducir, no está listo",
      en: "If it can't be reproduced, it isn't done",
    },
    body: {
      es: "Cada entorno arranca con un comando y cada cambio pasa por CI. En el lab, cada push publica imágenes en GHCR y Kubernetes solo envía tráfico cuando el servicio responde en /health.",
      en: "Every environment starts with one command and every change goes through CI. In the lab, every push publishes images to GHCR and Kubernetes only routes traffic once the service answers on /health.",
    },
    file: {
      authorship: "own",
      fileUrl:
        "https://github.com/kendallchacon/docker-kubernetes-lab/blob/main/kubernetes/orders-deployment.yaml",
      snippet: {
        kind: "yaml",
        repo: lab,
        path: "kubernetes/orders-deployment.yaml",
        lines: [
          "containers:",
          "  - name: orders-service",
          "    image: ghcr.io/kendallchacon/docker-kubernetes-lab-orders-service:latest",
          "    ports:",
          "      - containerPort: 3001",
          "    readinessProbe:",
          "      httpGet:",
          "        path: /health",
          "        port: 3001",
          "    livenessProbe:",
          "      httpGet:",
          "        path: /health",
          "        port: 3001",
        ],
      },
    },
  },
] as const satisfies readonly Principle[];

export type PrincipleId = (typeof criterio)[number]["id"];
