import { both, type HttpsUrl, type Localized } from "./types";

export type ContactChannelId = "linkedin" | "github" | "whatsapp" | "cv";

export type ContactChannel = {
  id: ContactChannelId;
  label: Localized;
  /** Texto secundario visible (usuario, teléfono o indicación de descarga). */
  value: Localized;
  href: HttpsUrl | `/${string}`;
  icon: `simple-icons:${string}` | `heroicons:${string}`;
  /** `external`: el enlace sale del sitio. `download`: descarga un archivo propio. */
  external?: boolean;
  download?: boolean;
};

export const contact = {
  email: {
    address: "kendallchacon4@gmail.com",
    href: "mailto:kendallchacon4@gmail.com",
  },
  channels: [
    {
      id: "linkedin",
      label: both("LinkedIn"),
      value: both("kendall-chacon-molina"),
      href: "https://www.linkedin.com/in/kendall-chacon-molina-884b04307/",
      icon: "simple-icons:linkedin",
      external: true,
    },
    {
      id: "github",
      label: both("GitHub"),
      value: both("github.com/kendallchacon"),
      href: "https://github.com/kendallchacon",
      icon: "simple-icons:github",
      external: true,
    },
    {
      id: "whatsapp",
      label: both("WhatsApp"),
      value: both("+506 6271 2021"),
      href: "https://wa.me/50662712021",
      icon: "simple-icons:whatsapp",
      external: true,
    },
    {
      id: "cv",
      label: both("CV"),
      value: { es: "Descargar PDF", en: "Download PDF" },
      href: "/Kendall_Chacon_CV_2026.pdf",
      icon: "heroicons:document-arrow-down",
      download: true,
    },
  ],
} as const satisfies {
  email: { address: string; href: `mailto:${string}` };
  channels: readonly ContactChannel[];
};
