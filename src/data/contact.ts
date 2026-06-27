export interface ContactCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
}

export interface Canal {
  label: string;
  description: string;
  href: string;
  icon: string;
  iconClass: string;
  external?: boolean;
}

// Versión compacta — usada en el inicio
export const contactCompact = {
  titulo: "¿Te interesa lo que ves?",
  subtitulo:
    "Estoy disponible para prácticas y posiciones junior en desarrollo backend y full stack.",
  ctas: [
    {
      label: "Escribirme al correo",
      href: "mailto:kendallchacon4@gmail.com",
      variant: "primary" as const,
    },
    {
      label: "Ver LinkedIn",
      href: "https://www.linkedin.com/in/kendall-chacon-molina-884b04307",
      variant: "secondary" as const,
      external: true,
    },
  ] satisfies ContactCta[],
};

// Versión completa — usada en /contacto
export const contactFull = {
  titulo: "Hablemos sobre una oportunidad.",
  descripcion:
    "Busco una práctica profesional o posición junior donde pueda aportar desde el primer día. Trabajo con Laravel, Vue y TypeScript sobre datos relacionales bien modelados.",
  disponibilidad: "📍 Costa Rica · Modalidad presencial o remota",
  chips: [
    { label: "Práctica profesional", featured: true },
    { label: "Backend" },
    { label: "Full stack" },
  ],
  ctaPrincipal: {
    label: "Contactarme por correo",
    href: "mailto:kendallchacon4@gmail.com",
  },
  ctaSecundario: {
    label: "También puedes descargar mi CV →",
    href: "/cv-kendall-chacon.pdf",
  },
  canalesTitulo: "Canales disponibles",
  canales: [
    {
      label: "Correo electrónico",
      description: "kendallchacon4@gmail.com",
      href: "mailto:kendallchacon4@gmail.com",
      icon: "simple-icons:gmail",
      iconClass: "text-red-400",
    },
    {
      label: "LinkedIn",
      description: "Perfil profesional",
      href: "https://www.linkedin.com/in/kendall-chacon-molina-884b04307/",
      icon: "simple-icons:linkedin",
      iconClass: "text-blue-400",
      external: true,
    },
    {
      label: "GitHub",
      description: "Repositorios y actividad",
      href: "https://github.com/kendallchacon",
      icon: "simple-icons:github",
      iconClass: "text-white",
      external: true,
    },
    {
      label: "WhatsApp",
      description: "Respuesta directa",
      href: "https://wa.me/50662712021",
      icon: "simple-icons:whatsapp",
      iconClass: "text-green-400",
      external: true,
    },
  ] satisfies Canal[],
  cierreTexto: "Tiempo de respuesta habitual: menos de 24 horas.",
};

// Exports de compatibilidad — usados por código existente
export const contactTags = contactFull.chips;
export const contactLinks = contactFull.canales.map((c) => ({
  label: c.label === "Correo electrónico" ? "Correo" : c.label,
  description: c.description,
  href: c.href,
  icon: c.icon,
  iconClass: c.iconClass,
  external: c.external,
}));
