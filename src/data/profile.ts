import type { Lang } from "../i18n/ui";
import type { TechId } from "./tech";
import { both, type Localized, type SectionId } from "./types";

export type Profile = {
  name: string;
  role: Localized;
  degree: {
    title: Localized;
    institution: Localized;
    institutionShort: string;
    gpa: { value: number; scale: number };
    graduationYear: number;
  };
  location: { place: string; modality: Localized };
  availability: { status: "available"; label: Localized };
};

export const profile: Profile = {
  name: "Kendall Chacón Molina",
  role: {
    es: "Desarrollador backend y full stack",
    en: "Backend and full stack developer",
  },
  degree: {
    title: {
      es: "Bachiller en Ingeniería en Sistemas",
      en: "B.S. in Systems Engineering",
    },
    institution: {
      es: "Universidad Nacional, sede Sarapiquí",
      en: "Universidad Nacional, Sarapiquí campus",
    },
    institutionShort: "UNA",
    /** Promedio ponderado. La escala (sobre 10) sale del texto en inglés del prototipo. */
    gpa: { value: 9, scale: 10 },
    /** Todos los cursos aprobados; el título se entrega en la graduación de 2027. */
    graduationYear: 2027,
  },
  location: {
    place: "Sarapiquí, Costa Rica",
    modality: { es: "presencial o remoto", en: "on-site or remote" },
  },
  availability: {
    status: "available",
    label: {
      es: "Disponible para proyectos y empleo · Costa Rica / remoto",
      en: "Available for projects and roles · Costa Rica / remote",
    },
  },
};

export type HeroButton = {
  label: Localized;
  href: `#${SectionId}`;
  variant: "primary" | "secondary";
};

export const hero = {
  headline: {
    es: "Desarrollo backend y full stack que llega a producción.",
    en: "Backend and full stack development that reaches production.",
  },
  intro: {
    es: "Soy Kendall Chacón, bachiller en Ingeniería en Sistemas. Diseño APIs, bases de datos y servicios con .NET y Laravel, y construyo las apps web y móviles que los usan.",
    en: "I'm Kendall Chacón, with a bachelor's degree in Systems Engineering. I design APIs, databases and services with .NET and Laravel, and build the web and mobile apps that use them.",
  },
  buttons: [
    {
      label: { es: "Ver proyectos", en: "See projects" },
      href: "#proyectos",
      variant: "primary",
    },
    {
      label: { es: "Trabajemos juntos", en: "Let's work together" },
      href: "#contacto",
      variant: "secondary",
    },
  ] satisfies readonly HeroButton[],
  /** Los 8 logos de la portada, en orden. */
  logos: [
    "dotnet",
    "laravel",
    "vue",
    "typescript",
    "kotlin",
    "flutter",
    "postgresql",
    "docker",
  ] as const satisfies readonly TechId[],
} as const;

export type EvidenceId = "degree" | "internship" | "production" | "award";

export type Evidence = {
  id: EvidenceId;
  title: Localized;
  detail: Localized;
};

/** Franja de evidencias bajo la portada. */
export const evidence: readonly Evidence[] = [
  {
    id: "degree",
    title: { es: "Bachillerato concluido", en: "Bachelor's degree completed" },
    detail: {
      es: "Promedio ponderado 9,0 · UNA",
      en: "Weighted GPA 9.0/10 · UNA",
    },
  },
  {
    id: "internship",
    title: {
      es: "Práctica profesional concluida",
      en: "Professional internship completed",
    },
    // VERIFICAR: nombrar públicamente a Flameware está pendiente de confirmar (handoff §9).
    detail: both("Flameware Technologies · 2026"),
  },
  {
    id: "production",
    title: { es: "Plataforma en producción", en: "Platform in production" },
    detail: both("Beto y Más · betoymas.com"),
  },
  {
    id: "award",
    title: { es: "1.er lugar Infocontexto 2026", en: "1st place Infocontexto 2026" },
    detail: both("Universidad Nacional"),
  },
];

/**
 * Idiomas del SITIO (handoff §1: español por defecto e inglés), con su nombre nativo.
 * VERIFICAR: ni el handoff ni el prototipo dan idiomas hablados ni niveles de Kendall.
 */
export const languages: readonly { code: Lang; name: string }[] = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
];
