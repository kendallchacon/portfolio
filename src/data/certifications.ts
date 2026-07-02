export interface Certification {
  nombre: string;
  emisor: string;
  facultad?: string;
  fecha: string;
  lugar?: string;
  id?: string;
  competencia: string;
  imagen?: string;
}

export const certifications: Certification[] = [
  {
    nombre: "Diplomado en Programación de Aplicaciones Informáticas",
    emisor: "Universidad Nacional de Costa Rica",
    facultad: "Ciencias Exactas y Naturales",
    fecha: "Noviembre 4, 2025",
    lugar: "Sarapiquí, Costa Rica",
    competencia:
      "Fundamentos de programación, estructuras de datos y desarrollo de aplicaciones informáticas.",
    imagen: "/images/cert-diplomado.jpg",
  },
  {
    nombre: "Scrum Fundamentals Certified (SFC™)",
    emisor: "SCRUMstudy",
    fecha: "Mayo 18, 2026",
    id: "1165444",
    competencia:
      "Fundamentos de metodología Scrum, roles, eventos y artefactos del framework.",
    imagen: "/images/cert-scrum.jpg",
  },
];

export const cierreTexto =
  "Formación continua en curso. Próximas certificaciones en proceso de obtención.";
