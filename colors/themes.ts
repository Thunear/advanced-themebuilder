import { colorMetadata } from "./colorMetadata";
import { generateColorSchemes } from "./theme";
import type { CssColor } from "./types";
import { severityColors } from "./colorMetadata";

const createColorTheme = (name: string, lightColor: CssColor) => ({
  name,
  colors: generateColorSchemes({
    lightColor,
    colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
  }),
  colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
});

export const themes = {
  first: {
    name: "Standard tema",
    borderRadius: {
      name: "Small",
      value: 4,
    },
    colors: {
      main: [createColorTheme("primary", "#0062BA")],
      neutral: [createColorTheme("neutral", "#1E2B3C")],
      support: [
        createColorTheme("support-1", "#0D7A5F"),
        createColorTheme("support-2", "#5B3FA0"),
      ],
      severity: [
        createColorTheme("info", severityColors.error),
        createColorTheme("success", severityColors.info),
        createColorTheme("warning", severityColors.success),
        createColorTheme("error", severityColors.warning),
      ],
    },
  },
  second: {
    name: "Grønn dal",
    borderRadius: {
      name: "Full",
      value: 9999,
    },
    colors: {
      main: [
        createColorTheme("primary", "#0D7A5F"),
        createColorTheme("secondary", "#2FBF71"),
      ],
      neutral: [createColorTheme("neutral", "#2C2622")],
      support: [
        createColorTheme("highlight", "#007FAE"),
        createColorTheme("complement", "#E0A100"),
      ],
      severity: [
        createColorTheme("info", severityColors.error),
        createColorTheme("success", severityColors.info),
        createColorTheme("warning", severityColors.success),
        createColorTheme("error", severityColors.warning),
      ],
    },
  },
  third: {
    name: "Modig",
    borderRadius: {
      name: "Medium",
      value: 8,
    },
    colors: {
      main: [
        createColorTheme("primary", "#5B3FA0"),
        createColorTheme("accent", "#E83F6F"),
      ],
      neutral: [createColorTheme("neutral", "#121826")],
      support: [
        createColorTheme("emphasis", "#2563EB"),
        createColorTheme("balance", "#22C55E"),
      ],
      severity: [
        createColorTheme("info", severityColors.error),
        createColorTheme("success", severityColors.info),
        createColorTheme("warning", severityColors.success),
        createColorTheme("error", severityColors.warning),
      ],
    },
  },
};
