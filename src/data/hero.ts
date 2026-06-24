// Datos del Hero. Única fuente de verdad para etiqueta, titular, descripción,
// CTA y todo el contenido de la terminal (comandos y status bar). Mantener el
// copy aquí evita tocar los componentes y conserva el tipado.
//
// El hero es deliberadamente independiente de cualquier proyecto: la terminal
// describe stack y forma de trabajar, no logros concretos.

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface TerminalLine {
  /** "command" → prompt "$"; "output" → prompt ">"; "blank" → separador. */
  kind: "command" | "output" | "blank";
  /** Texto que se tipea (el prompt no se tipea). Vacío en líneas "blank". */
  text?: string;
  /** Nivel de indentación para bloques JSON (1 = ~1.25rem). */
  indent?: number;
  /** Tono del texto tipeado. */
  tone?: "default" | "accent" | "success" | "muted";
}

export interface TerminalStatusBar {
  /** Estado principal mostrado junto al indicador, p. ej. "READY". */
  state: string;
  /** Segmentos informativos separados por "·". */
  segments: string[];
}

export interface HeroContent {
  /** Etiqueta de especialidad (kicker) sobre el titular. */
  eyebrow: string;
  /** Titular dominante: qué hace, no quién es. */
  title: string;
  /** Párrafo descriptivo bajo el titular (2-3 líneas). */
  description: string;
  ctas: HeroCta[];
  terminal: {
    /** Título de la ventana (estilo prompt, sin atar a un proyecto). */
    fileName: string;
    /** Secuencia que se tipea una sola vez. */
    lines: TerminalLine[];
    /** Barra de estado permanente. */
    statusBar: TerminalStatusBar;
  };
}

export const hero: HeroContent = {
  eyebrow: "Backend · APIs REST · Laravel · Bases de datos",
  title:
    "Backend & Full Stack — APIs, lógica de negocio y datos que equipos pueden mantener.",
  description:
    "Construyo sistemas con lógica de negocio clara, bases de datos relacionales, autenticación, control de roles y estructuras preparadas para crecer.",
  ctas: [
    { label: "Ver proyectos", href: "/proyectos", variant: "primary" },
    { label: "Contactar", href: "/contacto", variant: "secondary" },
  ],
  terminal: {
    fileName: "kendall@portfolio: ~",
    lines: [
      { kind: "command", text: "whoami" },
      {
        kind: "output",
        text: "kendall-chacon — Backend & Full Stack Developer",
        tone: "accent",
      },
      { kind: "blank" },

      { kind: "command", text: "cat stack.json" },
      { kind: "output", text: "{" },
      {
        kind: "output",
        text: '"backend":  ["Laravel", "Spring Boot", ".NET", "MySQL"],',
        indent: 1,
      },
      {
        kind: "output",
        text: '"frontend": ["Vue", "TypeScript", "Astro"],',
        indent: 1,
      },
      {
        kind: "output",
        text: '"tools":    ["GitHub", "Docker", "Jira", "Postman"],',
        indent: 1,
      },
      { kind: "output", text: "}" },
      { kind: "blank" },

      { kind: "command", text: "cat enfoque.md" },
      {
        kind: "output",
        text: "- Arquitectura modular y separación de responsabilidades",
      },
      {
        kind: "output",
        text: "- APIs con validación, políticas y pruebas automatizadas",
      },
      {
        kind: "output",
        text: "- Datos relacionales bien modelados desde el inicio",
      },
    ],
    statusBar: {
      state: "READY",
      segments: ["stack: full-stack", "enfoque: backend", "disponible: true"],
    },
  },
};
