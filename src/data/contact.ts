import type { Lang } from "../i18n/ui";
import { both, type HttpsUrl, type Localized } from "./types";

export type ContactChannelId = "linkedin" | "github" | "whatsapp" | "cv";

export type ContactChannel = {
  id: ContactChannelId;
  label: Localized;
  /** Texto secundario visible (usuario, teléfono o indicación de descarga). */
  value: Localized;
  /** Un enlace para ambos idiomas, o uno por idioma (el CV). Se lee con `channelHref`. */
  href: HttpsUrl | `/${string}` | { es: `/${string}`; en: `/${string}` };
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
      // Un PDF por idioma: cada página enlaza el de su idioma.
      href: { es: "/Kendall_Chacon_CV_2026_ES.pdf", en: "/Kendall_Chacon_CV_2026_EN.pdf" },
      icon: "heroicons:document-arrow-down",
      download: true,
    },
  ],
} as const satisfies {
  email: { address: string; href: `mailto:${string}` };
  channels: readonly ContactChannel[];
};

/** Enlace del canal en el idioma de la página. */
export function channelHref(channel: ContactChannel, lang: Lang): string {
  return typeof channel.href === "string" ? channel.href : channel.href[lang];
}
