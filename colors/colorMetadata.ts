import * as R from "ramda";
import type {
  ColorMetadataByName,
  ColorNumber,
  CssColor,
  GlobalColors,
} from "./types.js";

export const severityColors: Record<GlobalColors, CssColor> = {
  info: "#0A71C0",
  success: "#068718",
  warning: "#EA9B1B",
  error: "#C01B1B",
  link: "#663299",
};

export const colorMetadata: ColorMetadataByName = {
  "background-default": {
    number: 1,
    name: "background-default",
    colorOverride: "",
    group: "background",
    displayName: "Background Default",
    description: {
      long: "Background Default er den mest nøytrale bakgrunnsfargen.",
      short: "Standard bakgrunnsfarge.",
    },
    lightness: {
      light: 100,
      dark: 8,
      contrast: 8,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "background-tinted": {
    number: 2,
    name: "background-tinted",
    colorOverride: "",
    group: "background",
    displayName: "Background Tinted",
    description: {
      long: "Background Tinted er en bakgrunnsfarge som har et hint av farge i seg.",
      short: "Bakgrunn med et hint av farge i seg.",
    },
    lightness: {
      light: 96,
      dark: 12,
      contrast: 12,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "surface-default": {
    number: 3,
    name: "surface-default",
    colorOverride: "",
    group: "surface",
    displayName: "Surface Default",
    description: {
      long: "Surface Default brukes på flater som ligger oppå bakgrunnsfargene. Dette er den mest nøytrale surface fargen.",
      short: "Standardfarge for overflater / komponenter.",
    },
    lightness: {
      light: 100,
      dark: 16,
      contrast: 16,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "surface-tinted": {
    number: 4,
    name: "surface-tinted",
    colorOverride: "",
    group: "surface",
    displayName: "Surface Tinted",
    description: {
      long: "Surface Tinted brukes på flater som ligger oppå bakgrunnsfargene. Denne har et hint av farge i seg.",
      short: "Overflater / komponenter med et hint av farge i seg.",
    },
    lightness: {
      light: 92,
      dark: 19,
      contrast: 19,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "surface-hover": {
    number: 5,
    name: "surface-hover",
    colorOverride: "",
    group: "surface",
    displayName: "Surface Hover",
    description: {
      long: "Surface Hover brukes på interaktive flater som ligger oppå bakgrunnsfargene i en hover state.",
      short: "Hover-farge til overflater / komponenter.",
    },
    lightness: {
      light: 87,
      dark: 22,
      contrast: 22,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "surface-active": {
    number: 6,
    name: "surface-active",
    colorOverride: "",
    group: "surface",
    displayName: "Surface Active",
    description: {
      long: "Surface Active brukes på interaktive flater som ligger oppå bakgrunnsfargene i en active state.",
      short: "Active-farge til overflater / komponenter.",
    },
    lightness: {
      light: 82,
      dark: 28,
      contrast: 28,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "border-subtle": {
    number: 7,
    name: "border-subtle",
    colorOverride: "",
    group: "border",
    displayName: "Border Subtle",
    description: {
      long: "Border Subtle er den lyseste border-fargen og brukes for å skille elementer fra hverandre.",
      short: "Border-farge med lav kontrast til dekorativ bruk (skillelinjer).",
    },
    lightness: {
      light: 76,
      dark: 34,
      contrast: 34,
    },
    saturation: {
      light: 1,
      dark: 0.8,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "border-default": {
    number: 8,
    name: "border-default",
    colorOverride: "",
    group: "border",
    displayName: "Border Default",
    description: {
      long: "Border Default er en border-farge som brukes når man ønsker god kontrast mot bakgrunnsfargene.",
      short:
        "Standard border-farge til skjemakomponenter og meningsbærende elementer.",
    },
    lightness: {
      light: 50,
      dark: 54,
      contrast: 54,
    },
    saturation: {
      light: 1,
      dark: 0.8,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "border-strong": {
    number: 9,
    name: "border-strong",
    colorOverride: "",
    group: "border",
    displayName: "Border Strong",
    description: {
      long: "Border Strong er den mørkeste border-fargen og brukes når man ønsker en veldig tydelig og sterk border.",
      short: "Border-farge med høy kontrast for ekstra synlighet.",
    },
    lightness: {
      light: 40,
      dark: 69,
      contrast: 69,
    },
    saturation: {
      light: 1,
      dark: 0.8,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "text-subtle": {
    number: 10,
    name: "text-subtle",
    colorOverride: "",
    group: "text",
    displayName: "Text Subtle",
    description: {
      long: "Text Subtle er den lyseste tekstfargen og brukes på tekst som skal være litt mindre synlig eller for å skape variasjon i typografien.",
      short: "Tekst- og ikonfarge med lavere kontrast.",
    },
    lightness: {
      light: 40,
      dark: 69,
      contrast: 69,
    },
    saturation: {
      light: 1,
      dark: 0.8,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "text-default": {
    number: 11,
    name: "text-default",
    colorOverride: "",
    group: "text",
    displayName: "Text Default",
    description: {
      long: "Text Default er den mørkeste tekstfargen og brukes på tekst som skal være mest synlig. Denne fargen bør brukes på mesteparten av teksten på en side.",
      short: "Tekst- og ikonfarge med høy kontrast og god synlighet.",
    },
    lightness: {
      light: 18,
      dark: 94,
      contrast: 94,
    },
    saturation: {
      light: 1,
      dark: 0.8,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "base-default": {
    number: 12,
    name: "base-default",
    colorOverride: "",
    group: "base",
    displayName: "Base Default",
    description: {
      long: "Base Default fargen får den samme hex koden som fargen som er valgt i verktøyet. Brukes ofte som farge på viktige elementer og på flater som skal fange brukerens oppmerksomhet.",
      short: "Standardfarge for solide bakgrunner.",
    },
    lightness: {
      light: -1,
      dark: -1,
      contrast: -1,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "base-hover": {
    number: 13,
    name: "base-hover",
    colorOverride: "",
    group: "base",
    displayName: "Base Hover",
    description: {
      long: "Base Hover brukes som hover farge på elementer som bruker Base Default fargen.",
      short: "Hover-farge for solide bakgrunner.",
    },
    lightness: {
      light: -1,
      dark: -1,
      contrast: -1,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "base-active": {
    number: 14,
    name: "base-active",
    colorOverride: "",
    group: "base",
    displayName: "Base Active",
    description: {
      long: "Base Active brukes som active farge på elementer som bruker Base Default fargen.",
      short: "Active-farge for solide bakgrunner.",
    },
    lightness: {
      light: -1,
      dark: -1,
      contrast: -1,
    },
    saturation: {
      light: 1,
      dark: 0.7,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "base-contrast-subtle": {
    number: 15,
    name: "base-contrast-subtle",
    colorOverride: "",
    group: "base",
    displayName: "Contrast Subtle",
    description: {
      long: "Contrast Subtle brukes som en viktig meningsbærende farge oppå Base Default fargen.",
      short: "Farge med god kontrast mot Base-default.",
    },
    lightness: {
      light: -1,
      dark: -1,
      contrast: -1,
    },
    saturation: {
      light: 1,
      dark: 1,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
  "base-contrast-default": {
    number: 16,
    name: "base-contrast-default",
    colorOverride: "",
    group: "base",
    displayName: "Contrast Default",
    description: {
      long: "Contrast Default brukes som en viktig meningsbærende farge oppå alle Base fargane.",
      short: "Farge med god kontrast mot Base-default og Base-hover.",
    },
    lightness: {
      light: -1,
      dark: -1,
      contrast: -1,
    },
    saturation: {
      light: 1,
      dark: 1,
      contrast: 1,
    },
    interpolation: "rgb",
    baseModifier: {
      light: 8,
      dark: 8,
      contrast: 8,
    },
  },
};

const colorMetadataByNumber = R.indexBy(
  (metadata) => metadata.number,
  Object.values(colorMetadata)
);

export const getColorMetadataByNumber = (number: ColorNumber) => {
  return colorMetadataByNumber[number];
};
