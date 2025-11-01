import { ColorService, type IColor } from "react-color-palette";
import {
  type ColorMetadataByName,
  type ColorScheme,
  type ThemeInfo,
  baseColors,
  colorMetadata,
  generateColorSchemes,
} from "./colors";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type ColorTheme = {
  name: string;
  colors: ThemeInfo;
  colorMetadata: ColorMetadataByName;
};

export type BaseBorderRadius = number;
export type PaneType =
  | "front"
  | "colors"
  | "colors/add"
  | "colors/edit"
  | "colors/advanced"
  | "colors/lightness"
  | "dimensions"
  | "advancedColors"
  | "lightness";

type ColorStore = {
  shrinkSidebar: boolean;
  setShrinkSidebar: (shrink: boolean) => void;
  showSeverityColors: boolean;
  setShowSeverityColors: (show: boolean) => void;
  activeColorScale: string;
  setActiveColorScale: (scale: string) => void;
  activeColorTheme: {
    index: number;
    type: "main" | "neutral" | "support" | "severity";
    colorTheme: ColorTheme;
    color: IColor;
  };
  setActiveColorTheme: (
    index: number,
    type: "main" | "neutral" | "support" | "severity",
    colorTheme: ColorTheme,
    color: IColor
  ) => void;
  onColorThemeChange: number;
  setOnColorThemeChange: (value: number) => void;
  referenceColorMetadata: ColorMetadataByName;
  activePane: PaneType;
  setActivePane: (pane: PaneType) => void;
  colors: {
    main: ColorTheme[];
    neutral: ColorTheme[];
    support: ColorTheme[];
    severity: ColorTheme[];
  };
  getColorTheme: (
    index: number,
    type: "main" | "neutral" | "support" | "severity"
  ) => ColorTheme | undefined;
  addColor: (
    newColor: ColorTheme,
    type: "main" | "neutral" | "support" | "severity"
  ) => void;
  updateColorTheme: (
    updatedTheme: ColorTheme,
    index: number,
    type: "main" | "neutral" | "support" | "severity"
  ) => void;
  resetColors: () => void;
  removeColor: (
    index: number,
    type: "main" | "neutral" | "support" | "severity"
  ) => void;
  baseBorderRadius: BaseBorderRadius;
  setBaseBorderRadius: (radius: BaseBorderRadius) => void;
  internalColorScheme: ColorScheme;
  setInternalColorScheme: (colorScheme: ColorScheme) => void;
  externalColorScheme: ColorScheme;
  setExternalColorScheme: (colorScheme: ColorScheme) => void;
  themeTab: "overview" | "colorsystem" | "contrast" | "typography" | "radius";
  setThemeTab: (
    tab:
      | "overview"
      | "colorsystem"
      | "contrast"
      | "typography"
      | "radius"
      | "contrast"
  ) => void;
};

export const useThemeStore = create(
  subscribeWithSelector<ColorStore>((set) => ({
    activeColorTheme: {
      index: 0,
      type: "main",
      color: ColorService.convert("hex", "#0062ba"),
      colorTheme: {
        name: "primary",
        colors: generateColorSchemes(
          "#0062BA",
          JSON.parse(JSON.stringify(colorMetadata))
        ),
        colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
      },
    },
    setActiveColorTheme: (index, type, colorTheme, color) =>
      set({ activeColorTheme: { index, type, colorTheme, color } }),
    shrinkSidebar: false,
    setShrinkSidebar: (shrink) => set({ shrinkSidebar: shrink }),
    showSeverityColors: false,
    setShowSeverityColors: (show) => set({ showSeverityColors: show }),
    activeColorScale: "primary",
    setActiveColorScale: (scale) => set({ activeColorScale: scale }),
    onColorThemeChange: 0,
    setOnColorThemeChange: (value) => set({ onColorThemeChange: value }),
    referenceColorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
    getColorTheme: (index, type): ColorTheme | undefined => {
      const colors = useThemeStore.getState().colors[type];
      return colors[index];
    },
    activePane: "front",
    setActivePane: (pane) => set({ activePane: pane }),
    baseBorderRadius: 4,
    colors: {
      main: [
        {
          name: "primary",
          colors: generateColorSchemes(
            "#0062BA",
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "accent",
          colors: generateColorSchemes(
            "#1E98F5",
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      neutral: [
        {
          name: "neutral",
          colors: generateColorSchemes(
            "#1E2B3C",
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      support: [
        {
          name: "extra1",
          colors: generateColorSchemes(
            "#F45F63",
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "extra2",
          colors: generateColorSchemes(
            "#E5AA20",
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      severity: [
        {
          name: "info",
          colors: generateColorSchemes(
            baseColors.blue,
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "success",
          colors: generateColorSchemes(
            baseColors.green,
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "warning",
          colors: generateColorSchemes(
            baseColors.orange,
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "error",
          colors: generateColorSchemes(
            baseColors.red,
            JSON.parse(JSON.stringify(colorMetadata))
          ),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
    },
    themeTab: "colorsystem",
    setThemeTab: (tab) => set({ themeTab: tab }),
    addColor: (newColor, type) =>
      set((state) => {
        const updatedColors = state.colors[type].concat(newColor);
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    updateColorTheme: (updatedColorTheme, index, type) =>
      set((state) => {
        const updatedColors = state.colors[type].map((color, i) =>
          i === index ? updatedColorTheme : color
        );
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    resetColors: () => {
      set({
        colors: JSON.parse(
          JSON.stringify({ main: [], neutral: [], support: [], severity: [] })
        ),
      });
    },
    removeColor: (index, type) =>
      set((state) => {
        const updatedColors = state.colors[type].filter((_, i) => i !== index);
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    internalColorScheme: "light",
    setInternalColorScheme: (colorScheme) =>
      set({ internalColorScheme: colorScheme }),
    externalColorScheme: "light",
    setExternalColorScheme: (colorScheme) =>
      set({ externalColorScheme: colorScheme }),
    setBaseBorderRadius: (radius) => set({ baseBorderRadius: radius }),
  }))
);
